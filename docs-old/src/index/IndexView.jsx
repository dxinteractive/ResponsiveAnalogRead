// @flow
import composeWith from 'unmutable/lib/util/composeWith';
import IndexPage from './IndexPage';
import ResponsiveAnalogReadHock from '../simulation/ResponsiveAnalogReadHock';

export default composeWith(
    ResponsiveAnalogReadHock(),
    IndexPage
);
