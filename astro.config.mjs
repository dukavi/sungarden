// @ts-check

import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://aurinkotarha.fi',
	adapter: node({ mode: 'standalone' }),
	integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/admin') })],
	i18n: {
		defaultLocale: 'fi',
		locales: ['fi', 'sv', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
