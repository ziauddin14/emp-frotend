import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(
      /* options */
      {
        /* Add your Tailwind CSS configuration options here */
        config: './tailwind.config.js',
        postcss: true,
        applyBaseStyles: true,
        applyUtilities: true,
        applyComponents: true,
        jit: true,
        purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
        darkMode: false, // or 'media' or 'class'
        theme: {
          extend: {
            fontFamily: {
              "pacific": ["Pacifico", 'sens-serif']
            },
          },
        },
        variants: {
          extend: {},
        },
        plugins: [],
      }
    ),
  ],
})