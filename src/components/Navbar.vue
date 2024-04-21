<script>
export default {
  name: 'Navbar'
}
</script>

<template>
  <h1>Das ist eine Navbar</h1>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/test">Test</router-link> |
  </nav>
</template>

<style scoped>

</style>
