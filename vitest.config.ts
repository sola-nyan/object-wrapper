import path from 'path'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        alias: {
            '~': path.resolve(__dirname, './src'),
        },
    },
}))