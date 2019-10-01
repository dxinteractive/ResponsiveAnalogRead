// @flow
import cancel from 'react-dataparcels/cancel';

export const numberToString = () => parcel => parcel
    .modifyDown(value => `${value}`)
    .modifyUp(value => {
        value = Number(value);
        return isNaN(value) ? cancel : value;
    });

export const exp = (pow: number) => (value: number) => Math.pow(value, 1/pow);

export const numberToExp = (pow: number) => parcel => parcel
    .modifyDown(exp(pow))
    .modifyUp(value => Math.pow(value, pow));


export const numberToFloor = (step: ?number = 1): Functino => {
    let floor = value => Math.floor(value / step) * step;
    return parcel => parcel
        .modifyDown(floor)
        .modifyUp(floor);
};
