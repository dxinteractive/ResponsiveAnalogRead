// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import {ParcelStateHock} from 'parcels-react';
import SimulationHock from '../simulation/SimulationHock';
import DemoState from './DemoState';
import DemoStructure from './DemoStructure';

let modify = parcel => parcel.addModifier({
    match: "*",
    modifier: rr => rr.modifyData((ss) => ({
        ...ss,
        meta: {
            isDefault: DemoState()[rr.key()] === rr.value(),
            ...ss.meta
        }
    }))
});

// next version of parcels should be more like:
/*

let modify = parcel => parcel.addModifier({
    match: "*",
    modifier: rr => rr.modify(ss => ss.setMeta({
        isDefault: DemoState()[rr.key()] === rr.value(),
    }))
});

*/

export default composeWith(
    ParcelStateHock({
        initialValue: () => DemoState(),
        prop: "demoParcel",
        modify
    }),
    ParcelStateHock({
        initialValue: () => ({
            raw: 0,
            output: 0,
            hasChanged: false,
            isSettled: false,
            isAboveNoiseFloor: false
        }),
        prop: "simulationParcel"
    }),
    SimulationHock(),
    DemoStructure
);
