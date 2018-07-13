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
    smooth: () => Node,
    settle: () => Node,
    glideEnabled: () => Node,
    smoothEnabled: () => Node,
    settleEnabled: () => Node,
    doubleReadEnabled: () => Node
};

export default class DemoCodeSettingsStructure extends Structure<Props> {

    renderSlider = ({field, label}: *): Node => {
        let {demoParcel, sliderHeight} = this.props;
        let curve = 5;
        let range = 50;
        let sliderMax = exp(curve)(range);
        let value = demoParcel
            .get(field)
            .value()
            .toFixed(1);

        return <DemoSliderStructure
            valueParcel={demoParcel.get(field).modify(numberToFloor(0.1), numberToExp(curve))}
            height={sliderHeight}
            label={label}
            min={exp(curve)(0.04)}
            max={sliderMax}
            step={sliderMax / range}
            value={value}
            disabled={!demoParcel.get(`${field}Enabled`).value()}
        />;
    };

    renderToggle = ({field, label}: *): Node => {
        let {demoParcel} = this.props;
        return <Text element="div" modifier="marginBottom">
            <label>
                <PureParcel parcel={demoParcel.get(field)}>
                    {(parcel) => <Toggle {...parcel.spread()} modifier="checkbox">{label}</Toggle>}
                </PureParcel>
            </label>
        </Text>;
    };

    static elements = ['noisefloor', 'glide', 'smooth', 'settle', 'doubleReadEnabled', 'glideEnabled', 'smoothEnabled', 'settleEnabled'];

    static layout = ({noisefloor, glide, smooth, settle, doubleReadEnabled, glideEnabled, smoothEnabled, settleEnabled}: LayoutProps): Node => {
        return <Box>
            <Grid modifier="auto">
                <GridItem modifier="shrink paddingMilli">
                    {glideEnabled()}
                    {smoothEnabled()}
                    {settleEnabled()}
                    {doubleReadEnabled()}
                </GridItem>
                <GridItem modifier="shrink paddingMilli">{noisefloor()}</GridItem>
                <GridItem modifier="shrink paddingMilli">{glide()}</GridItem>
                <GridItem modifier="shrink paddingMilli">{smooth()}</GridItem>
                <GridItem modifier="shrink paddingMilli">{settle()}</GridItem>
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
            label="noisefloor"
            min={exp(curve)(0.04)}
            max={sliderMax}
            step={sliderMax / range}
            value={value}
        />;
    };

    glide = (): Node => {
        return this.renderSlider({
            field: 'glide',
            label: 'glide'
        });
    };

    smooth = (): Node => {
        return this.renderSlider({
            field: 'smooth',
            label: 'smooth'
        });
    };

    settle = (): Node => {
        return this.renderSlider({
            field: 'settle',
            label: 'settle'
        });
    };

    glideEnabled = (): Node => {
        return this.renderToggle({
            field: 'glideEnabled',
            label: 'glide'
        });
    };

    smoothEnabled = (): Node => {
        return this.renderToggle({
            field: 'smoothEnabled',
            label: 'smooth'
        });
    };

    settleEnabled = (): Node => {
        return this.renderToggle({
            field: 'settleEnabled',
            label: 'settle'
        });
    };

    doubleReadEnabled = (): Node => {
        if(this.props.demoParcel.get('amount').value() < 2) {
            return null;
        }

        return this.renderToggle({
            field: 'doubleReadEnabled',
            label: 'doubleRead'
        });
    };
}
