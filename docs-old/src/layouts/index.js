// @flow
import React from 'react';
import type {Node} from 'react';
import Helmet from 'react-helmet';

import {Head} from 'dcme-style';
import './style.scss';

export default ({children, data}: Object): Node => <div>
    <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" content="Website" />
    </Helmet>
    <Head />
    {children()}
</div>;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
