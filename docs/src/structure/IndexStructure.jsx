// @flow
import React from 'react';
import type {Node} from 'react';
import Parcel, {Action} from 'parcels-react';
import {Box, Text} from 'dcme-style';
import IndexLayout from '../react-layout/IndexLayout';
import updateIn from 'unmutable/lib/updateIn';
import pipeWith from 'unmutable/lib/util/pipeWith';

type Props = {
    state: Parcel
};

export default class IndexStructure extends React.Component<Props> {
    render(): Node {
        let {ResponsiveAnalogRead} = window.Module;
        let input = this.props.state
            .get('input')
            // WOWWWWW!!!!!! THIS NEEDS SOME WORK AYE!!!!!
            .modifyChange(({parcel, actions}) => parcel.dispatch(
                actions.map((action: Action): Action => {
                    if(action.keyPath.length > 0 || action.type !== "set") {
                        return action;
                    }
                    return pipeWith(
                        action.toJS(),
                        updateIn(['payload', 'value'], value => Number(value.replace(/[^\d]/g, ""))),
                        ii => new Action(ii)
                    );
                })
            ));

        let analog = new ResponsiveAnalogRead();

        let code = () => <Box>code <input className="Input" {...input.spreadDOM()}/> double: {analog.hello(input.value())}</Box>;

        let desc = () => <Box>desc</Box>;

        let graph = () => <Box>graph</Box>;

        let title = () => <Text element="h1" modifier="sizeGiga">ResponsiveAnalogRead</Text>;

        return <IndexLayout {...({code, desc, graph, title})}/>;
    }
}
