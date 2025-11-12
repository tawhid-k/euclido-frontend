/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '20.151.62.210',
                port: '3000',
                pathname: '/asset/university-logo/**'
            },
            {
                protocol: 'https',
                hostname: 'scholar.googleusercontent.com',
                pathname: '/citations'
            },
            {
                protocol: 'https',
                hostname: 'scholar.google.com',
                pathname: '/citations'
            }
        ]
    }
}
