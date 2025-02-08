import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ['react'],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.svg': 'dataurl', // 处理 SVG 文件
    }
  },
})
