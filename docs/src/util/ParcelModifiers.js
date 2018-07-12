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

export const numberToExp = (pow: number) => parcel => parcel
    .modifyValue(value => Math.pow(value, 1/pow))
    .modifyChangeValue(value => Math.pow(value, pow));
