import prisma from '$lib/prisma';

export async function load() {
	const post = await prisma.user.findFirst();
	return {
		user: post
	};
}
