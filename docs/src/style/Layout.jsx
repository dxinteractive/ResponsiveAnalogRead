// @flow
import styled from 'styled-components';
import {space, color, layout, flexbox, position} from 'styled-system';

export const Box = styled.div({display: 'block'}, space, color, layout, flexbox);
export const Flex = styled.div({display: 'flex'}, space, color, layout, flexbox);
export const Fixed = styled.div({position: 'fixed'}, space, layout, position);
