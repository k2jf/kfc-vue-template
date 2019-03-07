<template>
  <h1 align="center">
    This is a vue template.
  </h1>
</template>
<script>
export default {
  name: 'Home',
  mounted () {
    console.log(this.$baseUrl)
    console.log(localStorage.getItem('k2_key'))
  }
}
</script>
