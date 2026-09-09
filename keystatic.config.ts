import { config, fields, collection } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const resizableImage = block({
	label: '画像（サイズ指定）',
	schema: {
		src: fields.image({
			label: '画像',
			directory: 'src/content/blog/images',
			publicPath: './images/',
		}),
		alt: fields.text({ label: '代替テキスト' }),
		width: fields.integer({ label: '幅(px)', defaultValue: 800 }),
	},
});

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
				content: fields.markdoc({
					label: '本文',
					extension: 'mdoc',
					options: {
						image: {
							directory: 'src/content/blog/images',
							publicPath: './images/',
						},
					},
					components: {
						resizableImage,
					},
				}),
			},
		}),
	},
});
