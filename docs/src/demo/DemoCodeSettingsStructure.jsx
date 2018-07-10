// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';

import React from 'react';
import {PureParcel} from 'parcels-react';
import {Box, Select, Text, Toggle} from 'dcme-style';
import Structure from '../component/Structure';
import {changeToNumber} from '../util/ParcelModifiers';

type Props = {
    demoParcel: Parcel,
    layout?: ComponentType
};

type LayoutProps = {
    amount: () => Node,
    smooth: () => Node,
    quick: () => Node,
    settle: () => Node
};

const AMOUNT_OPTIONS = [
    {value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"},
    {value: "5", label: "5"}
];

export default class DemoCodeSettingsStructure extends Structure<Props> {

    static elements = ['amount', 'smooth', 'quick', 'settle'];

    static layout = ({amount, smooth, quick, settle}: LayoutProps): Node => {
        return <Box>
            <Box modifier="paddingBottomMilli"><Text element="div" modifier="right">{amount()}</Text></Box>
            <Box modifier="paddingBottomMilli"><Text element="div" modifier="right">{smooth()}</Text></Box>
            <Box modifier="paddingBottomMilli"><Text element="div" modifier="right">{quick()}</Text></Box>
            <Box modifier="paddingBottomMilli"><Text element="div" modifier="right">{settle()}</Text></Box>
        </Box>;
    };

    amount = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">amount</Text>
            <PureParcel parcel={demoParcel.get('amount').modify(changeToNumber)}>
                {(parcel) => <Select
                    {...parcel.spread()}
                    options={AMOUNT_OPTIONS}
                    clearable={false}
                />}
            </PureParcel>
        </label>;
    };

    smooth = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">smooth</Text>
            <PureParcel parcel={demoParcel.get('smooth')}>
                {(parcel) => <Toggle {...parcel.spread()} modifier="onOff" />}
            </PureParcel>
        </label>;
    };

    quick = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">quick</Text>
            <PureParcel parcel={demoParcel.get('quick')}>
                {(parcel) => <Toggle {...parcel.spread()} modifier="onOff" />}
            </PureParcel>
        </label>;
    };

    settle = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">settle</Text>
            <PureParcel parcel={demoParcel.get('settle')}>
                {(parcel) => <Toggle {...parcel.spread()} modifier="onOff" />}
            </PureParcel>
        </label>;
    };
}
