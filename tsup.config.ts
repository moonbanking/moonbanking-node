import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  // A single bundle per format keeps class identity stable, so `instanceof`
  // checks against the exported error types always work.
  splitting: false,
  treeshake: true,
  target: 'node20',
  outDir: 'dist',
});
