// @flow
import type {ComponentType} from 'react';
import type {Node} from 'react';
import type Parcel, {ChangeRequest} from 'parcels-react';

import React from 'react';
import {PureParcel} from 'parcels-react';
import {Grid, GridItem, Input, Select, Text} from 'dcme-style';
import Structure from '../component/Structure';

type Props = {
    demoParcel: Parcel,
    layout?: ComponentType
};

type LayoutProps = {
    max: () => Node,
    min: () => Node,
    zoom: () => Node
};

const changeToNumber = parcel => parcel.modifyChange((parcel: Parcel, changeRequest: ChangeRequest) => {
    let value: number = Number(changeRequest.data().value);
    if(!isNaN(value)) {
        parcel.onChange(value);
    }
});

export default class DemoGraphSettingsStructure extends Structure<Props> {

    static elements = ['max', 'min', 'zoom'];

    static layout = ({max, min, zoom}: LayoutProps): Node => {
        return <Grid modifier="auto">
            <GridItem />
            <GridItem modifier="paddingMilli shrink">{zoom()}</GridItem>
            <GridItem modifier="paddingMilli shrink">{min()}</GridItem>
            <GridItem modifier="paddingMilli shrink">{max()}</GridItem>
        </Grid>;
    };

    max = (): Node => {
        let {demoParcel} = this.props;
        return <label>
            <Text modifier="monospace marginRight">max</Text>
            <PureParcel parcel={demoParcel.get('max').modify(changeToNumber)}>
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
            <PureParcel parcel={demoParcel.get('min').modify(changeToNumber)}>
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
            <PureParcel parcel={demoParcel.get('zoom').modify(changeToNumber)}>
                {(parcel) => <select {...parcel.spreadDOM()}>
                    <option value="1">1x</option>
                    <option value="2">2x</option>
                    <option value="4">4x</option>
                    <option value="8">8x</option>
                    <option value="16">16x</option>
                </select>}
            </PureParcel>
        </label>;
    };
}
