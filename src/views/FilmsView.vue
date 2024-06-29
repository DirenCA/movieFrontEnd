<script>
import axios from '@/axios.js'
import Rating from '@/components/Rating.vue'

export default {
  name: 'films',
  data () {
    return {
      discoverMovies: [],
      sortGenre: '', // Zustand für Genre-Filterung
      sortYear: '' // Zustand für Jahr-Filterung
      // Andere Daten bleiben gleich
    }
  },
  components: {
    Rating
  },
  methods: {
    async getDiscoverFilms () {
      try {
        const response = await axios.get('/discover', {
          params: {
            genre: this.sortGenre,
            year: this.sortYear
          }
        })
        this.discoverMovies = response.data
      } catch (error) {
        console.error('Error fetching discover movies:', error)
      }
    },
    sortMovies () {
      // Sortierlogik bleibt gleich
    }
    // Weitere Methoden bleiben gleich
  },
  mounted () {
    this.getDiscoverFilms()
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<template>
  <div class="films container">
    <div>
      <select v-model="sortGenre" @change="sortMovies">
        <option value="">Sortieren nach Genre</option>
        <option value="28">Action</option> <!-- Beispiel Genre ID: 28 für Action -->
        <option value="35">Comedy</option> <!-- Beispiel Genre ID: 35 für Comedy -->
        <!-- Weitere Genre-Optionen entsprechend der API -->
      </select>
      <select v-model="sortYear" @change="sortMovies">
        <option value="">Sortieren nach Jahr</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <!-- Weitere Jahr-Optionen entsprechend der API -->
      </select>
    </div>
    <div>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          {{ movie }}
        </li>
      </ul>
    </div>
    <div>
      <h1>Movies:</h1>
      <div class="row justify-content-center">
        <div class="col-md-4 d-flex align-items-stretch" v-for="movie in discoverMovies" :key="movie.id">
          <div class="card" style="width: 18rem; margin: 1rem;">
            <img class="card-img-top" :src="movie.imageUrl" alt="Movie poster">
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.overview }}</p>
              <p class="card-text">Release Date: {{ movie.releaseDate.split('-')[0] }}</p>
              <p class="card-text">Average Vote: {{ movie.voteAverage }}</p>
              <p class="card-text">Genre: {{ movie.genre }}</p>
              <div class="text-center">
                <Rating :filmId="movie.id" />
              </div>
              <div v-if="watchlistLoaded">
                <a v-if="isMovieInWatchlist(movie.id)" href="#" class="btn btn-danger" @click.prevent="removeFromWatchlist(movie)">Remove from Watchlist</a>
                <a v-else href="#" class="btn btn-primary" @click.prevent="addToWatchlist(movie)">Add to Watchlist</a>
              </div>
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
