// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';

import React from 'react';
import {PureParcel} from 'parcels-react';
import {Grid, GridItem, Input, Select, Text, Toggle} from 'dcme-style';
import Structure from '../component/Structure';
import {numberToString} from '../util/ParcelModifiers';

type Props = {
    demoParcel: Parcel,
    layout?: ComponentType
};

type LayoutProps = {
    play: () => Node,
    max: () => Node,
    min: () => Node,
    zoom: () => Node
};

const ZOOM_OPTIONS = [
    {value: "1", label: "1x"},
    {value: "2", label: "2x"},
    {value: "4", label: "4x"},
    {value: "8", label: "8x"},
    {value: "16", label: "16x"},
    {value: "32", label: "32x"},
    {value: "64", label: "64x"}
];

export default class DemoGraphSettingsStructure extends Structure<Props> {

    static elements = ['play', 'max', 'min', 'zoom'];

    static layout = ({play, zoom, min, max}: LayoutProps): Node => {
        return <Grid modifier="auto">
            <GridItem modifier="paddingMilli">{play()}</GridItem>
            <GridItem modifier="paddingMilli shrink">{zoom()}</GridItem>
            <GridItem modifier="paddingMilli shrink">{min()}</GridItem>
            <GridItem modifier="paddingMilli shrink">{max()}</GridItem>
        </Grid>;
    };

    play = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <PureParcel parcel={demoParcel.get('play')}>
                {(parcel) => <Toggle {...parcel.spread()} modifier="checkbox">run</Toggle>}
            </PureParcel>
        </label>;
    };

    max = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">max</Text>
            <PureParcel parcel={demoParcel.get('max').modify(numberToString())} debounce={100}>
                {(parcel) => <Input
                    {...parcel.spread()}
                    type="number"
                    style={{width: '6rem'}}
                />}
            </PureParcel>
        </label>;
    };

    min = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">min</Text>
            <PureParcel parcel={demoParcel.get('min').modify(numberToString())} debounce={100}>
                {(parcel) => <Input
                    {...parcel.spread()}
                    type="number"
                    style={{width: '6rem'}}
                />}
            </PureParcel>
        </label>;
    };

    zoom = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">zoom</Text>
            <PureParcel parcel={demoParcel.get('zoom').modify(numberToString())}>
                {(parcel) => <Select
                    {...parcel.spread()}
                    options={ZOOM_OPTIONS}
                    clearable={false}
                />}
            </PureParcel>
        </label>;
    };
}
