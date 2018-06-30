// @flow
import React from 'react';
import type {Node} from 'react';
import Simulation from '../simulation/Simulation';

import wasmBinary from '../../wasm/wasm.wasm';
import wasmJs from '../../wasm/wasm.js';

export default () => (Component: ComponentType<*>): ComponentType<*> => {
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
