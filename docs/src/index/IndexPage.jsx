// @flow
import type {Node} from 'react';
import type {WasmExports} from '../types/types';

import React from 'react';
import Demo from '../demo/DemoView';
import {Box, BulletList, BulletListItem, Link, Message, Text, Wrapper} from 'dcme-style';

type Props = {
    wasmExports: WasmExports
};

export default ({wasmExports}: Props): Node => <Wrapper>
    <Box modifier="paddingTopKilo">
        <Text element="h1" modifier="marginTopGiga"><Text modifier="sizeGiga">ResponsiveAnalogRead</Text> <Text modifier="code marginLeft">v2.0.0</Text></Text>
        <Text element="p" modifier="margin">An Arduino library for smoothing out noise from analog readings.</Text>
        <Message>This page is <Text modifier="weightKilo">under construction</Text> and all information on it refers to the upcoming and unreleased <Text modifier="weightKilo">version 2.0.0</Text> of this library. For documentation regarding the current version, please go to the <Link href="https://github.com/dxinteractive/ResponsiveAnalogRead">ResponsiveAnalogRead github homepage</Link>.</Message>
    </Box>
    <Box modifier="paddingTopKilo">
        <Text element="h2" modifier="sizeMega marginMega">Example (no smoothing)</Text>
        <Demo height={300} wasmExports={wasmExports} />
    </Box>
    <Box modifier="paddingTopKilo">
        <Text element="h2" modifier="sizeMega marginMega">API</Text>
    </Box>
    <Box modifier="paddingTopKilo">
        <Text element="h2" modifier="sizeMega marginMega">Todo</Text>
        <BulletList>
            <BulletListItem>Add example with external DAC</BulletListItem>
            <BulletListItem>dd example with array...</BulletListItem>
        </BulletList>
    </Box>
</Wrapper>;
