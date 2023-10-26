import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xl2: '1320px',
      xl3: '1500px',
    },
    extend: {
      colors: {
        beige: {
          normal: '#f1edc8',
        },
        orangee: {
          normal: '#e05d27',
        },
        lime: {
          normal: '#cec22e',
        },
        darkblue: {
          normal: '#115151',
        },
        lightblue: {
          normal: '#40a4a6',
        },
        darktext:{
          normal: '#0a0d14',
        },
        lighttext: {
          normal: '#f8f9fc',
        }
      },
      boxShadow: {
        'btn': '4px 4px #000',
        'btn-orange': '4px 4px #e05d27',
        'card': '4px 4px #CEC22E',
      },
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
