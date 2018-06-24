// @flow
import React from 'react';
import type {Node} from 'react';
import {Box, Column, Grid} from 'dcme-style';

type Props = {
    code: () => Node,
    desc: () => Node,
    graph: () => Node,
    link: () => Node,
    title: () => Node
};

export default ({code, desc, graph, title}: Props): Node => <Box modifier="inverted flood">
    <Box modifier="padding">{title()}</Box>
    <Grid>
        <Column modifier="5 padding">
            {code()}
        </Column>
        <Column modifier="7 padding">
            <Box modifier="padding">{graph()}</Box>
            <Box modifier="padding">{desc()}</Box>
        </Column>
    </Grid>
</Box>;
