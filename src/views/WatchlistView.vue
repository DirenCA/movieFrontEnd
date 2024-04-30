<script>
export default {
  name: 'Lists'
}
</script>

<template>
  <div class="lists">
    <h1>This is a page to list things</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
