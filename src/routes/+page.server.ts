import { supabase } from '$lib/supabaseClient';

export async function load() {
	const post = await supabase.from('User').select('*').limit(1).single();
	const { data } = await supabase.from('Skill').select('*');
	return {
		user: post,
		skills: data
	};
}
