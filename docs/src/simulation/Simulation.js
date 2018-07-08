// @flow

import SimulationTick from './SimulationTick';

type SimulationConfig = {
    ResponsiveAnalogRead: *,
    setMillis: Function
};

const DEFAULT_STATE = {
    delay: 20,
    input: 0,
    running: true,
    min: 0,
    max: 1023
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
        // TODO control running from here
        this.state = {
            ...this.state,
            ...newState
        };
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
            let {input} = this.state;
            let noise = (Math.random() - 0.5) * 10;
            let read = Math.round(input + noise);
            read = Math.min(this.state.max, Math.max(this.state.min, read));
            this._setAnalogReadValue(read);
            this.loop();
            this.ticks++;
        }
    };

    loop = () => {
        this._analog.read();
        let tick = new SimulationTick({
            input: this.state.input,
            raw: this._analog.raw(),
            output: this._analog.value()
        });

        console.log("tick", tick);

        this._bufferMap.forEach((buffer: Array<SimulationTick>) => {
            buffer.push(tick);
        });

        this._onTickListeners.forEach((onTick: Function) => {
            onTick(tick);
        });

        // delay() equivalent
        setTimeout(this.tick, this.state.delay);
    };
}

