// @flow

function makeTheme(colors) {
    return {
        colors,
        fonts: {
            copy: `'Menlo', 'Inconsolata', monospaced`
        },
        textStyles: {
            h1: {
                backgroundColor: colors.yellow,
                color: colors.bg,
                fontWeight: 'bold',
                textAlign: 'center'
            },
            h2: {
                color: colors.yellow,
                borderBottom: '1px solid'
            },
            h3: {
                color: colors.yellow
            },
            em: {
                fontStyle: 'italic'
            },
            strong: {
                fontWeight: 'bold'
            },
            code: {
                color: colors.purple,
                backgroundColor: colors.black
            },
            href: {
                cursor: 'pointer',
                textDecoration: 'underline'
            }
        }
    };
}

export const DarkTheme = makeTheme({
});

export const LightTheme = makeTheme({
});
