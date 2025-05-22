import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import typescript from '@rollup/plugin-typescript';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // 开发环境配置
    return {
      plugins: [vue()],
      root: 'examples',
    };
  } else {
    // 生产环境配置
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'ele-plus-package',
          fileName: (format) => `ele-plus-package.${format}.js`,
          formats: ['es', 'umd'],
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
    };
  }
});
