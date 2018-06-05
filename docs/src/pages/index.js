// @flow
import React from 'react';
import type {Node} from 'react';
import composeWith from 'unmutable/lib/util/composeWith';
import {ParcelStateHock} from 'parcels-react';
import IndexStructure from '../structure/IndexStructure';

import wasmBinary from '../../wasm/wasm.wasm';
import wasmJs from '../../wasm/wasm.js';

const ResponsiveAnalogReadHock = () => (Component: ComponentType<*>): ComponentType<*> => {
    return class ResponsiveAnalogReadHock extends React.Component {
        constructor(props: *) {
            super(props);
            this.state = {ResponsiveAnalogRead: null};

            wasmJs({wasmBinary}).then(({ResponsiveAnalogRead}: *) => {
                this.setState({ResponsiveAnalogRead});
            });
        }

        render(): Node {
            let {ResponsiveAnalogRead} = this.state;
            return ResponsiveAnalogRead && <Component
                {...this.props}
                ResponsiveAnalogRead={ResponsiveAnalogRead}
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
    IndexStructure
);
