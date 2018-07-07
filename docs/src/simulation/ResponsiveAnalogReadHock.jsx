// @flow
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import type {WasmExports} from '../types/types';

import React from 'react';
import wasmBinary from '../../wasm/wasm.wasm';
import wasmJs from '../../wasm/wasm.js';

type Props = {
    stateParcel: Parcel
};

type State = {
    wasmExports: ?WasmExports
};

export default () => (Component: ComponentType<Props>): ComponentType<Props> => {
    return class ResponsiveAnalogReadHock extends React.Component<Props, State> {
        constructor(props: *) {
            super(props);
            this.state = {
                wasmExports: null
            };

            wasmJs({wasmBinary}).then((wasmExports: *) => {
                this.setState({
                    wasmExports
                });
            });
        }

        // componentWillReceiveProps(nextProps: Props) {
        //     this.updateSimulationProps(nextProps);
        // }

        // updateSimulationProps(props: Props) {
        //     if(!this.simulation) {
        //         return;
        //     }
        //     let input = props.stateParcel.get('input').value();
        //     this.simulation.setState({
        //         input
        //     });
        // }

        render(): Node {
            let {wasmExports} = this.state;
            return wasmExports && <Component
                {...this.props}
                wasmExports={wasmExports}
            />;
        }
    };
};
