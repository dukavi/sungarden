// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://aurinkotarha.fi',
	output: 'static',
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: 'fi',
		locales: ['fi', 'sv', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
