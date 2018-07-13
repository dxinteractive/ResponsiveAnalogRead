// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import type Simulation from '../simulation/Simulation';

import React from 'react';
import {Box, Grid, GridItem, Text} from 'dcme-style';
import DemoControlView from './DemoControlView';
import Structure from '../component/Structure';
import GraphView from '../graph/GraphView';
import DemoGraphSettingsStructure from './DemoGraphSettingsStructure';
import DemoCodeSettingsStructure from './DemoCodeSettingsStructure';
import DemoCode from './DemoCode';
import Code from '../component/Code';

type Props = {
    demoParcel: Parcel,
    layout?: ComponentType,
    simulation: Simulation,
    sliderHeight: number
};

type LayoutProps = {
    code: () => Node,
    codeSettings: () => Node,
    codeTitle: () => Node,
    graph: () => Node,
    graphSettings: () => Node,
    graphTitle: () => Node,
    control: () => Node,
    legend: () => Node,
    warning: () => Node
};

export default class DemoStructure extends Structure<Props> {

    static elements = ['code', 'codeSettings', 'codeTitle', 'graph', 'graphSettings', 'graphTitle', 'control', 'legend', 'warning'];

    static layout = ({code, codeSettings, codeTitle, graph, graphSettings, graphTitle, control, legend, warning}: LayoutProps): Node => {
        return <Box>
            <Box modifier="marginBottomKilo">
                <Box modifier="marginBottomMilli">
                    <Grid modifier="auto">
                        <GridItem modifier="padding shrink">{graphTitle()}</GridItem>
                        <GridItem modifier="padding">{graphSettings()}</GridItem>
                    </Grid>
                </Box>
                <Grid modifier="auto">
                    <GridItem modifier="padding">{graph()}</GridItem>
                    <GridItem modifier="padding shrink">{control()}</GridItem>
                </Grid>
            </Box>
            <Grid>
                <GridItem modifier="padding 6">{legend()}</GridItem>
                <GridItem modifier="padding 6">{warning()}</GridItem>
            </Grid>
            <Grid>
                <GridItem modifier="padding 6">{code()}</GridItem>
                <GridItem modifier="padding 6">{codeTitle()}{codeSettings()}</GridItem>
            </Grid>
        </Box>;
    };

    code = (): Node => {
        let code = DemoCode(this.props.demoParcel.value());
        return <Code modifier="code">{code}</Code>;
    };

    codeSettings = (): Node => {
        let {
            demoParcel,
            sliderHeight
        } = this.props;

        return <DemoCodeSettingsStructure
            demoParcel={demoParcel}
            sliderHeight={sliderHeight}
        />;
    };

    codeTitle = (): Node => {
        return <Text element="h3" modifier="sizeKilo marginBottomKilo">Settings</Text>;
    };

    graph = (): Node => {
        let {
            demoParcel,
            sliderHeight,
            simulation
        } = this.props;

        return <GraphView
            demoParcel={demoParcel}
            height={sliderHeight}
            simulation={simulation}
        />;
    };

    graphSettings = (): Node => {
        let {demoParcel} = this.props;
        return <DemoGraphSettingsStructure demoParcel={demoParcel} />;
    };


    graphTitle = (): Node => {
        return null;
    };

    control = (): Node => {
        let {demoParcel, sliderHeight} = this.props;
        return <DemoControlView
            demoParcel={demoParcel}
            height={sliderHeight}
        />;
    };

    legend = (): Node => {
        return null;
    };

    warning = (): Node => {
        return null;
    };
}
