/// <reference types="astro/client" />

// RESEND_API_KEY is a Cloudflare secret (set via `wrangler secret put`),
// not declared in wrangler.jsonc, so `wrangler types` doesn't know about it.
declare global {
	interface Env {
		RESEND_API_KEY: string;
	}
}
