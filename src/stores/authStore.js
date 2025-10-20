import { login } from '@/service/authService'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
  }),

  actions: {
    async login(req) {
      try {
        return await login(req)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
