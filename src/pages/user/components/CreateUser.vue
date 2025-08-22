<script setup>
import {ref} from 'vue'
import {addUser} from "@/service/userService.js"

import {useToast} from 'vue-toastification'
import {getLocalCodeByRegionId} from "@/service/localCodeService.js";

const props = defineProps({
  regionList: Array,
  departmentList: Array
})

const emit = defineEmits(['created'])

const toast = useToast()

const submitCredentials = ref({
  full_name: null,
  username: null,
  pinfl: null,
  phone: null,
  region_id: null,
  local_code_id: null,
  department_id: null,
  password: null,
})

const localCodeList = ref([])

async function regionChanged() {
  submitCredentials.value.local_code_id = null
  if (submitCredentials.value.region_id) {
    const data = await getLocalCodeByRegionId(submitCredentials.value.region_id)
    if (data.length) localCodeList.value = data
  } else {
    localCodeList.value = []
  }
}


const createDialog = ref(false)

const form = ref(null)

async function onCreate() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const result = await addUser(submitCredentials.value)

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
      max-width="900"
    >
      <VCard class="pa-4">
        <VCardTitle>
          Yangi xodim qo'shish
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          ref="form"
          @submit.prevent="onCreate"
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
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || ' kamida 3 belgidan iborat bo\'lishi zarur',

                ]"
                label="Parol"
                required
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
                v-model="submitCredentials.region_id"
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
                v-model="submitCredentials.local_code_id"
                :items="localCodeList"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                ]"
                clearable
                item-title="name"
                item-value="id"
                label="Bank filiali"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VAutocomplete
                v-model="submitCredentials.department_id"
                :items="departmentList"
                clearable
                item-title="department_name"
                item-value="id"
                label="Departament"
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



