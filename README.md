# uniapp 小程序脚手架
## vite, vue3, ts

| 类别 | 库 |
| --- | --- |
|包管理器|pnpm|
|网络请求|uni-ajax|
|路由拦截|uni-crazy-router|
|css样式|windicss, vite-plugin-windicss, @dcasia/mini-program-tailwind-webpack-plugin|
|代码校验|husky, lint-staged, eslint, prettier|
|状态管理|pinia, pinia-plugin-persist-uni|
|类型导入|types-sync, unplugin-auto-import|
|时间处理|dayjs|

# 使用
```
npx degit ijntvwh/uniapp_vue3_ts my-project

```
#更新 uniapp 版本

```
npx @dcloudio/uvm alpha

```

# 删除多余uni
```
pnpm remove @dcloudio/uni-automator @dcloudio/uni-mp-alipay @dcloudio/uni-mp-baidu @dcloudio/uni-mp-kuaishou @dcloudio/uni-mp-lark @dcloudio/uni-mp-qq @dcloudio/uni-mp-toutiao @dcloudio/uni-mp-jd @dcloudio/uni-quickapp-webview vue-i18n


```
