<script setup>
import { ref } from 'vue'
import { addUser } from "@/service/userService.js"
import { useToast } from 'vue-toastification'
import { getLocalCodeByRegionId } from "@/service/localCodeService.js"

const props = defineProps({
  regionList: Array,
  departmentList: Array,
})

const emit = defineEmits(['created'])
const toast = useToast()

const submitCredentials = ref({
  full_name: null,
  username: null,
  pinfl: null,
  phone: null,
  region_id: null,
  local_code_ids: [],
  department_id: null,
  password: null,
})

const localCodeList = ref([])

async function regionChanged() {
  submitCredentials.value.local_code_ids = []
  if (submitCredentials.value.region_id) {
    const data = await getLocalCodeByRegionId(submitCredentials.value.region_id)
    localCodeList.value = data || []
  } else {
    localCodeList.value = []
  }
}

const createDialog = ref(false)
const form = ref(null)

async function onCreate() {
  const { valid } = await form.value.validate()
  if (!valid) return

  const payload = {
    ...submitCredentials.value,
    local_code_ids: submitCredentials.value.local_code_ids,
  }

  const result = await addUser(payload)

  if (result.status === 201) {
    toast.success('Muvofaqqiyatli yaratildi.')
    emit('created')
    form.value.reset()
    submitCredentials.value.local_code_ids = []
    createDialog.value = false
  } else {
    toast.error('Xatolik yuz berdi!')
  }
}
</script>

<template>
  <div class="text-center">
    <VBtn class="ml-3" @click="createDialog = true">
      qo'shish
    </VBtn>

    <VDialog v-model="createDialog" max-width="900">
      <VCard class="pa-4">
        <VCardTitle>Yangi xodim qo'shish</VCardTitle>
        <VDivider class="mb-4" />

        <VForm ref="form" @submit.prevent="onCreate">
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.full_name"
                :rules="[v => !!v || 'To‘ldirish majburiy!', v => v?.length >= 3 || 'Kamida 3 harf bo‘lishi kerak']"
                label="Xodim F.I.SH"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.pinfl"
                v-mask="'##############'"
                :rules="[v => !!v || 'To‘ldirish majburiy!', v => v?.length === 14 || 'PINFL 14 raqamdan iborat bo‘lishi zarur']"
                label="PINFL"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.username"
                :rules="[v => !!v || 'To‘ldirish majburiy!', v => v?.length >= 3 || 'Kamida 3 belgi bo‘lishi kerak']"
                label="Foydalanuvchi nomi (login)"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.password"
                :rules="[v => !!v || 'To‘ldirish majburiy!', v => v?.length >= 3 || 'Kamida 3 belgi bo‘lishi kerak']"
                label="Parol"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="submitCredentials.phone"
                v-mask="'(##) ###-##-##'"
                :rules="[v => !!v || 'To‘ldirish majburiy!', v => v?.length >= 14 || 'Telefon raqamni to‘g‘ri kiriting']"
                label="Telefon"
                required
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
                :rules="[v => !!v || 'To‘ldirish majburiy!']"
                @update:model-value="regionChanged()"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VAutocomplete
                v-model="submitCredentials.local_code_ids"
                :items="localCodeList"
                item-title="name"
                item-value="id"
                label="Bank filiali (bir nechta tanlash mumkin)"
                multiple
              chips
              clearable
              :rules="[v => v?.length > 0 || 'Hech bo‘lmaganda 1 filial tanlang']"
              required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VAutocomplete
                v-model="submitCredentials.department_id"
                :items="departmentList"
                item-title="department_name"
                item-value="id"
                label="Departament"
                clearable
              />
            </VCol>
          </VRow>

          <VCardActions class="d-flex justify-end mt-4">
            <VBtn color="error" variant="elevated" @click="createDialog = false">Bekor qilish</VBtn>
            <VBtn color="success" type="submit" variant="elevated">Saqlash</VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>
