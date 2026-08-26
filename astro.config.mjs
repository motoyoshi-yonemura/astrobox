// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

// ローカル開発時 (npm run dev) は通常のNode.js環境で動かし、
// Keystaticのローカル編集（ファイル書き込み）が正しく動くようにする。
// 本番ビルド (npm run build) はCloudflare Workers向けのままにする。
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: isDev ? node({ mode: 'standalone' }) : cloudflare(),
	integrations: [keystatic(), react()],
});
