import axios from 'axios'

// create an API instance
export default axios.create({
  baseURL: 'http://localhost:3333'
})