// @flow
import type Parcel, {ChangeRequest} from 'parcels-react';

export const numberToString = () => parcel => parcel
    .modifyValue(value => `${value}`)
    .modifyChange((parcel: Parcel, changeRequest: ChangeRequest) => {
        let value: number = Number(changeRequest.data().value);
        if(!isNaN(value)) {
            parcel.onChange(value);
        }
    });

export const exp = (pow: number) => (value: number) => Math.pow(value, 1/pow);

export const numberToExp = (pow: number) => parcel => parcel
    .modifyValue(exp(pow))
    .modifyChangeValue(value => Math.pow(value, pow));


export const numberToFloor = (step: ?number = 1): Parcel => {
    let floor = value => Math.floor(value / step) * step;
    return parcel => parcel
        .modifyValue(floor)
        .modifyChangeValue(floor);
};
