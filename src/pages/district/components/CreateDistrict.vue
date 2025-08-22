<script setup>
import {ref} from 'vue'
import {useToast} from 'vue-toastification'
import {addDistrict} from "@/service/districtService.js"

const props = defineProps({
  regionsList: Array,
})

const emit = defineEmits(['created'])


const toast = useToast()

const submitCredentials = ref({
  name_uz: null,
  name_ru: null,
  code: null,
  region_id: null,
})


const createDialog = ref(false)

const form = ref(null)

async function createDistrict() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const result = await addDistrict(submitCredentials.value)

  if (result?.status === 200) {
    toast.success('Muvofaqqiyatli yaratildi.')
    emit('created')
    form.value.reset()
    createDialog.value = false
  } else {
    toast.error('Xatolik yuz berdi!')
  }
}

const isNumberField = $event => {
  const char = String.fromCharCode($event.keyCode)
  if (/^\d*$/.test(char)) return true
  $event.preventDefault()
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
          Tuman yaratish
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          ref="form"
          @submit.prevent="createDistrict"
        >
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.name_uz"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'Viloyat nomi kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Tuman nomi (uz)"
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
                  v => (v && v.length >= 3) || 'Tuman nomi kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Название района (ru)"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.code"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'Tuman kodi kamida 3 raqamdan iborat bo\'lishi zarur',

                ]"
                label="Tuman kodi"
                required
                @keypress="isNumberField($event)"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VAutocomplete
                v-model="submitCredentials.region_id"
                :items="regionsList"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                ]"
                clearable
                item-title="name"
                item-value="id"
                label="Tuman kodi"
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



