import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'page-black': '#2C2C2C',
        'page-black-hover': '#3D3D3D',
        'page-red': '#CC1717',
        'page-red-hover': '#DD2727',
        'page-orange': '#FFB900',
        'page-orange-hover': '#FFA00',
        'page-gray': '#8A8A8A'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'header-image': 'url(/header-image.png)',
        'hero-wallpaper': 'url("/MainWallpaper.png")'
      }
    }
  },
  plugins: []
}
export default config
