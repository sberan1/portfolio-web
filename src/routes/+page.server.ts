import { supabase } from '$lib/server/supabaseClient';
import type { Action } from '@sveltejs/kit';

export async function load() {
	const post = await supabase.from('users').select('*');
	return {
		user: post
	};
}

export const actions: Action = {
	logout: async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw new Error('Error logging out');
		}
	}
};
