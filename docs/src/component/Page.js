// @flow
import type {Node} from 'react';

import React from 'react';
import Helmet from 'react-helmet';
import {Head} from 'dcme-style/theme';
import {Theme} from 'dcme-style/theme';
import {mdxComponents} from 'dcme-style/core';
import {MDXProvider} from '@mdx-js/react';

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
    <MDXProvider components={mdxComponents}>
        <Theme>
            {children}
        </Theme>
    </MDXProvider>
</div>;
