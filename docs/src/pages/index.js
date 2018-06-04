// @flow
import React from 'react';
import scriptLoader from 'react-async-script-loader';
import composeWith from 'unmutable/lib/util/composeWith';
import {ParcelStateHock} from 'parcels-react';

import PollHock from '../component/PollHock';
import IndexStructure from '../structure/IndexStructure';

const Loader = <p>Loading...</p>;

export default composeWith(
    scriptLoader(['/jslib.js', '/ResponsiveAnalogRead/jslib.js']),
    PollHock({
        until: () => window && window.Module && window.Module.ResponsiveAnalogRead
    }),
    (Component) => ({isScriptLoaded, done, ...props}: *) => isScriptLoaded && done
        ? <Component {...props} />
        : Loader,
    ParcelStateHock({
        initialValue: () => ({
            input: 0
        }),
        prop: "state"
    }),
    IndexStructure
);
