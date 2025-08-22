<script setup>
import {ref} from "vue";
import {updatePassword} from "@/service/userService.js";
import {useToast} from "vue-toastification";

const user = computed(() => {
  const userData = localStorage.getItem('user_data')
  return userData ? JSON.parse(userData) : null
})

const userData = ref({
  username: null,
  current_password: null,
  new_password: null
})

const toast = useToast()

const form = ref(null)

async function onSubmit() {
  const {valid} = await form.value.validate()

  if (!valid) return
  const data = {
    username: userData.value.username.trim(),
    current_password: userData.value.current_password.trim(),
    new_password: userData.value.new_password.trim(),
    user_id: userData.value.id
  }
  const result = await updatePassword(data)

  if (result.status === 200) {
    toast.success('Muvofaqqiyatli yangilandi.')
    createDialog.value = false
  } else {
    toast.error('Kiritilgan parol to\'g\'ri kelmadi yoki hozirgi parol xato kiritildi!')
  }
}

onMounted(() => {
  const savedValue = localStorage.getItem('user_data')
  if (savedValue) userData.value = JSON.parse(savedValue).data
})
</script>

<template>
  <div class="container">
    <VCard
      class="mb-6 text-xl"
      title="Asosiy ma'lumotlar"
    >
      <VCardText>
        <div class="mb-2">
          <span class="font-weight-bold ">Xodim F.I.Sh: </span> {{ user?.data?.full_name }}
        </div>
        <div class="mb-2">
          <span class="font-weight-bold">Foydalanuvchi nomi: </span> {{ user?.data?.username }}
        </div>
        <div class="mb-2">
          <span class="font-weight-bold">Struktura: </span> {{ user?.data?.department?.name }}
        </div>
        <div class="mb-2">
          <span class="font-weight-bold">Joylashuv: </span> {{ user?.data?.region?.name_uz }} ,
          {{ user?.data?.local_code?.name_uz }}
        </div>
      </VCardText>
    </VCard>

    <VCard
      class="mb-6 text-xl"
      title="Sozlamalar"
    >
      <VForm
        ref="form"
        @submit.prevent="onSubmit">
        <VCardText>
          <VRow>
            <VCol cols="12" md="4">
              <VTextField
                v-model="userData.username"
                :rules="[ v => !!v || 'to\'ldirish majburiy!',
                          v => (v && v.length >= 3) || 'Kamida 3 belgidan iborat bo\'lishi zarur',
                ]"
                label="Username"
                required/>
            </VCol>
            <VCol cols="12" md="4">
              <VTextField
                v-model="userData.current_password"
                :rules="[ v => !!v || 'to\'ldirish majburiy!',
                          v => (v && v.length >= 3) || 'Kamida 3 belgidan iborat bo\'lishi zarur',
                ]"
                label="Hozirgi parol"
                required
              />
            </VCol>
            <VCol cols="12" md="4">
              <VTextField
                v-model="userData.new_password"
                :rules="[ v => !!v || 'to\'ldirish majburiy!',
                          v => (v && v.length >= 3) || 'Kamida 3 belgidan iborat bo\'lishi zarur',
                ]"
                label="Yangi parol"
                required
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="justify-end mx-4">
          <VBtn
            color="success"
            type="submit"
            variant="elevated"
          >
            saqlash
          </VBtn>
        </VCardActions>

      </VForm>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>

</style>
