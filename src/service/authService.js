import axios from '@/lib/axios.js'

export async function login(req) {
  try {
    const {data} = await axios.post('/v1/auth/login', req)

    return data
  } catch (error) {
  }
}
