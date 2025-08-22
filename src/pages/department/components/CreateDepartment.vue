<script setup>
import {ref} from 'vue'
import {addDepartment} from "@/service/departmentService.js"

import {useToast} from 'vue-toastification'

const emit = defineEmits(['created'])

const toast = useToast()

const submitCredentials = ref({
  department_name: null,
})


const createDialog = ref(false)

const form = ref(null)

async function onCreate() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const result = await addDepartment(submitCredentials.value)

  if (result.status === 201) {
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
      max-width="600"
    >
      <VCard class="pa-4">
        <VCardTitle>
          Departament yaratish
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          ref="form"
          @submit.prevent="onCreate"
        >
          <VRow>
            <VCol
              cols="12"
              md="12"
            >
              <VTextField
                v-model="submitCredentials.department_name"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Departament nomi"
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



