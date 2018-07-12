// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';

import React from 'react';

type Props = {
    layout?: ComponentType,
    elements?: *
};

export default class Structure extends React.Component<Props> {

    render(): Node {
        let {layout, elements = {}} = this.props;
        let Layout = layout || this.constructor.layout;
        let props = this.constructor.elements.reduce((props: *, element: string): * => {
            let fn = this[element];
            if(!fn) {
                throw new Error(`"${element}" method on Structure is not defined`);
            }
            return {
                ...props,
                [element]: fn
            };
        }, {});

        return <Layout {...props} {...elements} />;
    }
}
