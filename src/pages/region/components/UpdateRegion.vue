<script setup>
import {ref} from 'vue'
import {updateRegion, getRegionById} from "@/service/regionService.js"

import {useToast} from 'vue-toastification'

const props = defineProps({
  updatingItem: Object,
  updateDialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['updated', 'update:updateDialog'])

function closeDialog() {
  emit('update:updateDialog', false)
}


const toast = useToast()

const submitCredentials = ref(null)
const form = ref(null)

async function getRegionDataById() {
  const result = await getRegionById(props.updatingItem.id)
  if (result) {
    submitCredentials.value = result
  }
}

async function onUpdate() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const result = await updateRegion(props.updatingItem.id, submitCredentials.value)

  if (result?.status === 200) {
    toast.success('Muvofaqqiyatli yaratildi.')
    emit('update:updateDialog', false)
    emit('updated')
    form.value.reset()
  } else
    toast.error('Xatolik yuz berdi')
}


watch(
  () => props.updateDialog,
  newValue => {
    getRegionDataById()
  },
)
</script>

<template>
  <div class="text-center">
    <VDialog
      v-model="props.updateDialog"
      max-width="800"
    >
      <VCard class="pa-4">
        <VCardTitle>
          Viloyat ma'lumotlarini tahrirlash
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          v-if="submitCredentials"
          ref="form"
          @submit.prevent="onUpdate"
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
              @click="closeDialog"
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



