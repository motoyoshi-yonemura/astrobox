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
				title: fields.slug({ name: { label: 'タイトル' } }),
				description: fields.text({ label: '説明文', multiline: true }),
				pubDate: fields.date({ label: '公開日' }),
				tags: fields.array(
					fields.text({ label: 'タグ' }),
					{ label: 'タグ', itemLabel: (props) => props.value || '(未入力)' }
				),
				content: fields.markdoc({ label: '本文' }),
			},
		}),
	},
});
