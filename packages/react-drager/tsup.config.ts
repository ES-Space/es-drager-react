import fs from 'node:fs'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false,
  treeshake: true,
  minify: true,
  external: ['react'],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.svg': 'dataurl', // handle svg
    }
  },
  onSuccess: async () => {
    const files = ['dist/index.cjs.map', 'dist/index.js.map']
    files.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file)
      }
    })
  },
})
