// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import {ParcelStateHock} from 'parcels-react';
import SimulationHock from '../simulation/SimulationHock';
import DemoState from './DemoState';
import DemoStructure from './DemoStructure';

export default composeWith(
    ParcelStateHock({
        initialValue: () => DemoState(),
        prop: "demoParcel"
    }),
    SimulationHock(),
    DemoStructure
);
