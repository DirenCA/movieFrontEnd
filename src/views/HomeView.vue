<script>
import axios from '@/axios.js'
import { Modal } from 'bootstrap'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      loginUsername: '',
      loginPassword: '',
      error: '',
      signUpError: ''
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user'])
  },
  methods: {
    ...mapActions(['login', 'logout']),
    async signIn () {
      try {
        const response = await axios.post('/user/login', {
          userName: this.loginUsername,
          password: this.loginPassword
        })
        if (response.data) {
          this.login(response.data)
          this.$router.push({ name: 'about' })
        } else {
          this.error = 'Ungültiger Benutzername oder Passwort'
        }
      } catch (error) {
        console.error(error)
        if (error.response && error.response.status === 404) {
          this.error = error.response.data
        } else {
          this.error = 'Ein Fehler ist aufgetreten'
        }
      }
    },
    async signUp () {
      if (this.password !== this.confirmPassword) {
        this.signUpError = 'Passwörter stimmen nicht überein'
        return
      }
      try {
        const response = await axios.post('/user', {
          userName: this.username,
          password: this.password
        })

        if (response.data) {
          alert('Registrierung erfolgreich! Sie können sich jetzt einloggen.')
          this.login(response.data)
          this.$router.push({ name: 'about' })
        } else {
          this.signUpError = 'Registrierung fehlgeschlagen'
        }
      } catch (error) {
        console.error(error)
        this.signUpError = 'Ein Fehler ist aufgetreten'
      }
    },
    showSignInModal () {
      const signInModal = new Modal(document.getElementById('signInModal'))
      signInModal.show()
    },
    showSignUpModal () {
      const signUpModal = new Modal(document.getElementById('signUpModal'))
      signUpModal.show()
    }
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
    <div class="d-grid gap-2 col-6 mx-auto" v-if="!isLoggedIn">
      <button class="btn btn-primary" type="button" @click="showSignInModal">Sign-In</button>
      <button class="btn btn-primary" type="button" @click="showSignUpModal">Sign-Up</button>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto" v-else>
      <span class="navbar-text me-2">Hello, {{ user.userName }}</span>
      <button class="btn btn-outline-danger me-2" @click="logOut">Log Out</button>
    </div>

    <!-- Sign-In Modal -->
    <div class="modal fade" id="signInModal" tabindex="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signInModalLabel">Sign-In</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="signIn">
              <div class="mb-3">
                <label for="loginUsername" class="form-label">Username</label>
                <input type="text" class="form-control" id="loginUsername" v-model="loginUsername">
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="loginPassword" v-model="loginPassword">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sign-Up Modal -->
    <div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signUpModalLabel">Sign-Up</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="signUp">
              <div class="mb-3">
                <label for="signUpUsername" class="form-label">Username</label>
                <input type="text" class="form-control" id="signUpUsername" v-model="username">
              </div>
              <div class="mb-3">
                <label for="signUpPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="signUpPassword" v-model="password">
              </div>
              <div class="mb-3">
                <label for="signUpConfirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="signUpConfirmPassword" v-model="confirmPassword">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div v-if="signUpError" class="alert alert-danger mt-3">{{ signUpError }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  background-color: #f0f0f0;
  padding: 20px;
}
.d-grid {
  max-width: 400px;
  margin-top: 40px;
}

.d-grid button {
  background-color: darkslateblue;
  border-color: darkslateblue;
  color: #f0f0f0;
}

.d-grid button:hover {
  background-color: lightblue;
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
</style>
