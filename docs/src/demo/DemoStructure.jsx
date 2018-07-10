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
import DemoGraphSettingsStructure from './DemoGraphSettingsStructure';
import DemoCodeSettingsStructure from './DemoCodeSettingsStructure';
import DemoCode from './DemoCode';
import Code from '../component/Code';

type Props = {
    demoParcel: Parcel,
    height: number,
    layout?: ComponentType,
    simulation: Simulation
};

type LayoutProps = {
    code: () => Node,
    codeSettings: () => Node,
    graph: () => Node,
    graphSettings: () => Node,
    control: () => Node
};

export default class DemoStructure extends Structure<Props> {

    static elements = ['code', 'codeSettings', 'graph', 'graphSettings', 'control'];

    static layout = ({code, codeSettings, graph, graphSettings, control}: LayoutProps): Node => {
        return <Box>
            <Box modifier="marginBottomKilo">
                <Box modifier="marginBottomMilli">{graphSettings()}</Box>
                <Grid modifier="auto">
                    <GridItem modifier="padding">{graph()}</GridItem>
                    <GridItem modifier="padding shrink">{control()}</GridItem>
                </Grid>
            </Box>
            <Grid>
                <GridItem modifier="6">{code()}</GridItem>
                <GridItem modifier="padding 6">{codeSettings()}</GridItem>
            </Grid>
        </Box>;
    };

    code = (): Node => {
        return <Code>{DemoCode()}</Code>;
    };

    codeSettings = (): Node => {
        let {demoParcel} = this.props;
        return <DemoCodeSettingsStructure demoParcel={demoParcel} />;
    };

    graph = (): Node => {
        let {
            demoParcel,
            height,
            simulation
        } = this.props;

        return <GraphView
            demoParcel={demoParcel}
            height={height}
            simulation={simulation}
        />;
    };

    graphSettings = (): Node => {
        let {demoParcel} = this.props;
        return <DemoGraphSettingsStructure demoParcel={demoParcel} />;
    };

    control = (): Node => {
        let {demoParcel, height} = this.props;
        return <DemoControlView
            demoParcel={demoParcel}
            height={height}
        />;
    };
}
