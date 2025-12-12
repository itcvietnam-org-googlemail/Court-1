import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { config } from '../config';

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    let theme = config.theme;

    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <main>{children}</main>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}