import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    distDir: 'build',

    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                'cuddly-trout-4jv547pr97v43qgx-3000.app.github.dev'
            ]
        }
    }
};

export default nextConfig;