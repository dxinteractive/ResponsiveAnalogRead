// @flow
import React from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import Simulation from '../simulation/Simulation';

import wasmBinary from '../../wasm/wasm.wasm';
import wasmJs from '../../wasm/wasm.js';

type Props = {
    stateParcel: Parcel
};

export default () => (Component: ComponentType<Props>): ComponentType<Props> => {
    return class ResponsiveAnalogReadHock extends React.Component<Props> {
        simulation: ?Simulation;

        constructor(props: *) {
            super(props);
            this.state = {
                loaded: false
            };

            wasmJs({wasmBinary}).then((module: *) => {
                this.simulation = new Simulation(module);
                this.updateSimulationProps(props);
                this.setState({
                    loaded: true
                });
            });
        }

        componentWillReceiveProps(nextProps: Props) {
            this.updateSimulationProps(nextProps);
        }

        updateSimulationProps(props: Props) {
            if(!this.simulation) {
                return;
            }
            let input = props.stateParcel.get('input').value();
            this.simulation.setState({
                input
            });
        }

        render(): Node {
            let {loaded} = this.state;
            return loaded && <Component
                {...this.props}
                simulation={this.simulation}
            />;
        }
    };
};
