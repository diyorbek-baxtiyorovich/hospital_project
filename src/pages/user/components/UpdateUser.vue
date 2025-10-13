<script setup>
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { updateUser } from '@/service/userService.js'
import { getLocalCodeByRegionId } from '@/service/localCodeService.js'

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
  emit('update:updateDialog', false)
}

const toast = useToast()
const form = ref(null)

const submitCredentials = ref({
  full_name: '',
  pinfl: '',
  username: '',
  password: '',
  phone: '',
  local_code_ids: [],
  region_id: null,
  department: null,
})

const localCodeList = ref([])

async function regionChanged() {
  submitCredentials.value.local_code_ids = []
  if (submitCredentials.value.region_id) {
    localCodeList.value = await getLocalCodeByRegionId(submitCredentials.value.region_id)
  } else {
    localCodeList.value = []
  }
}

async function onUpdate() {
  const { valid } = await form.value.validate()
  if (!valid) return

  const payload = {
    full_name: submitCredentials.value.full_name,
    pinfl: submitCredentials.value.pinfl,
    username: submitCredentials.value.username,
    password: submitCredentials.value.password,
    phone: submitCredentials.value.phone,
    department_id: submitCredentials.value.department?.id || null,
    region_id: submitCredentials.value.region_id,
    local_code_ids: submitCredentials.value.local_code_ids,
  }

  const result = await updateUser(props.updatingItem.id, payload)

  if (result?.status === 200) {
    toast.success('Muvofaqqiyatli yangilandi.')
    emit('update:updateDialog', false)
    emit('updated')
    form.value.reset()
  } else {
    toast.error('Xatolik yuz berdi')
  }
}

watch(
  () => props.updateDialog,
  async newValue => {
    if (newValue) {
      const item = props.updatingItem

      submitCredentials.value = {
        full_name: item?.full_name || '',
        pinfl: item?.pinfl || '',
        username: item?.username || '',
        password: '',
        phone: item?.phone || '',
        region_id: item?.local_code?.region_id || null,
        department: item?.department || null,
        local_code_ids: Array.isArray(item?.local_code)
          ? item.local_code.map(c => c.id)
          : item?.local_code?.id
            ? [item.local_code.id]
            : [],
      }

      if (submitCredentials.value.region_id) {
        localCodeList.value = await getLocalCodeByRegionId(submitCredentials.value.region_id)
      }
    }
  },
)
</script>

<template>
  <div class="text-center">
    <VDialog v-model="props.updateDialog" max-width="900">
      <VCard class="pa-4">
        <VCardTitle>Xodim ma'lumotlarini o'zgartirish</VCardTitle>
        <VDivider class="mb-4" />

        <VForm ref="form" @submit.prevent="onUpdate">
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.full_name"
                label="Xodim F.I.SH"
                required
                :rules="[
                  v => !!v || 'To‘ldirish majburiy!',
                  v => (v && v.length >= 3) || 'Kamida 3 harf bo‘lishi kerak',
                ]"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.pinfl"
                v-mask="'##############'"
                label="PINFL"
                required
                :rules="[
                  v => !!v || 'To‘ldirish majburiy!',
                  v => (v && v.length === 14) || 'PINFL 14 raqamdan iborat bo‘lishi kerak',
                ]"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.username"
                label="Login"
                required
                :rules="[
                  v => !!v || 'To‘ldirish majburiy!',
                  v => (v && v.length >= 3) || 'Kamida 3 belgidan iborat bo‘lishi kerak',
                ]"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField v-model="submitCredentials.password" label="Parol" />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.phone"
                v-mask="'(##) ###-##-##'"
                label="Telefon"
                required
                :rules="[
                  v => !!v || 'To‘ldirish majburiy!',
                  v => (v && v.length >= 14) || 'Telefon raqam to‘g‘ri emas',
                ]"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VAutocomplete
                v-model="submitCredentials.region_id"
                :items="regionList"
                item-title="name_uz"
                item-value="id"
                label="Viloyat"
                clearable
                required
                @update:model-value="regionChanged"
                :rules="[v => !!v || 'To‘ldirish majburiy!']"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VAutocomplete
                v-model="submitCredentials.local_code_ids"
                :items="localCodeList"
                item-title="name"
                item-value="id"
                label="Lokal kod(lar)"
                multiple
                chips
                clearable
                required
                :rules="[v => v && v.length > 0 || 'Kamida 1 ta tanlanishi kerak']"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VAutocomplete
                v-model="submitCredentials.department"
                :items="departmentList"
                item-title="department_name"
                label="Departament"
                clearable
                required
                return-object
                :rules="[v => !!v || 'To‘ldirish majburiy!']"
              />
            </VCol>
          </VRow>

          <VCardActions class="d-flex justify-end mt-4">
            <VBtn color="error" @click="closeDialog">Bekor qilish</VBtn>
            <VBtn color="success" type="submit">Saqlash</VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>
