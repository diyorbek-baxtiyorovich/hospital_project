<script setup>
import {ref} from 'vue'
import {addRegion} from "@/service/regionService.js"

import {useToast} from 'vue-toastification'

const emit = defineEmits(['created'])

const toast = useToast()

const submitCredentials = ref({
  name: null,
  name_ru: null,
})


const createDialog = ref(false)

const form = ref(null)

async function createRegion() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const result = await addRegion(submitCredentials.value)

  if (result.status === 200) {
    toast.success('Muvofaqqiyatli yaratildi.')
    emit('created')
    form.value.reset()
    createDialog.value = false
  } else {
    toast.error('Xatolik yuz berdi!')
  }
}
</script>

<template>
  <div class="text-center">
    <VBtn
      class="ml-3"
      @click="createDialog=true"
    >
      qo'shish
    </VBtn>
    <VDialog
      v-model="createDialog"
      max-width="800"
    >
      <VCard class="pa-4">
        <VCardTitle>
          Viloyat yaratish
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          ref="form"
          @submit.prevent="createRegion"
        >
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.name"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'Viloyat nomi kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Viloyat nomi (uz)"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.name_ru"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'Viloyat nomi kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Название региона (ru)"
                required
              />
            </VCol>
          </VRow>

          <VCardActions class="d-flex w-full justify-end mt-4">
            <VBtn
              color="error"
              variant="elevated"
              @click="createDialog=false"
            >
              bekor qilish
            </VBtn>
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
    </VDialog>
  </div>
</template>



