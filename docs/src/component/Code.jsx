// @flow
import React from 'react';
import type {Node} from 'react';
import Prism from 'prismjs';
import {Terminal} from 'dcme-style';

type Props = {
    children: Node,
    modifier?: string
};

export default class Code extends React.Component<Props> {
    render(): Node {
        let {children, modifier = ""} = this.props;
        let __html = Prism.highlight(children, Prism.languages.cpp, 'cpp');
        return <Terminal modifier={`prism ${modifier}`}>
            <pre dangerouslySetInnerHTML={{__html}} />
        </Terminal>;
    }
}
