import { config, fields, collection } from '@keystatic/core';

export default config({
	storage: {
		kind: 'local',
	},
	collections: {
		blog: collection({
			label: 'ブログ記事',
			slugField: 'title',
			path: 'src/content/blog/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: { label: 'タイトル' },
					slug: {
						generate: () => {
							const d = new Date();
							const pad = (n: number) => String(n).padStart(2, '0');
							return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
						},
					},
				}),
				pubDate: fields.date({ label: '公開日', defaultValue: { kind: 'today' } }),
				tags: fields.array(
					fields.text({ label: 'タグ' }),
					{ label: 'タグ', itemLabel: (props) => props.value || '(未入力)' }
				),
				content: fields.markdoc({ label: '本文', extension: 'md' }),
			},
		}),
	},
});
