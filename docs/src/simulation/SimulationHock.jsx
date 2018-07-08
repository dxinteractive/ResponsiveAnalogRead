// @flow
/* eslint-disable react/no-deprecated */
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import type {WasmExports} from '../types/types';
import type SimulationTick from './SimulationTick';

import React from 'react';
import Simulation from './Simulation';

type Props = {
    demoParcel: Parcel,
    wasmExports: ?WasmExports
};

export default () => (Component: ComponentType<Props>): ComponentType<Props> => {
    return class SimulationHock extends React.Component<Props, State> {
        simulation: Simulation;

        constructor(props: Props) {
            super(props);
            this.simulation = new Simulation(props.wasmExports);
            this.simulation.addOnTickListener(this.handleTick);
            this.updateSimulationProps(props);
        }

        componentWillReceiveProps(nextProps: Props) {
            this.updateSimulationProps(nextProps);
        }

        updateSimulationProps(props: Props) {
            let input = props.demoParcel.get('input').value();
            this.simulation.setState({
                input
            });
        }

        handleTick = (tick: SimulationTick) => {
            this.props.demoParcel.batch((parcel: Parcel) => {
                parcel.set('output', tick.output);
                parcel.set('raw', tick.raw);
            });
        };

        render(): Node {
            return <Component
                {...this.props}
                simulation={this.simulation}
            />;
        }
    };
};
