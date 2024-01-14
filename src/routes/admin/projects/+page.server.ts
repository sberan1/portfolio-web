import { supabase } from '$lib/supabaseClient';

export async function load() {
	const projects = await supabase.from('Projects').select('*');
	const skills = await supabase.from('Skill').select('*');
	return {
		projects: projects.data,
		skills: skills.data
	};
}
