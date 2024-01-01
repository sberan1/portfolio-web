import prisma from '$lib/prisma.ts';

export async function load() {
	const post = await prisma.user.findFirst();
	return {
		user: post
	};
}
