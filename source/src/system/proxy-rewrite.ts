import { NextResponse, NextRequest } from 'next/server';
import { config } from '@/system/config';
 
export async function proxyRewrite(request: NextRequest): Promise<NextResponse<unknown> | null> {
    if (request.nextUrl.pathname === '/dang-nhap') {
        return NextResponse.rewrite(new URL(
            '/login',
            request.url
        ));
    }

    return null;
}