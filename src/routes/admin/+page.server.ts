import { supabase } from '$lib/supabaseClient';

export async function load() {
	const post = await supabase.from('User').select('*').limit(1).single();
	return {
		user: post
	};
}
