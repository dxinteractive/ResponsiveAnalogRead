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
    simulationParcel: Parcel,
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
            let newState = props.demoParcel.value();
            this.simulation.setState(newState);
        }

        handleTick = (tick: SimulationTick) => {
            this.props.simulationParcel.batch((parcel: Parcel) => {
                parcel.set('output', tick.output);
                parcel.set('raw', tick.raw);
                parcel.set('hasChanged', tick.hasChanged);
                parcel.set('isSettled', tick.isSettled);
                parcel.set('tension', tick.tension);
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
