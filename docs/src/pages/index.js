// @flow
import React from 'react';
import type {Node} from 'react';
import {Box, Text} from 'dcme-style';
import scriptLoader from 'react-async-script-loader';
import composeWith from 'unmutable/lib/util/composeWith';
import PollHock from '../component/PollHock';

const Index = (): Node => {
    let analog = new window.Module.ResponsiveAnalogRead();
    let hello = analog.hello();
    return <Box>
        <Text element="h1" modifier="sizeGiga">ResponsiveAnalogRead</Text>
        <Text>hello: {hello}</Text>
    </Box>;
};

const Loader = <p>Loading...</p>;

export default composeWith(
    scriptLoader(['/jslib.js']),
    PollHock({
        until: () => window && window.Module && window.Module.ResponsiveAnalogRead
    }),
    (Component) => ({isScriptLoaded, done, ...props}: *) => isScriptLoaded && done
        ? <Component {...props} />
        : Loader,
    Index
);
