import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ThemeProvider from './ThemeProvider';

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    )
}