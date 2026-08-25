// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: cloudflare(),
	integrations: [keystatic()],
});
