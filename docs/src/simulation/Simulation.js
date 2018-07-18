// @flow

import SimulationTick from './SimulationTick';
import keyArray from 'unmutable/lib/keyArray';
import pick from 'unmutable/lib/pick';

type SimulationConfig = {
    ResponsiveAnalogRead: *,
    setMillis: Function
};

const DEFAULT_STATE = {
    delay: 1000,
    input: 0,
    noise: 0,
    running: true,
    play: true,
    min: 0,
    max: 1023,
    noisefloor: 0,
    glide: 2,
    smooth: 100,
    settle: 2,
    glideEnabled: true,
    smoothEnabled: true,
    settleEnabled: true,
    doubleReadEnabled: false
};

export default class Simulation {
    _ResponsiveAnalogRead: * = null;
    _analog: * = null;
    _bufferMap: Map<Array<SimulationTick>> = new Map();
    _onTickListeners: Array<Function> = [];
    _startTime: Date = Date.now();
    _setAnalogReadValue: Function = null;
    _setMillis: Function = null;

    state: * = DEFAULT_STATE;
    ticks: number = 0;

    constructor({ResponsiveAnalogRead, setMillis, setAnalogReadValue}: SimulationConfig) {
        this._ResponsiveAnalogRead = ResponsiveAnalogRead;
        this._setMillis = setMillis;
        this._setAnalogReadValue = setAnalogReadValue;
        this.start();
    }

    analog = (): * => {
        return this._analog;
    };

    setState = (newState: *) => {
        this.state = {
            ...this.state,
            ...pick(keyArray()(DEFAULT_STATE))(newState)
        };
        this.updateSettings();
    };

    updateSettings = () => {
        let {
            noisefloor,
            glideEnabled,
            smoothEnabled,
            settleEnabled,
            doubleReadEnabled,
            glide,
            smooth,
            settle
        } = this.state;

        this._analog.noiseFloor(noisefloor);
        this._analog.glide(glideEnabled ? glide : 0);
        this._analog.smooth(smoothEnabled ? smooth : 0);
        this._analog.settle(settleEnabled ? settle : 0);
        this._analog.doubleRead(doubleReadEnabled);
    };

    addOnTickListener = (onTick: Function) => {
        this._onTickListeners.push(onTick);
    };

    start = () => {
        this._analog = new this._ResponsiveAnalogRead();
        this.state.running = true;
        this._startTime = Date.now();
        this.tick();
    };

    stop = () => {
        this.state.running = false;
    };

    addBuffer = (name: string) => {
        this._bufferMap.set(name, []);
    };

    flushBuffer = (name: string): Array<SimulationTick> => {
        let buffer = this._bufferMap.get(name);
        this._bufferMap.set(name, []);
        return buffer;
    };

    tick = () => {
        if(this.state.running) {
            this._setMillis(Date.now() - this._startTime);
            let {input, noise} = this.state;
            let rand = (Math.random() - 0.5) * (noise + 1);
            let read = Math.round(input + rand);
            read = Math.min(this.state.max, Math.max(this.state.min, read));
            this._setAnalogReadValue(read);
            this.loop();
            this.ticks++;
        }
    };

    loop = () => {
        let {
            delay,
            input,
            play
        } = this.state;

        if(play) {
            this._analog.read();
            let tick = new SimulationTick({
                input,
                raw: this._analog.raw(),
                output: this._analog.value(),
                hasChanged: this._analog.hasChanged(),
                isSettled: this._analog.isSettled(),
                tension: this._analog.tension(),
                speed: this._analog.speed()
            });

            this._bufferMap.forEach((buffer: Array<SimulationTick>) => {
                buffer.push(tick);
            });

            this._onTickListeners.forEach((onTick: Function) => {
                onTick(tick);
            });
        }

        // delay() equivalent
        setTimeout(this.tick, delay);
    };
}

