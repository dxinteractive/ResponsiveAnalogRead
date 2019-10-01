// @flow

import type Parcel from 'react-dataparcels';

import React from 'react';
import ParcelBoundary from 'react-dataparcels/ParcelBoundary';
import {Box} from 'dcme-style/layout';
import {Flex} from 'dcme-style/layout';
import {Text} from 'dcme-style/affordance';
import {Toggle} from 'dcme-style/affordance';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type Props = {
    parcel: Parcel,
    toggleParcel?: ?Parcel,
    min: number,
    max: number,
    step: number,
    disabled?: boolean,
    label: string,
    valueRenderer: (value: number) => any
};

export default (props: Props): Node => {
    let {valueRenderer = ii => ii} = props;
    let {min, max, step, disabled, label, toggleParcel} = props;
    return <ParcelBoundary parcel={props.parcel} forceUpdate={[min, max, step, disabled, label, toggleParcel]}>
        {(parcel) => <Flex flexDirection="column" alignItems="center" minWidth="4rem" p={2}>
            <Box flexGrow="1">
                <Slider
                    {...parcel.spread()}
                    className="Slider"
                    vertical
                    min={min}
                    max={max}
                    step={step || 1}
                    disabled={disabled}
                    style={{height: '13rem'}}
                />
            </Box>
            <Box pt={2}>
                <Text>{valueRenderer(parcel.value || 0)}</Text>
            </Box>
            <Box minHeight="2.5rem">
                <Text as="div" fontSize="s" style={{textAlign: 'center', lineHeight: '1.2rem'}}>{label}</Text>
            </Box>
            <Box minHeight="3rem" pt={3}>
                {toggleParcel && <Toggle {...toggleParcel.spread()} />}
            </Box>
        </Flex>}
    </ParcelBoundary>;
};
