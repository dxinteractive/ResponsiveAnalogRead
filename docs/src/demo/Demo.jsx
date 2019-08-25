// @flow

import React from 'react';
import {Box} from 'style/Layout';
import {Flex} from 'style/Layout';
import {Fixed} from 'style/Layout';
import {GlobalStyle} from 'style/Affordance';

export default () => <Box>
    <GlobalStyle />
    <Fixed top={1} left={1}>
        hello
    </Fixed>
    <Flex display={['block', null, 'flex']} alignItems="start" pb={6}>
        <Box width={[1, null, .6]} mr={[null, null, 3]} mb={3} flexShrink={0}>...</Box>
        <Box width={[1, null, .4]}>???</Box>
    </Flex>
</Box>;
