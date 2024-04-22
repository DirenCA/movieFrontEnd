<template>
  <div class="test">
    <h1>This is a page to test things</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ]
    }
  }
}
</script>

<style>
.test h1 {
  color: blue;
}

.test li {
  color: green;
}
</style>
