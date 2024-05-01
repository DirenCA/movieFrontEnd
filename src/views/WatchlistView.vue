<script>
export default {
  name: 'watchlist'
}
</script>

<template>
  <div class="watchlists">
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
