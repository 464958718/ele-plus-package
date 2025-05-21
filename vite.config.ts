import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'ele-plus-package',
      fileName: (format) => `ele-plus-package.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [
        typescript({
          tsconfig: "./tsconfig.json",
          declaration: true,
          declarationDir: "dist/types",
          rootDir: "./",
        }),
      ],
    },
  },
});
