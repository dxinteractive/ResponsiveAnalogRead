// @flow
import type {Node} from 'react';

import React from 'react';
import {Box} from 'dcme-style/layout';
import {Text} from 'dcme-style/affordance';
import {Loader} from 'dcme-style/affordance';

import {useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import useParcelState from 'react-dataparcels/useParcelState';
import wasmBinary from '../../wasm/wasm.wasm';
import wasmJs from '../../wasm/wasm.js';
import Simulation from 'simulation/Simulation';

type Props = {
    children: () => Node
};

const DEFAULT_STATE = {
    delay: 50,
    input: 20,
    noise: 4,
    min: 0,
    max: 63,
    zoom: 1,
    amount: 1,
    noisefloor: 4,
    glide: 1,
    smooth: 1,
    settle: 5,
    settleTime: 0,
    smoothEnabled: true,
    settleEnabled: false,
    glideEnabled: false,
    doubleReadEnabled: false,
    pin: true,
    play: true
};

const SIMULATION_RESULT_REFRESH_MS = 10;

export default (props: Props): Node => {
    let simulationRef = useRef();
    let [simulationResult, setSimulationResult] = useState({});
    let lastSimulationResultRef = useRef();

    useEffect(() => {
        // Since webpack will change the name and potentially the path of the
        // `.wasm` file, we have to provide a `locateFile()` hook to redirect
        // to the appropriate URL.
        // More details: https://kripken.github.io/emscripten-site/docs/api_reference/module.html
        const simulationModule = wasmJs({
            locateFile(path) {
                if(path.endsWith('.wasm')) {
                    return wasmBinary;
                }
                return path;
            }
        });

        simulationModule.onRuntimeInitialized = () => {
            let simulation = new Simulation({
                ...simulationModule,
                defaultState: DEFAULT_STATE
            });

            simulation.addOnTickListener((tick: SimulationTick) => {
                let now = new Date();
                if(!lastSimulationResultRef.current || now - lastSimulationResultRef.current > SIMULATION_RESULT_REFRESH_MS) {
                    setSimulationResult(tick);
                    lastSimulationResultRef.current = now;
                }
            });

            simulationRef.current = simulation;
        };
    }, []);

    let [stateParcel] = useParcelState({
        value: DEFAULT_STATE,
        updateValue: true,
        onChange: (parcel) => {
            simulationRef.current.setState(parcel.value);
        }
    });

    let [resultParcel] = useParcelState({
        value: simulationResult,
        updateValue: true
    });

    return simulationRef.current
        ? props.children({
            simulation: simulationRef.current,
            stateParcel,
            resultParcel
        })
        : <Box p={[3,3,4]}><Text textStyle="monospace">loading<Loader /></Text></Box>;
};
