import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/ui/index.ts',
    'src/hooks/index.ts',
    'src/utils/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs'
    }
  },
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client";',
    }
  },
  onSuccess: async () => {
    // Copy CSS files to dist
    const fs = await import('node:fs')
    const path = await import('node:path')
    
    const srcStyles = 'src/styles'
    const distStyles = 'dist/styles'
    
    // Create dist/styles directory
    fs.mkdirSync(distStyles, { recursive: true })
    
    // Copy globals.css
    fs.copyFileSync(
      path.join(srcStyles, 'globals.css'),
      path.join(distStyles, 'globals.css')
    )
    
    console.log('✅ CSS files copied to dist/styles/')
  },
}) 