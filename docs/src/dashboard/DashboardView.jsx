// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import {ParcelStateHock} from 'parcels-react';
import DashboardStructure from './DashboardStructure';
import DashboardState from './DashboardState';
import ResponsiveAnalogReadHock from '../simulation/ResponsiveAnalogReadHock';

export default composeWith(
    ParcelStateHock({
        initialValue: () => DashboardState(),
        prop: "stateParcel"
    }),
    ResponsiveAnalogReadHock(),
    DashboardStructure
);
