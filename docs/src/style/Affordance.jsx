// @flow
import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {space, layout, textStyle, typography, color as colorSystem} from 'styled-system';
import GatsbyLink from 'gatsby-link';

const color = (key) => (props) => props.theme.colors[key];


export const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border-box;
    }
    body {
        background-color: ${_ => _.theme.colors.bg};
        color: ${_ => _.theme.colors.fg};
        font-family: ${_ => _.theme.fonts.copy};
        font-size: 13px;
        line-height: 1.4;
        padding: .5rem;
        margin: auto;
        max-width: 64rem;
    }
`;




export const List = styled.ul`
    ${space}
    padding-left: 1.8em;
    position: relative;
`;

export const ListItem = styled.li`
    ul > & {
        &:before {
            content: '*';
            position: absolute;
            left: .6em;
        }
    }

    ol > & {
        list-style-type: decimal;
    }
`;




export const Link = styled((props) => props.href ? <a {...props} /> : <GatsbyLink {...props} />)`
    color: ${_ => _.theme.colors.blue};
    &:visited {
        color: ${_ => _.theme.colors.blue};
    }
`;



export const Label = styled.span`
   color: ${_ => _.theme.colors.comment};
`;

export const Input = styled.input`
    background-color: ${p => p.theme.colors.black};
    color: ${p => p.theme.colors.fg};
    border: none;
    font-size: inherit;
    font-family: inherit;
    display: block;
    width: 100%;
`;


const syntax = (key, color) => (props) => `& .${key} {color: ${props.theme.colors[color]};}`;
export const Code = styled.pre`
   color: ${_ => _.theme.colors.fg};
   background-color: ${_ => _.theme.colors.black};
   margin: 1em 0;
   padding: .6em;
   overflow-x: auto;

   ${syntax('comment', 'comment')}
   ${syntax('keyword', 'red')}
   ${syntax('string', 'green')}
   ${syntax('number', 'blue')}
   ${syntax('tag', 'yellow')}
   ${syntax('script', 'fg')}

   ${syntax('selector', 'yellow')}
   ${syntax('property', 'red')}

   .gatsby-highlight-code-line {
        display: block;
        background-color: ${color('lineHighlight')};
        margin: 0 -.6em;
        padding: 0 .6em;
   }
`;

export const Quote = styled.blockquote`
    font-style: italic;
    overflow: hidden;
    position: relative;
    padding-left: 1.2em;
    padding-top: 1.2em;
    margin: 1em 0;
    color: ${color('purple')};
    &:before {
        content: '>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>\\A>';
        position: absolute;
        left: 0;
        white-space: pre;
        top: -2px;
    }
`;

export const Text = styled.span({}, textStyle, typography, space, colorSystem);

export const Heading = styled(Text)``;
Heading.defaultProps = {
    as: 'h1',
    textStyle: 'h1'
};

export const SubHeading = styled(Text)``;
SubHeading.defaultProps = {
    as: 'h2',
    textStyle: 'h2'
};


export const Image = styled('img')({}, layout);

//
// Tables

export const Table = styled.table`
    width: 100%;
    border-bottom: 1px solid;
`;

export const TableHeadCell = styled.th`
    border-bottom: 1px solid;
    text-align: left;
    font-weight: bold;
`;
