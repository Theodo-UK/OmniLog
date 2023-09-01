/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
        // serverComponentsExternalPackages lists packages that should not be called by the client (see https://youtu.be/2kgqPvs0j_I?t=1285)
        serverComponentsExternalPackages: ['@prisma/client','bcryptjs']
    },
};

module.exports = nextConfig;
