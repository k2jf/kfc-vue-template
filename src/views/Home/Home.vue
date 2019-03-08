<template>
  <h1 align="center">
    This is a vue template.
  </h1>
</template>
<script>
export default {
  name: 'Home',
  mounted () {
    console.log(this.$axios)
    console.log(sessionStorage.getItem('$kmx-auth-token'))
  }
}
</script>
