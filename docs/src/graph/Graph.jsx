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

type DataPoint = {
    value: number,
    raw: number,
    x: number
};

type Props = {
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

export default class Graph extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        props.simulation.addBuffer(BUFFER_NAME);
        this.state = {
            data: pipeWith(
                range(0,100),
                map(x => ({
                    x,
                    value: null,
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
                takeLast(100),
                map((data, x) => ({...data, x}))
            ))
        );
    }

    render(): Node {
        let {eqWidth} = this.props;
        let {data} = this.state;

        return <VictoryChart
            domain={{y: [400, 600]}}
            height={300}
            width={eqWidth}
            theme={VictoryTheme.material}
            padding={{left: 60}}
        >
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryLine
                style={{
                    data: {stroke: "#c43a31"},
                    parent: {border: "1px solid #ccc"}
                }}
                data={data}
                y="value"
            />
        </VictoryChart>;
    }
}
