// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import type Simulation from '../simulation/Simulation';

import React from 'react';
import {Box, Grid, GridItem} from 'dcme-style';
import DemoControlView from './DemoControlView';
import Structure from '../component/Structure';
import GraphView from '../graph/GraphView';

type Props = {
    demoParcel: Parcel,
    height: number,
    layout?: ComponentType,
    simulation: Simulation
};

type LayoutProps = {
    code: () => Node,
    graph: () => Node,
    settings: () => Node,
    control: () => Node
};

export default class DemoStructure extends Structure<Props> {

    static elements = ['code', 'graph', 'settings', 'control'];

    static layout = ({code, graph, settings, control}: LayoutProps): Node => {
        return <Box>
            <Box modifier="marginBottom">
                <Grid modifier="auto">
                    <GridItem modifier="padding">{graph()}</GridItem>
                    <GridItem modifier="padding shrink">{control()}</GridItem>
                </Grid>
            </Box>
            <Grid>
                <GridItem modifier="padding 6">{code()}</GridItem>
                <GridItem modifier="padding 6">{settings()}</GridItem>
            </Grid>
        </Box>;
    };

    code = (): Node => {
        return <p>code</p>;
    };

    graph = (): Node => {
        let {height, simulation} = this.props;
        return <GraphView
            height={height}
            simulation={simulation}
        />;
    };

    settings = (): Node => {
        return <p>settings</p>;
    };

    control = (): Node => {
        let {demoParcel, height} = this.props;
        return <DemoControlView
            demoParcel={demoParcel}
            height={height}
        />;
    };
}
