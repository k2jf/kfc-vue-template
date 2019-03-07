# Changelog

## 2019-3-7

### New features

* `baseUrl` 挂载到 Vue 原型上，在组件中直接使用 `this.$baseUrl` 即可拿到
* `K2_KEY` 暂时存到了 `localStorage` 中，在组件中使用 `localStorage.getItem('k2_key')` 即可拿到

>PS：通常以上两个参数都会封装在接口请求中，因此以上只是暂时方案
