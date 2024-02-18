/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'hrfopsbdnnjaxeedlnot.supabase.co'
            }
        ]
    }
};

export default nextConfig;
