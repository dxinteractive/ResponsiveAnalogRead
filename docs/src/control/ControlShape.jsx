// @flow
import React from 'react';
import type {Node} from 'react';
import {Column, Grid} from 'dcme-style';
import SpruceClassName from 'stampy/lib/util/SpruceClassName';

export default (props: *): Node => {
    const {
        className,
        modifier,
        spruceName: name = 'Control',
        graph,
        inputSlider,
        rawSlider,
        smoothSlider,
        ...otherProps
    } = props;

    const parentClassName = SpruceClassName({className, modifier, name});

    return <Grid className={parentClassName} {...otherProps}>
        <Column className={`${name}_graph`} modifier="9">{graph()}</Column>
        <Column className={`${name}_sliders`} modifier="3">
            <Grid>
                <Column modifier="4">{inputSlider()}</Column>
                <Column modifier="4">{rawSlider()}</Column>
                <Column modifier="4">{smoothSlider()}</Column>
            </Grid>
        </Column>
    </Grid>;
};
