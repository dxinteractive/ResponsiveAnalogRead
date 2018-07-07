// @flow
import React from 'react';
import type {Node} from 'react';
import type Simulation from '../simulation/Simulation';
import Code from '../component/Code';
import Parcel from 'parcels-react';
import {Link, Message, Text, Wrapper} from 'dcme-style';

type Props = {
    simulation: Simulation,
    stateParcel: Parcel
};

let code = `
int asd;
double asd = 345;
int THing::thing(int eeee) {
    return 2;
}
`;

export default class DemoStructure extends React.Component<Props> {

    // code = (): Node => {
    //     return <Box>code</Box>;
    // };

    // desc = (): Node => {
    //     return <Box>desc</Box>;
    // };

    // control = (): Node => {
    //     let {simulation, stateParcel} = this.props;
    //     return <ControlView
    //         simulation={simulation}
    //         stateParcel={stateParcel}
    //     />;
    // };

    // title = (): Node => {
    //     return <Text element="h1" modifier="monospace">ResponsiveAnalogRead</Text>;
    // };

    render(): Node {
        return <Wrapper>
            <Text element="h1" modifier="marginTopGiga"><Text modifier="sizeGiga">ResponsiveAnalogRead</Text> <Text modifier="code marginLeft">v2.0.0</Text></Text>
            <Text element="p" modifier="margin">An Arduino library for smoothing out noise from analog readings.</Text>
            <Message>This page is <Text modifier="weightKilo">under construction</Text> and all information on it refers to the upcoming and unreleased <Text modifier="weightKilo">version 2.0.0</Text> of this library. For documentation regarding the current version, please go to the <Link href="https://github.com/dxinteractive/ResponsiveAnalogRead">ResponsiveAnalogRead github homepage</Link>.</Message>
            <Text element="h2" modifier="sizeMega marginMega">Example</Text>
            <Code>{code}</Code>
        </Wrapper>;
    }
}
