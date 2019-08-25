// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import ElementQueryHock from 'stampy/lib/hock/ElementQueryHock';
import ReactAnimationFrame from 'react-animation-frame';
import Graph from './Graph';

export default composeWith(
    ElementQueryHock(),
    ReactAnimationFrame,
    Graph
);
