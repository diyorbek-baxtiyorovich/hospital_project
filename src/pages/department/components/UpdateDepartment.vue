<script setup>
import {ref} from 'vue'
import {updateDepartment} from "@/service/departmentService.js"

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
  emit('update:updateDialog', false) // Notify parent to close dialog
}


const toast = useToast()

const submitCredentials = ref()
const form = ref(null)

async function onUpdate() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const result = await updateDepartment(props.updatingItem.id, submitCredentials.value)

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
    submitCredentials.value = {...props.updatingItem}
  },
)
</script>

<template>
  <div class="text-center">
    <VDialog
      v-model="props.updateDialog"
      max-width="600"
    >
      <VCard class="pa-4">
        <VCardTitle>
          O'zgartirish
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          ref="form"
          @submit.prevent="onUpdate"
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



