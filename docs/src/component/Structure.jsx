// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';

import React from 'react';

type Props = {
    layout?: ComponentType
};

export default class Structure extends React.Component<Props> {

    render(): Node {
        let {layout, elements} = this.constructor;
        let Layout = this.props.layout || layout;
        let layoutProps = elements.reduce((layoutProps: *, element: string): * => {
            let fn = this[element];
            if(!fn) {
                throw new Error(`"${element}" method on Structure is not defined`);
            }
            return {
                ...layoutProps,
                [element]: fn
            };
        }, {});

        return <Layout {...layoutProps} />;
    }
}
