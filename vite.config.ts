import { UserConfigExport, ConfigEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
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

// 开启gzip
import viteCompression from 'vite-plugin-compression'

// 各文件关系图谱检查
import Inspect from 'vite-plugin-inspect'

export default ({ command }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  return {
    root,
    // 开发环境:serve  生产环境:build
    base: command === 'serve' ? '/' : '/vite-admin-ts',
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
        mockPath: '/src/mocks',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve',
        injectCode: `
          import { setupMockConfig } from '@/mockConfig';
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
      }),

      // gzip 生成环境生成.gz文件
      viteCompression({
        // 是否在控制台输出压缩结果
        verbose: true,
        disable: false,
        // 压缩阈值(单位:b)
        threshold: 10240,
        // 压缩方式
        algorithm: 'gzip',
        // 压缩包后缀名
        ext: '.gz'
      }),

      // 各文件关系图谱(访问:http://localhost:3001/__inspect/)
      Inspect()
    ],
    resolve: {
      // 设置文件夹别名
      alias: {
        '@': resolve('src'),
        '#': resolve('types')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 注入额外的自定义scss文件
          additionalData: `@import "./src/styles/var.scss";@import "./src/styles/mixin.scss";`
        }
      }
    },
    server: {
      // host: '',
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
      // 设置打包路径,默认dist
      // outDir: '',
      // 设置静态资源路径,默认assets
      // assetsDir: '',
      // 搭配使用禁用console
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境移除console和debugger
          drop_console: true,
          drop_debugger: true
        }
      },
      // 是否关闭打包计算
      brotliSize: false,
      sourcemap: false,
      // 服务端使用
      manifest: true,
      // 自定义打包路径
      // assetsDir: 'static/img/',
      rollupOptions: {
        // 指定打包入口文件(单页面配置)
        input: './index.html',
        /*
        // 多页面配置
        input: {
          page1: resolve('xxx1/index.html'),
          page2: resolve('xxx2/index.html')
        },
         */

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
