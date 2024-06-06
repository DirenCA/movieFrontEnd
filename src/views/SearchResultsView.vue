<script>
import axios from '@/axios.js'
export default {
  name: 'search-results',
  data () {
    return {
      movies: [],
      query: this.$route.params.query
    }
  },
  methods: {
    async searchMovies () {
      try {
        const response = await axios.get('/films', { params: { search: this.query } })
        this.movies = response.data
      } catch (error) {
        console.error(error)
      }
    }
  },
  created () {
    this.searchMovies()
  }
}
</script>

<template>
  <div>
    <h1>Suchergebnisse für: {{ query }}</h1>
    <div class="row justify-content-center">
      <div class="col-md-3 d-flex align-items-stretch" v-for="movie in movies" :key="movie.id">
        <div class="card" style="width: 14rem; margin: 1rem;">
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
            <a href="#" class="btn btn-primary">Add to Watchlist</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
