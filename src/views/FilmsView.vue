<script>
import axios from '@/axios.js'
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
      console.log('searchMovies called with search term:', this.search) // Log, wenn Methode aufgerufen wird
      try {
        const response = await axios.get('/films', { params: { search: this.search } })
        console.log(response) // Log the response to see what's returned
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
    <form @submit.prevent="searchMovies">
      <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <div>
      <h1>Gesuchtes Wort: {{ search }}</h1>
      <b-card-group deck>
        <b-card v-for="movie in movies" :key="movie.id" :title="movie" class="mb-2">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <b-button variant="primary">Go somewhere</b-button>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>
