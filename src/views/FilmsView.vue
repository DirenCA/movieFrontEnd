<script>
import axios from '@/axios.js'
export default {
  name: 'films',
  data () {
    return {
      search: '',
      movies: [],
      popularMovies: []
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
    },
    async getPopularMovies () {
      try {
        const response = await axios.get('/popular')
        console.log(response)
        this.popularMovies = response.data
      } catch (error) {
        console.error(error)
      }
    }
  },
  created () {
    this.getPopularMovies()
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
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          {{ movie }}
        </li>
      </ul>
    </div>
    <div>
      <h1>Popular Movies:</h1>
      <ul>
        <li v-for="movie in popularMovies" :key="movie.id">
          {{ movie.title }}
          <img :src="movie.imageUrl" alt="Movie poster">
        </li>
      </ul>
    </div>
  </div>
</template>
