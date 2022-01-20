import { UserConfigExport, ConfigEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import ViteComponents, { AntDesignVueResolver,AntDesignVueResolverOptions } from 'vite-plugin-components'

// 按需导入组件样式(组件仍需手动导入)
import vitePluginImp from 'vite-plugin-imp'
// svg自定义配置
import viteSvgIcons from 'vite-plugin-svg-icons'
// setup组件名扩展
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// mockjs配置
import { viteMockServe } from 'vite-plugin-mock'

// 自动导入vue API
import AutoImport from 'unplugin-auto-import/vite'

export default ({ command }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  return {
    root,
    base: command === 'serve' ? '/' : '/vite-admin-ts/',
    plugins: [
      vue(),
      vueJsx(),

      // ui组件库注册
      /* Components({
        // ui库解析器
        resolvers: [AntDesignVueResolver()],
        directoryAsNamespace: true,
        // 生成components.d.ts地址
        dts: false,
        extensions: ['vue'],
        // include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
      }), */
      /* ViteComponents({
        customComponentResolvers: [AntDesignVueResolver()]
      }), */
      //   vitePluginImp(),

      // mock.js配置
      viteMockServe({
        supportTs: true,
        mockPath: './src/mocks',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve',
        injectCode: `
          import { setupMockConfig } from './src/mockConfig';
          setupMockConfig();
        `
      }),
      // svg配置
      viteSvgIcons({
        iconDirs: [resolve(root, 'src/assets/svg')],
        symbolId: 'svg-[dir]-[name]'
      }),
      // setup组件名扩展 (使用时直接在script上定义name)
      VueSetupExtend(),

      // 自动导入包API
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts'
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
