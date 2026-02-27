import rss from '@astrojs/rss';
import { getBlogPostsByLang, getPostSlug } from '../lib/blog';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getBlogPostsByLang('fi');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${getPostSlug(post)}/`,
		})),
	});
}
