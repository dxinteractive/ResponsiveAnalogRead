// @flow
import React from 'react';
import Page from 'component/Page';
import {Link} from 'dcme-gatsby';
import {CenteredLanding, Text} from 'dcme-style';

export default () => <Page>
    <CenteredLanding
        top={() => <Text element="h1" modifier="sizeTera center">404</Text>}
        bottom={() => <Text element="p" modifier="monospace center margin">
            There's nothing here. Try heading back to the <Link to="/">homepage</Link>.
        </Text>}
    />
</Page>;
