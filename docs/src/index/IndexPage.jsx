// @flow
import type {Node} from 'react';
import type {WasmExports} from '../types/types';

import React from 'react';
import Link from 'gatsby-link';
import Demo from '../demo/DemoView';
import ApiView from '../api/ApiView';
import {Box, BulletList, BulletListItem, Divider, Link as HtmlLink, Message, Text, Wrapper} from 'dcme-style';

type Props = {
    wasmExports: WasmExports
};

let br = <span>&#8203;</span>;

export default ({wasmExports}: Props): Node => <Box modifier="marginBottomGiga">
    <Wrapper>
        <Box modifier="paddingTopKilo widthMedium">
            <Text element="h1" modifier="marginTopGiga"><Text modifier="sizeGiga marginRight">Responsive{br}Analog{br}Read</Text> <Text modifier="code">v2.0.0</Text></Text>
            <Text element="p" modifier="margin">An Arduino library for smoothing out noise.</Text>
            <Message>This page is <Text modifier="weightKilo">under construction</Text> and all information on it refers to the upcoming and unreleased <Text modifier="weightKilo">version 2.0.0</Text> of this library. For documentation regarding the current version, please go to the <HtmlLink href="https://github.com/dxinteractive/ResponsiveAnalogRead">ResponsiveAnalogRead github homepage</HtmlLink>.</Message>
        </Box>
        <Box modifier="paddingTopKilo widthMedium">
            <Text element="h2" modifier="sizeMega marginMega">Example</Text>
            <Text element="p" modifier="margin">This is a standard setup that uses <Text modifier="code">ResponsiveAnalogRead</Text> to read from pin <Text modifier="code">A0</Text>.</Text>
            <Text element="p" modifier="margin">It uses the <Text modifier="code">smooth()</Text> option to smooth the readings out.</Text>
        </Box>
        <Box modifier="paddingTopKilo">
            <Demo sliderHeight={300} wasmExports={wasmExports} />
        </Box>
        <Box modifier="paddingTop widthMedium">
            <Text element="h3" modifier="sizeKilo marginKilo">More examples</Text>
            <BulletList>
                <BulletListItem><Link to="/using-your-own-input-values">Using your own input values</Link></BulletListItem>
                <BulletListItem><Link to="/reading-more-than-ine-input">Reading more than one input</Link></BulletListItem>
            </BulletList>
        </Box>
        <Box modifier="paddingTopKilo widthMedium">
            <Divider />
            <ApiView />
        </Box>
    </Wrapper>
</Box>;
