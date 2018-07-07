// @flow
import React from 'react';
import type {Node} from 'react';
import {GridItem, Grid} from 'dcme-style';
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
        <GridItem className={`${name}_graph`} modifier="9">{graph()}</GridItem>
        <GridItem className={`${name}_sliders`} modifier="3">
            <Grid>
                <GridItem modifier="4">{inputSlider()}</GridItem>
                <GridItem modifier="4">{rawSlider()}</GridItem>
                <GridItem modifier="4">{smoothSlider()}</GridItem>
            </Grid>
        </GridItem>
    </Grid>;
};
