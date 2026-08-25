import type { APIRoute } from 'astro';

export const prerender = false;

const GAS_URL =
	'https://script.google.com/macros/s/AKfycbw1RfSowg5J7L2IHON4DPj7rCwym1VDM7_sIZK5qumwBA9sg-D92nXhWl3Ih4Q31bi3/exec';

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();

	// ハニーポット: 人間には見えない欄が埋まっていたらbotとみなし、何もせず完了扱いにする
	if (formData.get('bot-field')) {
		return redirect('/thanks');
	}

	const name = formData.get('name');
	const email = formData.get('email');
	const message = formData.get('message');

	if (!name || !email || !message) {
		return new Response('必須項目が入力されていません', { status: 400 });
	}

	await fetch(GAS_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id: crypto.randomUUID(),
			data: { name, email, message },
		}),
	});

	return redirect('/thanks');
};
