<script setup>
import {ref} from 'vue'

import {useToast} from 'vue-toastification'
import {getDistrictById, updateDistrict} from "@/service/districtService.js"

const props = defineProps({
  regionsList: Array,
  updatingItem: Object,
  updateDialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['updated', 'update:updateDialog'])

function closeDialog() {
  emit('update:updateDialog', false) // Notify parent to close dialog
}


const toast = useToast()

const submitCredentials = ref(null)
const form = ref(null)


async function getDistrictDataById() {
  const result = await getDistrictById(props.updatingItem.id)
  if (result) {
    submitCredentials.value = result
    submitCredentials.value.region.name = submitCredentials.value?.region?.name_uz
  }
}

async function onUpdate() {

  const {valid} = await form.value.validate()


  if (!valid) return


  submitCredentials.value.region_id = submitCredentials.value.region.id

  const result = await updateDistrict(props.updatingItem.id, submitCredentials.value)

  if (result?.status === 200) {
    toast.success('Muvofaqqiyatli yaratildi.')
    emit('update:updateDialog', false)
    emit('updated')
    form.value.reset()
  } else
    toast.error('Xatolik yuz berdi')
}

const isNumberField = $event => {
  const char = String.fromCharCode($event.keyCode)
  if (/^\d*$/.test(char)) return true
  $event.preventDefault()
}


watch(
  () => props.updateDialog,
  newValue => {
    getDistrictDataById()
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
          Viloyat yaratish
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
                v-model="submitCredentials.region"
                :items="regionsList"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                ]"
                clearable
                item-title="name"
                label="Tuman kodi"
                required
                return-object
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



