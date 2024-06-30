<script>
export default {
  name: 'Navbar',
  props: ['user'],
  data () {
    return {
      search: ''
    }
  },
  methods: {
    searchMovies () {
      this.$router.push({ name: 'search-results', params: { query: this.search } })
    },
    logOut () {
      this.$emit('logout')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">CineLog</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/films" class="nav-link" aria-current="page">Films</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/films" class="nav-link">Movies</router-link>
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <div v-if="user">
            <span class="navbar-text me-2">Hello, {{ user.userName }}</span>
            <button class="btn btn-outline-danger me-2" @click="logOut">Log Out</button>
          </div>
          <div v-else>
            <button class="btn btn-primary me-2" type="button" @click="$emit('show-signin-modal')">Sign-In</button>
            <button class="btn btn-primary me-2" type="button" @click="$emit('show-signup-modal')">Sign-Up</button>
          </div>
          <form @submit.prevent="searchMovies" class="d-flex" role="search">
            <input v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
