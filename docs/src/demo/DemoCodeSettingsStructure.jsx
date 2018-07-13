// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';

import React from 'react';
import {PureParcel} from 'parcels-react';
import {Box, Grid, GridItem, Text, Toggle} from 'dcme-style';
import Structure from '../component/Structure';
import {exp, numberToExp, numberToFloor} from '../util/ParcelModifiers';
import DemoSliderStructure from './DemoSliderStructure';

type Props = {
    demoParcel: Parcel,
    layout?: ComponentType,
    sliderHeight: number
};

type LayoutProps = {
    noisefloor: () => Node,
    glide: () => Node,
    delay: () => Node,
    smooth: () => Node,
    settle: () => Node,
    doubleRead: () => Node
};

export default class DemoCodeSettingsStructure extends Structure<Props> {

    static elements = ['noisefloor', 'glide', 'delay', 'smooth', 'settle', 'doubleRead'];

    static layout = ({noisefloor, glide, delay, smooth, settle, doubleRead}: LayoutProps): Node => {
        return <Box>
            <Grid modifier="auto">
                <GridItem modifier="shrink paddingMilli">
                    {smooth()}
                    {settle()}
                    {doubleRead()}
                </GridItem>
                <GridItem modifier="shrink paddingMilli">{noisefloor()}</GridItem>
                <GridItem modifier="shrink paddingMilli">{glide()}</GridItem>
                <GridItem />
            </Grid>
        </Box>;
    };

    noisefloor = (): Node => {
        let {demoParcel, sliderHeight} = this.props;
        let {min, max} = demoParcel.value();
        let curve = 5;
        let range = max - min;
        let sliderMax = exp(curve)(range);
        let value = demoParcel
            .get('noisefloor')
            .value()
            .toFixed(1);

        return <DemoSliderStructure
            valueParcel={demoParcel.get('noisefloor').modify(numberToFloor(0.1), numberToExp(curve))}
            height={sliderHeight}
            label="Noisefloor"
            min={exp(curve)(0.04)}
            max={sliderMax}
            step={sliderMax / range}
            value={value}
        />;
    };

    glide = (): Node => {
        let {demoParcel, sliderHeight} = this.props;
        let curve = 5;
        let range = 50;
        let sliderMax = exp(curve)(range);
        let value = demoParcel
            .get('glide')
            .value()
            .toFixed(1);

        return <DemoSliderStructure
            valueParcel={demoParcel.get('glide').modify(numberToFloor(0.1), numberToExp(curve))}
            height={sliderHeight}
            label="Glide"
            min={exp(curve)(0.04)}
            max={sliderMax}
            step={sliderMax / range}
            value={value}
        />;
    };

    delay = (): Node => {
        let {demoParcel, sliderHeight} = this.props;
        let curve = 5;
        let range = 1000;
        let sliderMax = exp(curve)(range);
        let value = demoParcel
            .get('delay')
            .value()
            .toFixed(0);

        return <DemoSliderStructure
            valueParcel={demoParcel.get('delay').modify(numberToFloor(), numberToExp(curve))}
            height={sliderHeight}
            label="Delay"
            min={exp(curve)(0.4)}
            max={sliderMax}
            step={sliderMax / range}
            value={value}
        />;
    };

    smooth = (): Node => {
        let {demoParcel} = this.props;
        return <Text element="div" modifier="marginBottom">
            <label>
                <PureParcel parcel={demoParcel.get('smooth')}>
                    {(parcel) => <Toggle {...parcel.spread()} modifier="checkbox">smooth</Toggle>}
                </PureParcel>
            </label>
        </Text>;
    };

    settle = (): Node => {
        let {demoParcel} = this.props;
        return <Text element="div" modifier="marginBottom">
            <label>
                <PureParcel parcel={demoParcel.get('settle')}>
                    {(parcel) => <Toggle {...parcel.spread()} modifier="checkbox">settle</Toggle>}
                </PureParcel>
            </label>
        </Text>;
    };

    doubleRead = (): Node => {
        let {demoParcel} = this.props;
        if(demoParcel.get('amount').value() < 2) {
            return null;
        }
        return <Text element="div" modifier="marginBottom">
            <label>
                <PureParcel parcel={demoParcel.get('doubleRead')}>
                    {(parcel) => <Toggle {...parcel.spread()} modifier="checkbox">doubleRead</Toggle>}
                </PureParcel>
            </label>
        </Text>;
    };
}
