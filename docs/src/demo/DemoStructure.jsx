// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import type Simulation from '../simulation/Simulation';

import React from 'react';
import {PureParcel} from 'parcels-react';
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
    simulationParcel: Parcel,
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
    statuses: () => Node,
    warning: () => Node
};

export default class DemoStructure extends Structure<Props> {

    static elements = ['code', 'codeSettings', 'codeTitle', 'graph', 'graphSettings', 'graphTitle', 'control', 'legend', 'statuses', 'warning'];

    static layout = ({code, codeSettings, codeTitle, graph, graphSettings, graphTitle, control, legend, statuses, warning}: LayoutProps): Node => {
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
            <Box modifier="marginBottomKilo">
                <Grid modifier="auto">
                    <GridItem modifier="padding shrink">
                        <Box modifier="paddingLeft">{legend()}</Box>
                    </GridItem>
                    <GridItem modifier="padding">
                        <Box modifier="paddingLeft">{statuses()}</Box>
                    </GridItem>
                    <GridItem modifier="padding 1">{warning()}</GridItem>
                </Grid>
            </Box>
            <Grid>
                <GridItem modifier="padding 6">{code()}</GridItem>
                <GridItem modifier="padding 6">{codeTitle()}{codeSettings()}</GridItem>
            </Grid>
        </Box>;
    };

    code = (): Node => {
        let {demoParcel} = this.props;
        return <PureParcel parcel={demoParcel}>
            {(parcel) => <Code modifier="code">{DemoCode(parcel)}</Code>}
        </PureParcel>;
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
        let {
            demoParcel,
            simulationParcel,
            sliderHeight
        } = this.props;

        return <DemoControlView
            demoParcel={demoParcel}
            simulationParcel={simulationParcel}
            height={sliderHeight}
        />;
    };

    legend = (): Node => {
        return <Text element="div" modifier="monospace"><Text modifier="tertiary">■</Text> <Text modifier="sizeMilli">raw</Text> <Text modifier="primary">■</Text> <Text modifier="sizeMilli">output</Text></Text>;
    };

    statuses = (): Node => {
        let {simulationParcel} = this.props;
        let {
            hasChanged,
            isSettled,
            isAboveNoiseFloor
        } = simulationParcel.value();

        return <Text element="div" modifier="monospace">
            <Text modifier="weightMilli sizeMilli">
                hasChanged [{hasChanged ? "x" : " "}]
                isSettled [{isSettled ? "x" : " "}]
                isAboveNoiseFloor [{isAboveNoiseFloor ? "x" : " "}]
            </Text>
        </Text>;
    };

    warning = (): Node => {
        return null;
    };
}
