// @flow

export default class SimulationTick {
    value: number;
    raw: number;

    constructor(props: *) {
        this.value = props.value;
        this.raw = props.raw;
    }
}
