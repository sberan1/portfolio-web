import { supabase } from '$lib/supabaseClient';

export async function load() {
	const post = await supabase.from('User').select('*').limit(1).single();
	const skills = await supabase.from('Skill').select('*');
	const education = await supabase.from('Education').select('*');
	const links = await supabase.from('Link').select('*');
	const experience = await supabase.from('Experience').select('*');
	return {
		user: post,
		skills: skills.data,
		education: education.data,
		links: links.data,
		experience: experience.data
	};
}
