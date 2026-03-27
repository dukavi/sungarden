export const prerender = false;

import type { APIRoute } from 'astro';
import { checkPassword, generateToken, addToken, SESSION_DURATION } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
	const form = await request.formData();
	const password = form.get('password') as string;

	if (!(await checkPassword(password))) {
		return new Response(null, {
			status: 303,
			headers: { Location: '/admin?error=1' },
		});
	}

	const token = generateToken();
	addToken(token);

	cookies.set('admin_token', token, {
		path: '/admin',
		httpOnly: true,
		secure: import.meta.env.PROD,
		sameSite: 'strict',
		maxAge: SESSION_DURATION,
	});

	return new Response(null, {
		status: 303,
		headers: { Location: '/admin' },
	});
};
