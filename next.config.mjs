/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    basePath: isProd ? '/lumix-s1h' : '',
    assetPrefix: isProd ? '/lumix-s1h/' : '',
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
};

export default nextConfig;
