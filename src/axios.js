import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://moviebe-5i9h.onrender.com:8080'
})

export default instance
