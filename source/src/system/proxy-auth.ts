import { NextResponse, NextRequest } from 'next/server';
import { config } from '@/system/config';
import { auth } from '@/system/auth';
 
export async function proxyAuth(request: NextRequest): Promise<NextResponse<unknown> | null> {
    const path = request.nextUrl.pathname;
    const isPublicPath = config.public_urls.includes(path);
    const user = await auth();

    if (!isPublicPath && !user) {
        return NextResponse.redirect(new URL(
            '/login',
            request.url
        ));
    }

    /*
    if (isPublicPath && user) {
        return NextResponse.redirect(new URL(
            '/',
            request.url
        ));
    }
    */

    return null;
}