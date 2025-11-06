import presetIcons from '@unocss/preset-icons'
import {
  defineConfig,
  presetWind3,
  transformerAttributifyJsx,
  transformerVariantGroup,
} from 'unocss'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  presets: [
    presetWind3(),
    presetShadcn({
      color: 'neutral',
    }),
    presetIcons(),
  ],
  theme: {
    colors: {
      destructive: '#d30000',
      muted: '#6d6f70ff',
    },
  },
  transformers: [
    transformerAttributifyJsx(),
    transformerVariantGroup(),
  ],
  preflights: [
    {
      getCSS: () => {
        return `html {
  padding: 0;
  margin: 0;
  scroll-behavior: smooth;
}
body {
  padding: 0;
  margin: 0;
  height: 100dvh;
  width: 100dvw;
  overflow-x: hidden;
  font-family: 'Ubuntu', sans-serif;
}
.bg-primary-gradient {
  background: linear-gradient(to bottom left, hsl(262.1 83.3% 67.5%), hsl(262.1 83.3% 47.5%));
  transition: opacity 0.15s ease-in-out;
  box-shadow: 0 2px 8px 5px hsl(262.1 83.3% 57.8% / 0.2);
  text-shadow: 0 2px 2px hsl(210 40% 98% / 0.2);
}
.bg-primary-gradient:hover {
  opacity: 0.85;
}
.bg-destructive-gradient {
  background: linear-gradient(to bottom left, hsl(0 84.2% 70.2%), hsl(0 84.2% 50.2%));
  box-shadow: 0 2px 8px 5px hsl(0 84.2% 60.2% / 0.2);
  text-shadow: 0 2px 2px hsl(0 0% 98% / 0.2); /* Assuming light foreground for destructive */
  transition: opacity 0.15s ease-in-out;
}
.bg-destructive-gradient:hover {
  opacity: 0.85;
}
`
      },
    },
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
})
