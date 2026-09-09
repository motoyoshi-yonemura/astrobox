import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
	tags: {
		resizableImage: {
			render: component('./src/components/ResizableImage.astro'),
			attributes: {
				src: { type: String, required: true },
				alt: { type: String, required: true },
				width: { type: Number },
			},
		},
	},
});
