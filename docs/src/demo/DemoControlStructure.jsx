// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';

import React from 'react';
import Structure from '../component/Structure';
import DemoSliderStructure from './DemoSliderStructure';
import {Box, Grid, GridItem} from 'dcme-style';
import {numberToExp} from '../util/ParcelModifiers';

type Props = {
    demoParcel: Parcel,
    height: number,
    layout?: ComponentType
};

type LayoutProps = {
    input: () => Node,
    noise: () => Node,
    raw: () => Node,
    output: () => Node
};

export default class DemoControlStructure extends Structure<Props> {

    renderSlider = ({field, label, ...otherProps}: *): Node => {
        let {demoParcel, height} = this.props;
        let {min, max} = demoParcel.value();
        return <DemoSliderStructure
            valueParcel={demoParcel.get(field)}
            height={height}
            label={label}
            min={min}
            max={max}
            {...otherProps}
        />;
    };

    static elements = ['input', 'noise', 'raw', 'output'];

    static layout = ({input, noise, raw, output}: LayoutProps): Node => {
        return <Box style={{width: '16rem'}}>
            <Grid>
                <GridItem modifier="paddingMilli always 4">{input()}</GridItem>
                <GridItem modifier="paddingMilli always 4">{noise()}</GridItem>
                <GridItem modifier="paddingMilli always 4">{raw()}</GridItem>
                <GridItem modifier="paddingMilli always 4">{output()}</GridItem>
            </Grid>
        </Box>;
    };

    input = (): Node => {
        return this.renderSlider({
            field: 'input',
            label: 'Control'
        });
    };

    noise = (): Node => {
        let {demoParcel, height} = this.props;
        let {min, max} = demoParcel.value();
        let curve = 5;
        let range = max - min;
        let sliderMax = Math.pow(range, 1/curve);
        let value = demoParcel.get('noise').value();
        value = value.toFixed(value >= 10 ? 0 : 1);

        return <DemoSliderStructure
            valueParcel={demoParcel.get('noise').modify(numberToExp(curve))}
            height={height}
            label="Noise"
            min={0}
            max={sliderMax}
            step={sliderMax / range}
            value={value}
        />;
    };

    raw = (): Node => {
        return this.renderSlider({
            field: 'raw',
            label: 'Raw',
            disabled: true
        });
    };

    output = (): Node => {
        return this.renderSlider({
            field: 'output',
            label: 'Output',
            disabled: true
        });
    };
}
