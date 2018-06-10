// @flow
import React from 'react';
import type {Node} from 'react';
import composeWith from 'unmutable/lib/util/composeWith';
import {ParcelStateHock} from 'parcels-react';
import DashboardStructure from './DashboardStructure';
import Simulation from '../simulation/Simulation';

import wasmBinary from '../../wasm/wasm.wasm';
import wasmJs from '../../wasm/wasm.js';

const ResponsiveAnalogReadHock = () => (Component: ComponentType<*>): ComponentType<*> => {
    return class ResponsiveAnalogReadHock extends React.Component {
        constructor(props: *) {
            super(props);
            this.state = {
                simulation: null
            };

            wasmJs({wasmBinary}).then((module: *) => {
                this.setState({
                    simulation: new Simulation(module)
                });
            });
        }

        render(): Node {
            let {simulation} = this.state;
            return simulation && <Component
                {...this.props}
                simulation={simulation}
            />;
        }
    };
};

export default composeWith(
    ResponsiveAnalogReadHock(),
    ParcelStateHock({
        initialValue: () => ({
            input: 0
        }),
        prop: "state"
    }),
    DashboardStructure
);
