// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';
import type {WasmExports} from '../types/types';

import React from 'react';
import {Box, Grid, GridItem} from 'dcme-style';
import Structure from '../component/Structure';

type Props = {
    demoParcel: Parcel,
    layout?: ComponentType,
    wasmExports: WasmExports
};

type LayoutProps = {
    code: () => Node,
    graph: () => Node,
    settings: () => Node,
    sliders: () => Node
};

export default class DemoStructure extends Structure<Props> {

    static elements = ['code', 'graph', 'settings', 'sliders'];

    static layout = ({code, graph, settings, sliders}: LayoutProps): Node => {
        return <Box>
            <Box modifier="marginBottom">
                <Grid modifier="auto">
                    <GridItem modifier="padding">{graph()}</GridItem>
                    <GridItem modifier="padding shrink">{sliders()}</GridItem>
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
        return <p>graph</p>;
    };

    settings = (): Node => {
        return <p>settings</p>;
    };

    sliders = (): Node => {
        return <p>sliders</p>;
    };
}
