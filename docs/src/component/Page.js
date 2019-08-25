// @flow
import type {Node} from "react";

import React from "react";
import Helmet from "react-helmet";
import {Head} from 'dcme-style';
import {ThemeProvider} from 'styled-components';
import {LightTheme} from 'style/Theme';

type Props = {
    children: *
};

export default ({children}: Props): Node => <div>
    <Helmet>
        <meta charSet="utf-8" />
        <title>ResponsiveAnalogRead</title>
        <meta name="description" content="An Arduino library for smoothing out noise" />
    </Helmet>
    <Head />
    <ThemeProvider theme={LightTheme}>
        {children}
    </ThemeProvider>
</div>;
