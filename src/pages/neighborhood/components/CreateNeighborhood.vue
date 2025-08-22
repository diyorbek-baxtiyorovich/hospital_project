<script setup>
import {ref} from 'vue'
import {addLoanPurpose} from "@/service/loanPurposeService.js"
import {requiredRule, minLengthRule, numberOnly, requiredRulWithoutTrim} from '@/utils/validationRules.js'

import {useToast} from 'vue-toastification'
import {getDistrict, getDistrictByRegion} from "@/service/districtService.js";
import {addNeighborhood} from "@/service/neighborhoodService.js";

const emit = defineEmits(['created'])

const toast = useToast()

const props = defineProps({
  regionsList: Array,
})

const submitCredentials = ref({
  name_uz: null,
  name_ru: null,
  mfy_code: null,
  iabs_mfy_code: null,
  region_id: null,
  district_id: null,
})

const districtList = ref([])

async function getDistrictList() {
  let data = null
  submitCredentials.value.district_id = null
  if (submitCredentials.value.region_id) data = await getDistrictByRegion(submitCredentials.value.region_id)
  else data = await getDistrict()

  if (data?.length) {
    districtList.value = data
  }
}

const createDialog = ref(false)

const form = ref(null)

async function onCreate() {

  const {valid} = await form.value.validate()

  if (!valid) return

  const result = await addNeighborhood(submitCredentials.value)

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
      width="90%"
    >
      <VCard class="pa-4">
        <VToolbar>
          <VToolbarTitle>Mahalla yaratish</VToolbarTitle>

          <VSpacer/>

          <VToolbarItems>
            <VBtn
              color="error"
              density="default"
              icon="mdi-close"
              size="x-large"
              variant="plain"
              @click="createDialog=false"
            />
          </VToolbarItems>
        </VToolbar>
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
                v-model="submitCredentials.name_uz"
                :rules="[
                  requiredRule,
                  minLengthRule(3),
                ]"
                label="Mahalla nomi (uz)"
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
                  requiredRule,
                  minLengthRule(3)
                ]"
                label="Mahalla nomi (ru)"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.mfy_code"
                :rules="[
                  requiredRule,
                  minLengthRule(3),
                  numberOnly
                ]"
                label="MFY kodi"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.iabs_mfy_code"
                :rules="[
                  requiredRule,
                  minLengthRule(3),
                  numberOnly
                ]"
                label="IABS MFY kodi"
                required
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
                  requiredRulWithoutTrim
                ]"
                item-title="name"
                item-value="id"
                label="Viloyat"
                required
                @update:model-value="getDistrictList()"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VAutocomplete
                v-model="submitCredentials.district_id"
                :items="districtList"
                :rules="[
                  requiredRulWithoutTrim
                ]"
                item-title="name"
                item-value="id"
                label="Tuman"
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



