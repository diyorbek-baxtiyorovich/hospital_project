<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import {useGenerateImageVariant} from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import {VNodeRenderer} from '@layouts/components/VNodeRenderer'
import {themeConfig} from '@themeConfig'
import {useToast} from 'vue-toastification'

const toast = useToast()


definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

import {ref} from 'vue'
import {useAuthStore} from '@/stores/authStore'
import {useRouter} from 'vue-router'
import AppTextField from "@core/components/app-form-elements/AppTextField.vue";

const router = useRouter()
const userStore = useAuthStore()

const loading = ref(false)
const password = ref('')
const checked = ref(false)
const username = ref('')

const userDetails = ref({
  username: username.value,
  password: password.value,
})

const login = async () => {

  try {
    loading.value = true
    if (userDetails.value.username === '' || userDetails.value.password === '') {
      return
    }

    const res = await userStore.login(userDetails.value)

    if (res?.token) {

      toast.success(`Xush kelibsiz  ${res.data?.full_name}`)
      localStorage.setItem('access_token', res.token)
      localStorage.setItem('user_data', JSON.stringify(res))
      await router.push('/')
      location.reload()
    } else toast.error("Login yoki parol noto'g'ri kiritildi!")

    loading.value = false
  } catch (e) {
    loading.value = false
  } finally {
    loading.value = false
  }
}

const isPasswordVisible = ref(false)
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
</script>

<template>

  <VRow
    class="auth-wrapper bg-surface"
    no-gutters
  >
    <VCol
      class="auth-card-v2 d-flex align-center justify-center"
      cols="12"
      md="12"
    >
      <VCard
        :max-width="500"
        class="mt-12 mt-sm-0 pa-6"
      >

        <VCardText class="text-center">
          <v-img :width="350" src="/logo_mkb.svg"/>
          <h4 class="text-h4 mb-1 mt-4">
            Xush kelibsiz!
          </h4>
          <p class="mb-0">
            Iltimos tizimga kirish uchun ma'lumotlaringizni kiriting.
          </p>
        </VCardText>
        <VCardText>
          <VForm @submit.prevent="login">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="userDetails.username"
                  autofocus
                  label="Foydalanuvchi nomi (username)"
                  placeholder="user"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="userDetails.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  autocomplete="password"
                  label="Parol"
                  placeholder="············"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <VBtn
                  :loading="loading"
                  block
                  class="mt-4"
                  type="submit"
                >
                  Kirish
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
