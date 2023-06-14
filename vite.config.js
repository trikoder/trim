import {promises as fs} from 'fs';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
const isProduction = process.env.NODE_ENV === 'production';
const currentVersion = JSON.parse(await fs.readFile(new URL('./package.json', import.meta.url), 'utf8')).version;

export default defineConfig({
    root: 'demo',
    plugins: [
        vue()
    ],
    build: {
        outDir: isProduction
            ? new URL('docs/demo', import.meta.url).pathname
            : new URL('dist', import.meta.url).pathname
    },
    base: isProduction ? '/trim/demo/' : '/',
    resolve: {
        alias: {
            trim: new URL('src/js', import.meta.url).pathname,
            apiServer: new URL(process.env.CLIENT_API_ENABLED
                ? 'server/client.js'
                : 'server/nodePlaceholder.js'
            , import.meta.url).pathname
        }
    },
    define: {
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
        'process.env.BASE_API_URL': JSON.stringify(process.env.BASE_API_URL),
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        'process.env.PACKAGE_VERSION': JSON.stringify(currentVersion),
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import 'demo/scss/variables';
                    @import 'src/scss/library/all';
                `
            }
        }
    }
});