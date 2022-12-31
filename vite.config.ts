import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: "./dist",
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: "vite-typescript-plugin",
            fileName: 'index',
            formats: ['es', 'cjs']
        },
        sourcemap: false,
        emptyOutDir: false,
    }
})