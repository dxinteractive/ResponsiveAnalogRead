// @flow
import React from 'react';
import Code from '../component/Code';
import {Box, Message, Text} from 'dcme-style';

export default () => <Box>
    <Text element="h2" modifier="sizeGiga marginGiga">API</Text>
    <Text element="h3" modifier="sizeMega marginMega">.pin()</Text>
    <Box modifier="marginBottomKilo">
        <Code>void pin(int pin);</Code>
    </Box>
    <Text element="p" modifier="margin">Sets the analog input pin that will be read.</Text>
    <Box modifier="marginRowKilo">
        <Message>You don't need to set this if you will be using your own ADC or passing in your own values to <Text modifier="weightKilo">.read()</Text></Message>
    </Box>
</Box>;
