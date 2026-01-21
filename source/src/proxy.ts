//Import(s)
import { NextResponse, NextRequest } from 'next/server';
import { redirect } from 'next/navigation'
import { config } from '@/system/config';
import { auth } from '@/system/auth';

//Export(s)
export async function proxy(request: NextRequest) {
    const headers: Headers = new Headers(request.headers);

    headers.set('x-app', 'court.management');
    
    for (const asyncProxy of config.asyncProxies) {
        const asyncProxyResponse = await asyncProxy(request, headers);

        if (asyncProxyResponse) {
            return asyncProxyResponse;
        }
    }

    return NextResponse.next({
        request: {
            headers
        }
    });
}

/*
export const config = {
    matcher: '/about/:path*',
};
*/