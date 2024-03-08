/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      vlarge: '1120px',

      'lg+': '1160px',
      // => @media (min-width: 1280px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1700px',
      // => @media (min-width: 1536px) { ... }

      '4xl': '1920px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'asiseg-blue': '#03989E',
        'asiseg-gray': '#A6A6A6',
        'main-color': '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#03989E',

          secondary: '#ff2400',

          accent: '#4000ff',

          neutral: '#fff',

          'base-100': '#172f21',

          info: '#00afff',

          success: '#3CB371',

          warning: '#ffcf00',

          error: '#B91C1C',
        },
      },
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
}
