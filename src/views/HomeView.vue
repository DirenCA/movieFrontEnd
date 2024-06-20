<script>
import axios from '@/axios.js'

export default {
  name: 'HomeView',
  data () {
    return {
      topRatedMovies: [],
      upcomingMovies: [],
      popularMovies: []
    }
  },
  methods: {
    async getTopRatedMovies () {
      try {
        const response = await axios.get('/top-rated')
        console.log(response)
        this.topRatedMovies = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async getUpcomingMovies () {
      try {
        const response = await axios.get('/upcoming')
        console.log(response)
        this.upcomingMovies = response.data
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
    this.getTopRatedMovies()
    this.getUpcomingMovies()
    this.getPopularMovies()
  }
}
</script>

<template>
  <div>
    <div id="carouselExampleDark" class="carousel carousel-dark slide custom-carousel" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img src="@/assets/pexels-cottonbro-4009401.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-md-block">
            <h5>Welcome to MovieHub</h5>
            <p>Discover the latest movie reviews and ratings from film enthusiasts around the world.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="@/assets/pexels-tima-miroshnichenko-7991158.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-md-block">
            <h5>Join Our Community</h5>
            <p>Connect with other movie lovers, join discussions, and stay updated with the latest in the film industry.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/simon-ray-nLl5sJnElxY-unsplash.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-md-block">
            <h5>Rate Your Favorite Films</h5>
            <p>Share your thoughts and rate the movies you've watched to help others find their next favorite film.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <nav class="my-tabs">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">TopRated</button>
        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Upcoming</button>
        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Popular</button>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <v-container>
          <v-row>
            <v-col
              v-for="movie in topRatedMovies"
              :key="movie.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card class="mx-auto my-4" max-width="300">
                <v-img :src="movie.imageUrl" height="400px" class="white--text"></v-img>
                <v-card-title class="text-center">{{ movie.title }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
      <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  background-color: #f0f0f0;
  padding: 20px;
}

.custom-carousel {
  max-width: 1000px;
  height: 400px;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 10px;
  overflow: hidden;
}

.custom-carousel .carousel-control-prev,
.custom-carousel .carousel-control-next {
  color: white;
}

.custom-carousel .carousel-inner {
  border-radius: 10px;
}

.custom-carousel .carousel-item img {
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.custom-carousel .carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 20px;
  color: white;
  bottom: 350px;
}

.custom-carousel .carousel-caption h5 {
  font-size: 1.5rem;
  margin-top: 50px;
}

.custom-carousel .carousel-caption p {
  font-size: 1rem;
}

.my-tabs {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
