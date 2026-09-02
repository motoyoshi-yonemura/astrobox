import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

const RESEND_FROM = 'Astrobox <noreply@blauerwind.com>';
const OWNER_EMAIL = 'yomomobile@gmail.com';

async function sendMail(to: string, subject: string, text: string) {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ from: RESEND_FROM, to, subject, text }),
	});
	if (!res.ok) {
		console.error('Resend送信失敗', to, await res.text());
	}
}

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

	const id = crypto.randomUUID();
	await env.DB.prepare(
		'INSERT INTO contacts (id, name, email, message) VALUES (?, ?, ?, ?)',
	)
		.bind(id, name, email, message)
		.run();

	await Promise.all([
		sendMail(
			String(email),
			'お問い合わせありがとうございます',
			`${name} 様\n\nお問い合わせいただきありがとうございます。以下の内容で受け付けました。\n\n---\n${message}\n---\n\n内容を確認の上、担当者よりご連絡いたします。`,
		),
		sendMail(
			OWNER_EMAIL,
			'【astrobox】お問い合わせが届きました',
			`お名前: ${name}\nメール: ${email}\n\n${message}`,
		),
	]);

	return redirect('/thanks');
};
