# Changelog

## 2019-3-7

### New features

* `baseUrl` 挂载到 Vue 原型上，在组件中直接使用 `this.$baseUrl` 即可拿到
* `K2_KEY` 暂时存到了 `localStorage` 中，在组件中使用 `localStorage.getItem('k2_key')` 即可拿到

>PS：通常 K2_KEY 会封装在接口请求中，因此第二条 feature 今后会改动