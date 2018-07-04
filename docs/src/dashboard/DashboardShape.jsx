// @flow
import React from 'react';
import type {Node} from 'react';
import {Column, Grid} from 'dcme-style';
import SpruceClassName from 'stampy/lib/util/SpruceClassName';

export default (props: *): Node => {
    const {
        className,
        modifier,
        spruceName: name = 'Dashboard',
        code,
        desc,
        control,
        title,
        ...otherProps
    } = props;

    const parentClassName = SpruceClassName({className, modifier, name});

    return <div className={parentClassName} {...otherProps}>
        <div className={`${name}_title`}>{title()}</div>
        <Grid className={`${name}_content`}>
            <Column modifier="5 padding" className={`${name}_left`}>{code()}</Column>
            <Column modifier="7 padding" className={`${name}_right`}>
                <div className={`${name}_control`}>{control()}</div>
                <div className={`${name}_desc`}>{desc()}</div>
            </Column>
        </Grid>
    </div>;
};
