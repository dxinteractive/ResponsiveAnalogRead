// @flow
import React from 'react';
import type {Node} from 'react';
import Helmet from 'react-helmet';

import {Head} from 'dcme-style';
import '../style/index.scss';

export default ({children, data}: Object): Node => <div>
    <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" content="Website" />
        <Head />
    </Helmet>
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
