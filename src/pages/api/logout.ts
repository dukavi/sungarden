export const prerender = false;

import type { APIRoute } from 'astro';
import { removeToken } from '../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
	const token = cookies.get('admin_token')?.value;
	if (token) {
		removeToken(token);
	}

	cookies.delete('admin_token', { path: '/admin' });

	return new Response(null, {
		status: 303,
		headers: { Location: '/admin' },
	});
};
