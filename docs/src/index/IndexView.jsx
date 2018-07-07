// @flow
import composeWith from 'unmutable/lib/util/composeWith';
// import {ParcelStateHock} from 'parcels-react';
// import DemoState from './DemoState';
import IndexPage from './IndexPage';
import ResponsiveAnalogReadHock from '../simulation/ResponsiveAnalogReadHock';

export default composeWith(
    ResponsiveAnalogReadHock(),
    // ParcelStateHock({
    //     initialValue: () => DemoState(),
    //     prop: "stateParcel"
    // }),
    IndexPage
);
