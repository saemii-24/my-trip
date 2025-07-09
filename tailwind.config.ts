import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '150': '150px',
      },
      borderRadius: {
        '60': '60px',
      },
      lineHeight: {
        '120': '120%',
        '130': '130%',
        '150': '150%',
        '160': '160%',
        '170': '170%',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        color: {
          lime: {
            '50': '#fbffe6',
            '100': '#f3ffc8',
            '200': '#e7fe98',
            '300': '#d2fa5c',
            '400': '#c4f244',
            '500': '#9dd70b',
            '600': '#7aac04',
            '700': '#5c8209',
            '800': '#4a670d',
            '900': '#3e5710',
            '950': '#1f3003',
          },
          blue: {
            '50': '#f0f8ff',
            '100': '#e0f0fe',
            '200': '#bae1fd',
            '300': '#7dcafc',
            '400': '#38aff8',
            '500': '#1ea0f1',
            '600': '#0276c7',
            '700': '#035da1',
            '800': '#075085',
            '900': '#0c436e',
            '950': '#082a49',
          },
          gray: {
            '50': '#f8f8f8',
            '100': '#f2f2f2',
            '200': '#dcdcdc',
            '300': '#bdbdbd',
            '400': '#989898',
            '500': '#7c7c7c',
            '600': '#656565',
            '700': '#525252',
            '800': '#464646',
            '900': '#3d3d3d',
            '950': '#171717',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
