import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://moviebe-5i9h.onrender.com'
})

export default instance
