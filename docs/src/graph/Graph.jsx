// @flow
import React from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import type Simulation from '../simulation/Simulation';
import type SimulationTick from '../simulation/SimulationTick';
import {VictoryAxis, VictoryChart, VictoryTheme, VictoryLine} from 'victory';

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
    cameraY: number
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
            cameraY: 512,
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

        cameraY += (lastInput - cameraY) * 0.5;

        this.setState({
            data,
            cameraY
        });
    }

    render(): Node {
        return null;
        let {
            demoParcel,
            eqWidth,
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

        let domain = [
            cameraY - (range * 0.5 / zoom),
            cameraY + (range * 0.5 / zoom)
        ];

        return <VictoryChart
            domain={{y: domain}}
            height={height}
            width={eqWidth}
            style={{
                labels: {
                    fontFamily: `"Roboto Mono", monospace`
                }
            }}
            theme={VictoryTheme.material}
            padding={{left: 60}}
        >
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryLine
                style={{
                    data: {stroke: Colors.tertiary}
                }}
                data={data}
                y="raw"
            />
            <VictoryLine
                style={{
                    data: {stroke: Colors.primary}
                }}
                data={data}
                y="output"
            />
        </VictoryChart>;
    }
}
