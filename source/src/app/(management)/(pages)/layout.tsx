import Box from '@mui/material/Box';
import Theme from './theme';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { config } from '../config';

export default async function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    let theme = config.theme;

    return (
        <html lang="en">
            <body>
                <Theme theme={theme}>
                    {children}
                </Theme>
            </body>
        </html>
    )
}