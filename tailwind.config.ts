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
      xl: '1040px',
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
