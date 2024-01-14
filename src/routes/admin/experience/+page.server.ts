import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from('Experience').select('*');
	return {
		experience: data
	};
}
