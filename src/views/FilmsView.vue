<script>
import axios from 'axios'
export default {
  name: 'films',
  data () {
    return {
      search: '',
      movies: []
    }
  },
  methods: {
    async searchMovies () {
      try {
        const response = await axios.get('/films', { params: { search: this.search } })
        this.movies = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <div class="films">
    <h1>Hier findest du alle Filme!</h1>
    <form class="form-inline my-2 my-lg-0">  @submit.prevent="searchMovies">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</template>

<style scoped>

</style>
