// @flow
import React from 'react';
import type {Node} from 'react';
import type Simulation from '../simulation/Simulation';
import type SimulationTick from '../simulation/SimulationTick';
import {VictoryAxis, VictoryChart, VictoryTheme, VictoryLine} from 'victory';

import concat from 'unmutable/lib/concat';
import map from 'unmutable/lib/map';
import takeLast from 'unmutable/lib/takeLast';
import update from 'unmutable/lib/update';
import pipe from 'unmutable/lib/util/pipe';
import pipeWith from 'unmutable/lib/util/pipeWith';

import {Colors} from 'dcme-style';

type DataPoint = {
    output: number,
    input: number,
    raw: number,
    x: number
};

type Props = {
    height: number,
    eqWidth: ?number,
    simulation: Simulation
};

type State = {
    data: Array<DataPoint>
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

        this.setState(
            update('data', pipe(
                concat(buffer.map(_ => _.toJS())),
                takeLast(DATA_POINTS),
                map((data, x) => ({...data, x}))
            ))
        );
    }

    render(): Node {
        let {eqWidth, height} = this.props;
        let {data} = this.state;

        return <VictoryChart
            domain={{y: [400, 600]}}
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
                y="input"
            />
            <VictoryLine
                style={{
                    data: {stroke: Colors.secondary}
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
