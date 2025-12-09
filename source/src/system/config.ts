import { proxyAuth } from '@/system/proxy-auth';
import { proxyRewrite } from '@/system/proxy-rewrite';

export const config = {
    public_urls: [
        '/login',
        '/dang-nhap'
    ],
    asyncProxies: [
        proxyAuth,
        proxyRewrite
    ]
};