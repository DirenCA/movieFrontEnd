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
  <div class="films container">
    <h1 class="text-center">Hier findest du alle Filme!</h1>
    <form @submit.prevent="searchMovies" class="text-center">
      <input v-model="search" class="form-control d-inline-block w-50" type="search" placeholder="Search" aria-label="Search">
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
      <h1>Trending:</h1>
      <div class="row justify-content-center">
        <div class="col-md-4 d-flex align-items-stretch" v-for="movie in popularMovies" :key="movie.id">
          <div class="card" style="width: 18rem; margin: 1rem;">
            <img class="card-img-top" :src="movie.imageUrl" alt="Movie poster">
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
