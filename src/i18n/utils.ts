import { translations, defaultLang, type Lang } from './translations';

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (lang in translations) return lang as Lang;
	return defaultLang;
}

export function t(lang: Lang, key: string): string {
	return translations[lang][key] || translations[defaultLang][key] || key;
}

export function getLocalePath(lang: Lang, path: string): string {
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	if (lang === defaultLang) return cleanPath;
	return `/${lang}${cleanPath}`;
}

export function getAlternateUrls(currentPath: string): { lang: Lang; href: string }[] {
	// Strip language prefix to get the base path
	const pathParts = currentPath.split('/').filter(Boolean);
	let basePath = currentPath;

	if (pathParts[0] === 'sv' || pathParts[0] === 'en') {
		basePath = '/' + pathParts.slice(1).join('/');
	}
	if (basePath === '') basePath = '/';

	// Blog is Finnish-only — all languages link to the same Finnish blog path
	const isBlog = basePath.startsWith('/blog');
	if (isBlog) {
		return [
			{ lang: 'fi', href: basePath },
			{ lang: 'sv', href: basePath },
			{ lang: 'en', href: basePath },
		];
	}

	return [
		{ lang: 'fi', href: basePath },
		{ lang: 'sv', href: `/sv${basePath === '/' ? '' : basePath}` || '/sv' },
		{ lang: 'en', href: `/en${basePath === '/' ? '' : basePath}` || '/en' },
	];
}
