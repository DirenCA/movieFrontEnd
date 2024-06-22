<script>
import { ref } from 'vue'
import axios from '@/axios.js'

export default {
  props: {
    filmId: Number
  },
  setup (props) {
    const rating = ref(0)

    const rateFilm = async () => {
      console.log('rateFilm method called', rating.value) // Neue Ausgabe
      try {
        const userToken = localStorage.getItem('userToken')
        const response = await axios.post('http://localhost:8080/user/rateFilm', null, {
          params: {
            token: userToken,
            filmId: props.filmId,
            ratingValue: rating.value
          }
        })
        console.log('Response from backend:', response)
        alert('Film erfolgreich bewertet!')
      } catch (error) {
        console.error('Error rating movie:', error)
      }
    }

    return {
      rating,
      rateFilm
    }
  }
}
</script>

<template>
  <div>
    <div>
      <v-rating
        v-model="rating"
        hover
        @update:model-value="rateFilm"
      ></v-rating>
    </div>
  </div>
</template>

<style scoped>
.v-rating .v-icon {
  color: black !important;
}
</style>
