import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import viteSvgIcons from 'vite-plugin-svg-icons'
export default ({ command }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  return {
    root,
    base: command === 'serve' ? '/' : '/vite-admin-ts/',
    plugins: [
      vue(),
      vueJsx(),
      //   svgLoader(),
      /* Components({
        resolvers: [ElementPlusResolver()]
      }), */
      ViteComponents({
        customComponentResolvers: [AntDesignVueResolver()]
      }),
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve',
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
      }),
      // svg配置
      viteSvgIcons({
        iconDirs: [resolve(root, 'src/assets/svg')],
        symbolId: 'svg-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src'),
        '#': resolve('types')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/var.scss";@import "./src/styles/mixin.scss";`
        }
      }
    },
    server: {
      port: 3001,
      open: false,
      proxy: {
        '/api': {
          target: 'http://192.168.200.239/official/api',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp('^/api'), '')
        }
      }
    },
    build: {
      sourcemap: 'hidden',
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex']
            // 'element-plus': ['element-plus']
          }
        }
      },
      chunkSizeWarningLimit: 500
    }
  }
}
