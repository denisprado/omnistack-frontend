import axios from 'axios'

const api = axios.create({
    baseURL: "https://omnistack-bac.herokuapp.com"
})

export default api;