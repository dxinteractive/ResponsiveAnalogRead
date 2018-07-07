// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import {ParcelStateHock} from 'parcels-react';
import DemoState from './DemoState';
import DemoStructure from './DemoStructure';
import ResponsiveAnalogReadHock from '../simulation/ResponsiveAnalogReadHock';

export default composeWith(
    ParcelStateHock({
        initialValue: () => DemoState(),
        prop: "stateParcel"
    }),
    ResponsiveAnalogReadHock(),
    DemoStructure
);
