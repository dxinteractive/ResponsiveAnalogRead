// @flow

export default class SimulationTick {
    input: number;
    raw: number;
    output: number;

    constructor(props: *) {
        this.input = props.input;
        this.raw = props.raw;
        this.output = props.output;
    }

    toJS(): * {
        return {
            input: this.input,
            raw: this.raw,
            output: this.output
        };
    }
}
