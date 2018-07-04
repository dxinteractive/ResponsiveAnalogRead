// @flow
import React from 'react';
import type {Node} from 'react';
import type Simulation from '../simulation/Simulation';
import type SimulationTick from '../simulation/SimulationTick';
import Line from './Line';

type Props = {
    eqWidth: ?number,
    eqHeight: ?number,
    simulation: Simulation
};

const BUFFER_NAME = 'graph';

export default class Graph extends React.Component<Props> {
    canvas: ?HTMLElement;
    lineValue: Line = new Line();
    lineRaw: Line = new Line();

    constructor(props: Props) {
        super(props);
        props.simulation.addBuffer(BUFFER_NAME);
    }

    onAnimationFrame() {
        if(!this.canvas || !this.canvas.getContext) {
            return;
        }

        let {simulation} = this.props;

        let context = this.canvas.getContext('2d');
        //let min = simulation.analog().min();
        //let max = simulation.analog().max();
        let scale = 2;

        simulation
            .flushBuffer(BUFFER_NAME)
            .forEach(({value, raw}: SimulationTick) => {
                let imageData = context.getImageData(scale, 0, this.canvas.width - scale, this.canvas.height);
                context.putImageData(imageData, 0, 0);


                this.lineValue.to(value >> 3);
                this.lineRaw.to(raw >> 3);

                context.fillStyle = '#FF0000';
                context.fillRect(
                    this.canvas.width - 10,
                    this.lineValue.min * scale,
                    scale,
                    this.lineValue.height * scale
                );

                context.fillStyle = '#0000FF';
                context.fillRect(
                    this.canvas.width - 10,
                    this.lineRaw.min * scale,
                    scale,
                    this.lineRaw.height * scale
                );
            });
    }

    render(): Node {
        let {eqWidth, eqHeight} = this.props;
        if(!eqWidth || !eqHeight) {
            return null;
        }

        return <canvas
            ref={ref => this.canvas = ref}
            width={eqWidth}
            height={eqHeight}
        />;
    }
}
