// @flow
import type {Node} from 'react';
import type {WasmExports} from '../types/types';

import React from 'react';
import wasmBinary from '../../wasm/wasm.wasm';
import wasmJs from '../../wasm/wasm.js';

type Props = {};

type State = {
    wasmExports: ?WasmExports
};

export default () => (Component: ComponentType<Props>): ComponentType<Props> => {
    return class ResponsiveAnalogReadHock extends React.Component<Props, State> {
        constructor(props: Props) {
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

        render(): Node {
            let {wasmExports} = this.state;
            return wasmExports && <Component
                {...this.props}
                wasmExports={wasmExports}
            />;
        }
    };
};
