import { supabase } from '$lib/supabaseClient';

export async function load() {
	let rawSkills = await supabase.from('Skill').select('*');
	return {
		skills: rawSkills
	};
}
