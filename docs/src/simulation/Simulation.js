// @flow

import SimulationTick from './SimulationTick';

type SimulationConfig = {
    ResponsiveAnalogRead: *,
    setMillis: Function
};

const DEFAULT_STATE = {
    delay: 30,
    input: 0,
    running: true
};

let i = 512;

export default class Simulation {
    _ResponsiveAnalogRead: * = null;
    _analog: * = null;
    _bufferMap: Map<Array<SimulationTick>> = new Map();
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
            if(Math.random() > 0.4) {
                i += Math.random() * 6 - 3;
            }
            this._setAnalogReadValue(i);
            this.loop();
            this.ticks++;
        }
    };

    loop = () => {
        this._analog.read();
        let tick = new SimulationTick({
            value: this._analog.value(),
            raw: this._analog.raw()
        });

        this._bufferMap.forEach((buffer: Array<SimulationTick>) => {
            buffer.push(tick);
        });

        // delay() equivalent
        setTimeout(this.tick, this.state.delay);
    };
}

