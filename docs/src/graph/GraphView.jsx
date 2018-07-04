// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import Graph from './Graph';
import ElementQueryHock from 'stampy/lib/hock/ElementQueryHock';
import SetProp from 'stampy/lib/hock/SetProp';
import ReactAnimationFrame from 'react-animation-frame';

export default composeWith(
    ElementQueryHock([]),
    SetProp('eqHeight', props => props.parentHeight),
    ReactAnimationFrame,
    Graph
);
