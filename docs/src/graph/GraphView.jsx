// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import Graph from './Graph';
import ElementQueryHock from 'stampy/lib/hock/ElementQueryHock';
import ReactAnimationFrame from 'react-animation-frame';

export default composeWith(
    ElementQueryHock([]),
    ReactAnimationFrame,
    Graph
);
