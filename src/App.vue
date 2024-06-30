<template>
  <div id="app">
    <Navbar :user="user" @logout="logOut" @show-signin-modal="showSignInModal" @show-signup-modal="showSignUpModal" />
    <router-view />

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

<script>
import Navbar from '@/components/Navbar.vue'
import axios from '@/axios.js'
import { Modal } from 'bootstrap'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      user: null,
      username: '',
      password: '',
      confirmPassword: '',
      loginUsername: '',
      loginPassword: '',
      error: '',
      signUpError: '',
      signInModal: null,
      signUpModal: null
    }
  },
  mounted () {
    this.signInModal = new Modal(document.getElementById('signInModal'))
    this.signUpModal = new Modal(document.getElementById('signUpModal'))
  },
  methods: {
    async signIn () {
      try {
        const response = await axios.post('/user/login', {
          userName: this.loginUsername,
          password: this.loginPassword
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.data) {
          this.user = response.data
          // Speichern Sie den Token und den Benutzernamen im localStorage
          localStorage.setItem('userToken', response.data.token)
          localStorage.setItem('userName', response.data.userName)
          this.signInModal.hide()
          this.$router.push({ name: 'home' })
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
        const response = await axios.post('https://moviebe-5i9h.onrender.com/user', {
          userName: this.username,
          password: this.password
        })

        if (response.data) {
          alert('Registrierung erfolgreich! Sie können sich jetzt einloggen.')
          this.signUpModal.hide() // Modal schließen
          this.$router.push({ name: 'about' })
        } else {
          this.signUpError = 'Registrierung fehlgeschlagen'
        }
      } catch (error) {
        console.error(error)
        this.signUpError = 'Ein Fehler ist aufgetreten'
      }
    },
    logOut () {
      this.user = null
      localStorage.removeItem('userToken')
      this.$router.push({ name: 'home' })
    },
    showSignInModal () {
      this.signInModal.show()
    },
    showSignUpModal () {
      this.signUpModal.show()
    }
  },
  created () {
    // Lesen Sie den Token und den Benutzernamen aus dem localStorage, wenn die Anwendung gestartet wird
    const token = localStorage.getItem('userToken')
    const userName = localStorage.getItem('userName')
    if (token) {
      this.user = { token: token, userName: userName }
    }
  }
}
</script>

<style>
/* Dein CSS */
</style>
