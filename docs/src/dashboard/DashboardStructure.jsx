// @flow
import React from 'react';
import type {Node} from 'react';
import type Simulation from '../simulation/Simulation';
import Parcel from 'parcels-react';
import {Box, Text} from 'dcme-style';
import DashboardLayout from './DashboardLayout';
import GraphView from '../graph/GraphView';
// import updateIn from 'unmutable/lib/updateIn';
// import pipeWith from 'unmutable/lib/util/pipeWith';

type Props = {
    simulation: Simulation,
    stateParcel: Parcel
};

export default class DashboardStructure extends React.Component<Props> {
    render(): Node {
        let {simulation} = this.props;
        // let input = this.props.state
        //     .get('input')
        //     // WOWWWWW!!!!!! THIS NEEDS SOME WORK AYE!!!!!
        //     .modifyChange(({parcel, actions}) => parcel.dispatch(
        //         actions.map((action: Action): Action => {
        //             if(action.keyPath.length > 0 || action.type !== "set") {
        //                 return action;
        //             }
        //             return pipeWith(
        //                 action.toJS(),
        //                 updateIn(['payload', 'value'], value => Number(value.replace(/[^\d]/g, ""))),
        //                 ii => new Action(ii)
        //             );
        //         })
        //     ));

        // let analog = new ResponsiveAnalogRead();
        // console.log("analog", analog);

        let code = () => <Box>code</Box>;

        let desc = () => <Box>desc</Box>;

        let graph = () => <Box style={{height: 300}}>
            <GraphView simulation={simulation} />
        </Box>;

        let title = () => <Text element="h1" modifier="monospace">ResponsiveAnalogRead</Text>;

        return <DashboardLayout {...({code, desc, graph, title})}/>;
    }
}
