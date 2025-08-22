import axios from 'axios'
import {router} from "@/plugins/1.router/index.js"


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
// axios.defaults.baseURL = '/app'

axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = false
axios.defaults.timeout = 90000

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  response => {
    if (response?.status === 500) {
    }

    return response
  },
  error => {
    if (error.message.startsWith('Network')) {

      return
    }
    if (error.message.startsWith('timeout')) {

      return
    }
    if (error?.response?.status === 500) {

      return
    }
    if (error?.status === 404) {

      return
    }
    if (error.response.status === 401 || error.response.status === 403) {

      localStorage.removeItem('access_token')
      localStorage.removeItem('user_data')
      router.push('/login')
    }

    return Promise.reject(error)
  },
)

export default axios
