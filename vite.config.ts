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
      /* 搭配使用禁用console
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境移除console和debugger
          drop_console: true,
          drop_debugger: true
        }
      }, */
      // 是否关闭打包计算
      brotliSize: false,
      sourcemap: false,
      // 服务端使用
      manifest: false,
      // 自定义打包路径
      // assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex']
            // 'element-plus': ['element-plus']
          }
          /* 拆分打包 */
          /* chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]' */
        }
      },
      // 包大小提示阈值
      chunkSizeWarningLimit: 500
    }
  }
}
