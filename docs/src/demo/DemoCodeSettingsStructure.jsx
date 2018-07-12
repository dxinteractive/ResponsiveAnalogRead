// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel from 'parcels-react';

import React from 'react';
import {PureParcel} from 'parcels-react';
import {Box, Input, Text, Toggle} from 'dcme-style';
import Structure from '../component/Structure';
import {numberToString} from '../util/ParcelModifiers';

type Props = {
    demoParcel: Parcel,
    layout?: ComponentType
};

type LayoutProps = {
    noisefloor: () => Node,
    smooth: () => Node,
    quick: () => Node,
    settle: () => Node
};

export default class DemoCodeSettingsStructure extends Structure<Props> {

    static elements = ['noisefloor', 'smooth', 'quick', 'settle'];

    static layout = ({noisefloor, smooth, quick, settle}: LayoutProps): Node => {
        return <Box>
            <Box modifier="paddingBottomMilli"><Text element="div" modifier="right">{noisefloor()}</Text></Box>
            <Box modifier="paddingBottomMilli"><Text element="div" modifier="right">{smooth()}</Text></Box>
            <Box modifier="paddingBottomMilli"><Text element="div" modifier="right">{quick()}</Text></Box>
            <Box modifier="paddingBottomMilli"><Text element="div" modifier="right">{settle()}</Text></Box>
        </Box>;
    };

    noisefloor = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">noisefloor</Text>
            <PureParcel parcel={demoParcel.get('noisefloor').modify(numberToString())} debounce={50}>
                {(parcel) => <Input
                    {...parcel.spread()}
                    type="number"
                    style={{width: '6rem'}}
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
