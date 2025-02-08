const fs = require('node:fs')
const process = require('node:process')
const esbuild = require('esbuild')

async function build() {
  const result = await esbuild.build({
    entryPoints: ['packages/react-drager/src/index.ts'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'packages/react-drager/dist/index.mjs',
    external: ['react', 'react-dom'],
    metafile: true,
    sourcemap: true,
    treeShaking: true,
    target: ['es2019'],
    legalComments: 'none',
    mangleProps: /^_/,
    loader: {
      '.svg': 'dataurl',
    },
  })

  if (process.env.ANALYZE) {
    fs.writeFileSync('meta.json', JSON.stringify(result.metafile))
    console.log(await esbuild.analyzeMetafile(result.metafile))
  }

  await esbuild.build({
    entryPoints: ['packages/react-drager/src/index.ts'],
    bundle: true,
    minify: true,
    format: 'cjs',
    outfile: 'packages/react-drager/dist/index.cjs',
    external: ['react', 'react-dom'],
    target: ['es2019'],
    sourcemap: true,
    loader: {
      '.svg': 'dataurl',
    },
  })
}

build().catch((err) => {
  console.error('Build failed:', err)
  process.exit(1)
})
