// @flow
import type {Node} from 'react';

import React from 'react';
import NumberSlider from 'component/NumberSlider';
import {numberToFloor, numberToExp, exp} from 'demo/ParcelUpdaters';

type Props = {
    parcel: Parcel,
    toggleParcel?: ?Parcel,
    min: number,
    max: number,
    curve: number,
    expMin: number,
    step: number
};

export default (props: Props): Node => {
    let {curve = 5, expMin = 0.04, step = 0.1, max, min, parcel, toggleParcel} = props;
    let range = max - min;
    let sliderMin = exp(curve)(expMin);
    let sliderMax = exp(curve)(range);
    let value = parcel.value || 0;

    let expParcel = parcel.pipe(
        numberToFloor(step),
        numberToExp(curve)
    );

    let valueRenderer = step >= 1
        ? () => value.toFixed(0)
        : () => value.toFixed(value >= 10 ? 0 : 1);

    return <NumberSlider
        {...props}
        parcel={expParcel}
        min={sliderMin}
        max={sliderMax}
        step={sliderMax / range}
        valueRenderer={valueRenderer}
        toggleParcel={toggleParcel}
    />;
};
