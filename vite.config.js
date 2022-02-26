import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		open: false
	},
  slidev: {
    vue: {
    },
    markdown: {
      markdownItSetup(md) {
      }
    }
  },
  esbuild: {
    exclude: ["public/code/*"]
  }
})
