// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import ElementQueryHock from 'stampy/lib/hock/ElementQueryHock';
import ControlStructure from './ControlStructure';

export default composeWith(
    ElementQueryHock([]),
    ControlStructure
);
