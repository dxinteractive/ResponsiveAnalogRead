// @flow
import type Parcel, {ChangeRequest} from 'parcels-react';

export const changeToNumber = parcel => parcel.modifyChange((parcel: Parcel, changeRequest: ChangeRequest) => {
    let value: number = Number(changeRequest.data().value);
    if(!isNaN(value)) {
        parcel.onChange(value);
    }
});
