import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}