<script>
import axios from '@/axios.js'
import Rating from '@/components/Rating.vue'

export default {
  name: 'films',
  data () {
    return {
      movies: [],
      discoverMovies: [],
      currentPage: 1,
      isLoading: false,
      moviesInWatchlist: [],
      userToken: localStorage.getItem('userToken') || '',
      watchlistLoaded: false,
      search: '',
      ortGenre: '',
      sortYear: ''
    }
  },
  components: {
    Rating
  },
  methods: {
    async getDiscoverFilms () {
      try {
        const response = await axios.get('/discover')
        console.log(response)
        this.discoverMovies = response.data
        await this.initializeWatchlistStates() // Warten, bis die Watchlist initialisiert ist
      } catch (error) {
        console.error(error)
      }
    },
    sortMovies () {
      if (this.sortGenre) {
        this.discoverMovies.sort((a, b) => a.genre.localeCompare(b.genre))
      }
      if (this.sortYear) {
        this.discoverMovies.sort((a, b) => a.year - b.year)
      }
    },
    async loadMoreMovies () {
      if (this.isLoading) return

      this.isLoading = true

      try {
        const response = await axios.get('/discover', {
          params: {
            page: this.currentPage // Die aktuelle Seite als Parameter an die Backend-API übergeben
          }
        })

        if (response.data.length > 0) {
          this.discoverMovies.push(...response.data)
          this.currentPage++ // Erhöhe die Seitenzahl nur, wenn neue Filme geladen wurden
        } else {
          console.log('No more movies to load')
        }
      } catch (error) {
        console.error('Error loading more movies:', error)
      } finally {
        this.isLoading = false
      }
    },
    onScroll () {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        this.loadMoreMovies()
      }
    },
    async initializeWatchlistStates () {
      try {
        const response = await axios.get('/user/watchlist', {
          headers: {
            Authorization: this.userToken
          }
        })
        console.log('Watchlist loaded:', response.data)
        this.moviesInWatchlist = response.data
        this.watchlistLoaded = true
      } catch (error) {
        console.error('Error loading watchlist:', error)
      }
    },
    isMovieInWatchlist (movieId) {
      return this.moviesInWatchlist.includes(movieId)
    },
    async addToWatchlist (movie) {
      console.log('Adding movie to watchlist:', movie)
      try {
        const response = await axios.post('/user/watchlist', movie, {
          headers: {
            Authorization: this.userToken
          }
        })
        console.log('Response from backend:', response)
        alert('Film zur Watchlist hinzugefügt!')
        this.moviesInWatchlist.push(movie.id) // Hier wird die ID des Films zur Liste hinzugefügt
        this.moviesInWatchlist.sort() // Sortieren der IDs für Konsistenz
      } catch (error) {
        console.error('Error adding movie to watchlist:', error)
      }
    },
    async removeFromWatchlist (movie) {
      console.log('Removing movie from watchlist:', movie)
      try {
        const response = await axios.delete('/user/watchlist', {
          data: movie,
          headers: {
            Authorization: this.userToken
          }
        })
        console.log('Response from backend:', response)
        alert('Film aus der Watchlist entfernt!')
        this.moviesInWatchlist = this.moviesInWatchlist.filter(id => id !== movie.id)
        this.moviesInWatchlist = this.moviesInWatchlist.filter(id => id !== movie.id)
      } catch (error) {
        console.error('Error removing movie from watchlist:', error)
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    this.loadMoreMovies() // Lade die erste Seite der Filme beim Initialisieren
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  },
  created () {
    this.getDiscoverFilms()
    window.addEventListener('scroll', this.onScroll)
  }
}
</script>

<template>
  <div class="films container">
    <div>
      <!-- ... -->
      <select v-model="sortGenre" @change="sortMovies">
        <option value="">Sortieren nach Genre</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <!-- weitere features -->
      </select>
      <select v-model="sortYear" @change="sortMovies">
        <option value="">Sortieren nach Jahr</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <!-- weitere features -->
      </select>
      <!-- ... -->
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
