// @flow

export default class SimulationTick {
    input: number;
    raw: number;
    output: number;
    hasChanged: boolean;
    isSettled: boolean;
    isAboveNoiseFloor: boolean;

    constructor(props: *) {
        this.input = props.input;
        this.raw = props.raw;
        this.output = props.output;
        this.hasChanged = props.hasChanged;
        this.isSettled = props.isSettled;
        this.isAboveNoiseFloor = props.isAboveNoiseFloor;
    }

    toJS(): * {
        return {
            input: this.input,
            raw: this.raw,
            output: this.output,
            hasChanged: this.hasChanged,
            isSettled: this.isSettled,
            isAboveNoiseFloor: this.isAboveNoiseFloor
        };
    }
}
