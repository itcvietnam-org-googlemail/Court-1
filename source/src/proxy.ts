//Import(s)
import { NextResponse, NextRequest } from 'next/server';
import { redirect } from 'next/navigation'
import { config } from '@/system/config';
import { auth } from '@/system/auth';

//Export(s)
export async function proxy(request: NextRequest) {
    for (const asyncProxy of config.asyncProxies) {
        const asyncProxyResponse = await asyncProxy(request);

        if (asyncProxyResponse) {
            return asyncProxyResponse;
        }
    }

    return NextResponse.next();
}

/*
export const config = {
    matcher: '/about/:path*',
};
*/