import type { Action } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { dev } from '$app/environment';

export const actions: Action = {
	login: async ({ request, locals, cookies }: { request: any; locals: any; cookies: any }) => {
		const body = Object.fromEntries(await request.formData());

		const { data, error } = await supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		console.log(data, error, locals);

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials'
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.'
			});
		}
		cookies.set('access_token', data?.session.access_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: data.session?.expires_in
		});
		cookies.set('refresh_token', data?.session.refresh_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: 60 * 60 * 24 * 30
		});
		throw redirect(303, '/');
	}
};
