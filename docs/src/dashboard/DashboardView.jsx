// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import {ParcelStateHock} from 'parcels-react';
import DashboardStructure from './DashboardStructure';
import ResponsiveAnalogReadHock from '../simulation/ResponsiveAnalogReadHock';

export default composeWith(
    ResponsiveAnalogReadHock(),
    ParcelStateHock({
        initialValue: () => ({
            input: 0
        }),
        prop: "stateParcel"
    }),
    DashboardStructure
);
