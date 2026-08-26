export function excerpt(body: string, length = 80): string {
	const plain = body
		.replace(/^---[\s\S]*?---/, '')
		.replace(/#+\s*/g, '')
		.replace(/[*_~`>]/g, '')
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/^-\s+/gm, '')
		.replace(/\s+/g, ' ')
		.trim();

	return plain.length > length ? `${plain.slice(0, length)}…` : plain;
}
