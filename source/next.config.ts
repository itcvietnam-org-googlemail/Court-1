import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    distDir: 'build',
    cacheComponents: true,
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                'cuddly-trout-4jv547pr97v43qgx-3000.app.github.dev',
                'localhost:3001',
                'cuddly-trout-4jv547pr97v43qgx-3001.app.github.dev'
            ]
        }
    }
};

export default nextConfig;