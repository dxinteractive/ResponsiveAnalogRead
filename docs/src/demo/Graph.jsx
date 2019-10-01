// @flow
import type {Node} from 'react';
import type Parcel from 'react-dataparcels';
import type Simulation from 'simulation/Simulation';
import type {SimulationTick} from 'simulation/Simulation';

import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import useAnimationFrame from 'hooks/useAnimationFrame';

import concat from 'unmutable/concat';
import get from 'unmutable/get';
import last from 'unmutable/last';
import map from 'unmutable/map';
import pipeWith from 'unmutable/pipeWith';
import takeLast from 'unmutable/takeLast';

const Colors = {
    primary: "#527fd7",
    secondary: "#e17564",
    tertiary: "#f1dd8b"
};

const BUFFER_NAME = 'graph';
const DATA_POINTS = 100;

let createOptions = ({cameraY, range, zoom}) => ({
    scales: {
        xAxes: [{
            scaleLabel: {
                display: false
            },
            ticks: {
                min: 0,
                max: DATA_POINTS
            },
            type: 'linear',
            display: false
        }],
        yAxes: [{
            ticks: {
                min: cameraY - (range * 0.5 / zoom),
                max: cameraY + (range * 0.5 / zoom)
            }
        }]
    },
    elements: {
        point: {
            radius: 0
        }
    },
    legend: {
        display: false
    },
    animation: {
        duration: 0
    },
    hover: {
        animationDuration: 0
    },
    responsiveAnimationDuration: 0,
    maintainAspectRatio: false
});

let createDataset = ({data, key, color}: *): * => {
    return {
        label: key,
        legend: {
            display: false
        },
        fill: false,
        borderWidth: 1.5,
        borderColor: color,
        spanGaps: false,
        data: data.map((point, x) => ({x, y: point[key]}))
    };
};

let rangeArray = (start: number, end: number, step: number = 1): Array<number> => {
    let arr = [];
    for(var i = start; i < end; i += step) {
        arr.push(i);
    }
    return arr;
};

type Props = {
    simulation: Simulation,
    stateParcel: Parcel
};

export default (props: Props): Node => {
    let {stateParcel, simulation} = props;

    useEffect(() => {
        simulation.addBuffer(BUFFER_NAME);
    }, []);

    let [data, setData] = useState(() => pipeWith(
        rangeArray(0, DATA_POINTS),
        map(x => ({
            x,
            input: 0,
            output: 0,
            raw: 0,
            tension: null,
            log: null
        }))
    ));

    let [cameraY, setCameraY] = useState();

    useAnimationFrame(() => {
        let buffer: SimulationTick[] = simulation.flushBuffer(BUFFER_NAME);
        if(buffer.length === 0) {
            return;
        }

        data = pipeWith(
            data,
            concat(buffer.map(point => ({
                ...point,
                tension: point.tension * 20
            }))),
            takeLast(DATA_POINTS),
            map((data, x) => ({...data, x}))
        );

        let lastInput = pipeWith(
            data,
            last(),
            get('input')
        );

        if(cameraY === undefined) {
            cameraY = lastInput;
        } else {
            cameraY += (lastInput - cameraY) * 0.5;
        }

        setData(data);
        setCameraY(cameraY);
    });

    let {min, max, zoom} = stateParcel.value;
    let range = max - min;
    if(cameraY < min + (range * 0.5 / zoom)) {
        cameraY = min + (range * 0.5 / zoom);
    }
    if(cameraY > max - (range * 0.5 / zoom)) {
        cameraY = max - (range * 0.5 / zoom);
    }

    let options = createOptions({
        cameraY,
        range,
        zoom
    });

    let datasets = [
        createDataset({
            data,
            key: "output",
            color: Colors.primary
        }),
        createDataset({
            data,
            key: "raw",
            color: Colors.tertiary
        })
        // createDataset({
        //     data,
        //     key: "tension",
        //     color: Colors.secondary
        // })
        // createDataset({
        //     data,
        //     key: "log",
        //     color: Colors.tertiary
        // })
    ];

    return <Line data={{datasets}} options={options} />;
};
