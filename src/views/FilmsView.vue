<script>
import axios from '@/axios.js'
export default {
  name: 'films',
  data () {
    return {
      movies: [],
      popularMovies: [],
      userToken: localStorage.getItem('userToken') || ''
    }
  },
  methods: {
    async getPopularMovies () {
      try {
        const response = await axios.get('/popular')
        console.log(response)
        this.popularMovies = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async addToWatchlist (movie) {
      console.log('Adding movie to watchlist:', movie)
      try {
        const response = await axios.post('/watchlist/add', movie, {
          headers: {
            Authorization: this.userToken
          }
        })
        console.log('Response from backend:', response)
        alert('Film zur Watchlist hinzugefügt!')
      } catch (error) {
        console.error('Error adding movie to watchlist:', error)
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
              <p class="card-text">{{ movie.overview }}</p>
              <div class="text-center">
                <v-rating
                  v-model="rating"
                  hover
                ></v-rating>
              </div>
              <a href="#" class="btn btn-primary" @click.prevent="addToWatchlist(movie)">Add to Watchlist</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>

<style scoped>
.v-rating .v-icon {
  color: black !important;
}
</style>
