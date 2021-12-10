import type { createApp } from 'vue'

// 组件首字母大写
const changeStr = (v: string) => {
  return v.charAt(0).toUpperCase() + v.slice(1)
}

// globalComponents文件夹下 自动注册.vue/.tsx组件
export default function autoRegisterComponents(app: ReturnType<typeof createApp>) {
  const vueFile = import.meta.globEager('./globalComponents/*.vue');
  const tsxFile = import.meta.globEager('./globalComponents/*.tsx');
  const mergeObj = { ...vueFile, ...tsxFile }
  for (const key in mergeObj) {
    if (Object.prototype.hasOwnProperty.call(mergeObj, key)) {
      const value = mergeObj[key];
      const name = changeStr(key.replace(/^\.\/globalComponents\//, '').replace(/\.\w+$/, ''))
      app.component(name, value.default || value)
    }
  }
}
