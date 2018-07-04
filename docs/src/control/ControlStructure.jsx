// @flow
import React from 'react';
import type {Node} from 'react';
import type Simulation from '../simulation/Simulation';
import type Parcel from 'parcels-react';
import {PureParcel} from 'parcels-react';
import GraphView from '../graph/GraphView';
import ControlShape from './ControlShape';

import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

type Props = {
    eqHeight: ?number,
    simulation: Simulation,
    stateParcel: Parcel
};

export default class ControlStructure extends React.Component<Props> {
    graph = (): Node => {
        let {
            eqHeight,
            simulation,
            stateParcel
        } = this.props;

        return <GraphView
            parentHeight={eqHeight}
            simulation={simulation}
            stateParcel={stateParcel}
        />;
    };

    inputSlider = (): Node => {
        let {
            input,
            inputMin,
            inputMax
        } = this.props.stateParcel.toObject();

        let min = inputMin.value();
        let max = inputMax.value();

        return <PureParcel parcel={input} forceUpdate={[min, max]}>
            {(parcel) => <Slider
                {...parcel.spread()}
                min={min}
                max={max}
                orientation="vertical"
            />}
        </PureParcel>;
    };

    rawSlider = (): Node => {
        return "r";
    };

    smoothSlider = (): Node => {
        return "s";
    };

    render(): Node {
        return <ControlShape
            graph={this.graph}
            inputSlider={this.inputSlider}
            rawSlider={this.rawSlider}
            smoothSlider={this.smoothSlider}
        />;
    }
}
