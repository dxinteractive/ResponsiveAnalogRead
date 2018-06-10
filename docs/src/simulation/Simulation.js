// @flow

type SimulationConfig = {
    ResponsiveAnalogRead: *,
    setMillis: Function
};

export default class Simulation {
    _ResponsiveAnalogRead: * = null;
    _analog: * = null;
    _delay: number = 250;
    _running: boolean = true;
    _startTime: Date = Date.now();
    _setAnalogReadValue: Function = null;
    _setMillis: Function = null;

    ticks: number = 0;

    constructor({ResponsiveAnalogRead, setMillis, setAnalogReadValue}: SimulationConfig) {
        this._ResponsiveAnalogRead = ResponsiveAnalogRead;
        this._setMillis = setMillis;
        this._setAnalogReadValue = setAnalogReadValue;
        this.start();
    }

    start = () => {
        this._analog = new this._ResponsiveAnalogRead();
        this._running = true;
        this._startTime = Date.now();
        this.tick();
    };

    stop = () => {
        this._running = false;
    };

    tick = () => {
        if(this._running) {
            this._setMillis(Date.now() - this._startTime);
            this._setAnalogReadValue(Math.floor(Math.random() * 1024));
            this.loop();
            this.ticks++;
        }
    };

    loop = () => {
        this._analog.read();
        console.log(this._analog.value());

        // delay() equivalent
        setTimeout(this.tick, this._delay);
    };
}

