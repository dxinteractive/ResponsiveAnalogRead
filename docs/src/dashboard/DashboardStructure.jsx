// @flow
import React from 'react';
import type {Node} from 'react';
import type Simulation from '../simulation/Simulation';
import Parcel from 'parcels-react';
import {Box, Text} from 'dcme-style';
import DashboardShape from './DashboardShape';
import ControlView from '../control/ControlView';

type Props = {
    simulation: Simulation,
    stateParcel: Parcel
};

export default class DashboardStructure extends React.Component<Props> {

    code = (): Node => {
        return <Box>code</Box>;
    };

    desc = (): Node => {
        return <Box>desc</Box>;
    };

    control = (): Node => {
        let {simulation, stateParcel} = this.props;
        return <ControlView
            simulation={simulation}
            stateParcel={stateParcel}
        />;
    };

    title = (): Node => {
        return <Text element="h1" modifier="monospace">ResponsiveAnalogRead</Text>;
    };

    render(): Node {
        return <DashboardShape
            code={this.code}
            control={this.control}
            desc={this.desc}
            title={this.title}
        />;
    }
}
