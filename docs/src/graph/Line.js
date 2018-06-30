// @flow

export default class Line {
    min: ?number;
    max: ?number;
    height: ?number;
    _last: ?number;

    to(value: number) {
        let v1 = value;
        let v2 = this._last;
        this._last = v1;
        if(typeof v2 === "undefined") {
            v2 = v1;
        }
        this.min = Math.min(v1, v2);
        this.max = Math.max(v1, v2);
        if(v1 > v2) {
            this.min = v2 + 1;
            this.max = v1 + 1;
        } else if(v1 < v2) {
            this.min = v1;
            this.max = v2;
        } else {
            this.min = v1;
            this.max = v1 + 1;
        }
        this.height = this.max - this.min;
    }
}
