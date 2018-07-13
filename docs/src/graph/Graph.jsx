// @flow
import React from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import type Simulation from '../simulation/Simulation';
import type SimulationTick from '../simulation/SimulationTick';
import {Line} from 'react-chartjs-2';

import concat from 'unmutable/lib/concat';
import get from 'unmutable/lib/get';
import last from 'unmutable/lib/last';
import map from 'unmutable/lib/map';
import takeLast from 'unmutable/lib/takeLast';
import pipeWith from 'unmutable/lib/util/pipeWith';

import {Colors} from 'dcme-style';

type DataPoint = {
    output: number,
    input: number,
    raw: number,
    x: number
};

type Props = {
    demoParcel: Parcel,
    height: number,
    eqWidth: ?number,
    simulation: Simulation
};

type State = {
    data: Array<DataPoint>,
    cameraY?: number
};

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

let range = (start: number, end: number, step: number = 1): Array<number> => {
    let arr = [];
    for(var i = start; i < end; i += step) {
        arr.push(i);
    }
    return arr;
};

const BUFFER_NAME = 'graph';
const DATA_POINTS = 100;

export default class Graph extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        props.simulation.addBuffer(BUFFER_NAME);
        this.state = {
            cameraY: undefined,
            data: pipeWith(
                range(0,DATA_POINTS),
                map(x => ({
                    x,
                    input: null,
                    output: null,
                    raw: null
                }))
            )
        };
    }

    onAnimationFrame() {
        let {simulation} = this.props;

        let buffer: Array<SimulationTick> = simulation.flushBuffer(BUFFER_NAME);
        if(buffer.length === 0) {
            return;
        }

        let {data, cameraY} = this.state;

        data = pipeWith(
            data,
            concat(buffer.map(_ => _.toJS())),
            takeLast(DATA_POINTS),
            map((data, x) => ({...data, x}))
        );

        let lastInput = pipeWith(
            data,
            last(),
            get('input')
        );

        if(typeof cameraY === "undefined") {
            cameraY = lastInput;
        } else {
            cameraY += (lastInput - cameraY) * 0.5;
        }

        this.setState({
            data,
            cameraY
        });
    }

    render(): Node {
        let {
            demoParcel,
            eqWidth: width,
            height
        } = this.props;

        let {data} = this.state;

        let {cameraY} = this.state;
        let {min, max, zoom} = demoParcel.value();
        let range = max - min;
        if(cameraY < min + (range * 0.5 / zoom)) {
            cameraY = min + (range * 0.5 / zoom);
        }
        if(cameraY > max - (range * 0.5 / zoom)) {
            cameraY = max - (range * 0.5 / zoom);
        }

        let options = {
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
                line: {
                    tension: 0
                },
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
            responsiveAnimationDuration: 0
        };

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
        ];

        return <div style={{width, height}}>
            <Line
                data={{datasets}}
                options={options}
            />
        </div>;
    }
}
