/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
        serverComponentsExternalPackages: ['@prisma/client','bcrypt']
    },
};

module.exports = nextConfig;
