'use client';

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme } from '@mui/material/styles';

export default function Theme({
    theme,
    children
}: {
    theme: Record<string, any>;
    children: React.ReactNode;
}) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={createTheme(theme)}>
                <CssBaseline />

                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}