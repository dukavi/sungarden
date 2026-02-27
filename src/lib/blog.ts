import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/translations';

/** Extract language from post id (e.g. "fi/slug" → "fi") */
export function getPostLang(post: CollectionEntry<'blog'>): Lang {
	return post.id.split('/')[0] as Lang;
}

/** Extract slug from post id (e.g. "fi/slug" → "slug") */
export function getPostSlug(post: CollectionEntry<'blog'>): string {
	return post.id.split('/').slice(1).join('/');
}

/** Get blog posts filtered by language, sorted newest first */
export async function getBlogPostsByLang(lang: Lang) {
	const posts = await getCollection('blog', (post) => post.id.startsWith(`${lang}/`));
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
