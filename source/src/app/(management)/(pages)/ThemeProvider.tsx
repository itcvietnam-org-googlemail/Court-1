'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                props: {
                                    variant: 'custom'
                                },
                                style: {
                                    border: '5px solid yellow',
                                    color: 'red'
                                },
                            },
                            {
                                props: {
                                    variant: 'my'
                                },
                                style: {
                                    color: 'gray'
                                },
                            },
                            {
                                props: {
                                    variant: 'custom',
                                    feature: 'btn'
                                },
                                style: {
                                    border: '2px solid green',
                                    background: '#ccc'
                                },
                            },
                        ],
                    },
                },
            },
            MuiBox: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                props: {
                                    variant: 'c'
                                },
                                style: {
                                    border: '5px solid yellow',
                                    color: 'red'
                                },
                            },
                            {
                                props: {
                                    variant: 'c',
                                    feature: 'box'
                                },
                                style: {
                                    border: '2px solid green',
                                    background: '#ccc'
                                },
                            },
                        ],
                    },
                },
            },
        },
    });

    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}