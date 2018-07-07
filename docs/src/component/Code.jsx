// @flow
import React from 'react';
import type {Node} from 'react';
import Prism from 'prismjs';
import {Terminal} from 'dcme-style';

type Props = {
    children: Node
};

export default class Code extends React.Component<Props> {
    render(): Node {
        let code = this.props.children;
        let __html = Prism.highlight(code, Prism.languages.cpp, 'cpp');
        return <Terminal modifier="prism code">
            <pre dangerouslySetInnerHTML={{__html}} />
        </Terminal>;
    }
}
