/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
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
        'header-image': 'url(./header-image.png)'
      }
    }
  },
  plugins: []
}
