<script setup>
import {ref} from 'vue'

import {useToast} from 'vue-toastification'
import {updateUser} from "@/service/userService.js"
import {getLocalCode, getLocalCodeByRegionId} from "@/service/localCodeService.js";

const props = defineProps({
  updatingItem: Object,
  regionList: Array,
  departmentList: Array,
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

  submitCredentials.value.local_code_id = submitCredentials.value.local_code.id
  submitCredentials.value.department_id = submitCredentials.value.department?.id

  const result = await updateUser(props.updatingItem.id, submitCredentials.value)

  if (result?.status === 200) {
    toast.success('Muvofaqqiyatli yangilandi.')
    emit('update:updateDialog', false)
    emit('updated')
    form.value.reset()
  } else
    toast.error('Xatolik yuz berdi')
}

const localCodeList = ref([])

async function getLocalCodeByRegion() {
  if (submitCredentials.value.local_code?.region_id) {
    localCodeList.value = await getLocalCodeByRegionId(submitCredentials.value.local_code?.region_id)
  }
}

async function regionChanged() {
  submitCredentials.value.local_code.id = null
  if (submitCredentials.value.local_code.region_id) {
    localCodeList.value = await getLocalCodeByRegionId(submitCredentials.value.local_code.region_id)
  } else {
    localCodeList.value = []
  }
}

watch(
  () => props.updateDialog,
  newValue => {
    submitCredentials.value = {...props.updatingItem}
    getLocalCodeByRegion()
  },
)
</script>

<template>
  <div class="text-center">
    <VDialog
      v-model="props.updateDialog"
      max-width="900"
    >
      <VCard class="pa-4">
        <VCardTitle>
          Xodim ma'lumotlarini o'zgartirish
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          ref="form"
          @submit.prevent="onUpdate"
        >
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.full_name"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Xodim F.I.SH"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.pinfl"
                v-mask="'##############'"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 14) || 'pinfl kamida 14 raqamdan iborat bo\'lishi zarur',
                ]"
                label="PINFL"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.username"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'kamida 3 raqamdan iborat bo\'lishi zarur',

                ]"
                label="Foydalanuvchi nomi (login/username)"
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.password"
                label="Parol"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.phone"
                v-mask="'(##) ###-##-##'"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 14) || 'telefon raqamni to\'g\'ri kiriting, (90) 123-45-67',
                ]"
                label="Telefon"
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VAutocomplete
                v-model="submitCredentials.local_code.region_id"
                :items="regionList"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                ]"
                clearable
                item-title="name_uz"
                item-value="id"
                label="Viloyat"
                required
                @update:model-value="regionChanged()"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VAutocomplete
                v-model="submitCredentials.local_code.id"
                :items="localCodeList"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                ]"
                clearable
                item-title="name"
                item-value="id"
                label="Lokal kod"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VAutocomplete
                v-model="submitCredentials.department"
                :items="departmentList"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                ]"
                clearable
                item-title="department_name"
                label="Departament"
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



