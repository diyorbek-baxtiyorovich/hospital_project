<script setup>
import {ref} from 'vue'

import {useToast} from 'vue-toastification'
import {getNeighborhoodByID, updateNeighborhood} from "@/service/neighborhoodService.js";
import {minLengthRule, numberOnly, requiredRule, requiredRulWithoutTrim} from "@/utils/validationRules.js";
import {getDistrict, getDistrictByRegion} from "@/service/districtService.js";

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


async function getNeighborhoodDataById() {
  const result = await getNeighborhoodByID(props.updatingItem.id)
  if (result) {
    submitCredentials.value = result
    await getDistrictList()
  }

}

async function onUpdate() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const result = await updateNeighborhood(props.updatingItem.id, submitCredentials.value)

  if (result?.status === 200) {
    toast.success('Muvofaqqiyatli yangilandi.')
    emit('update:updateDialog', false)
    emit('updated')
    form.value.reset()
  } else
    toast.error('Xatolik yuz berdi')
}


const districtList = ref([])

async function getDistrictList() {
  let data = null
  if (props.updatingItem.region.id !== submitCredentials.value.region_id) submitCredentials.value.district_id = null

  if (submitCredentials.value.region_id) data = await getDistrictByRegion(submitCredentials.value.region_id)
  else data = await getDistrict()

  if (data?.length) {
    districtList.value = data
  }
}


watch(
  () => props.updateDialog,
  newValue => {
    getNeighborhoodDataById()
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
          Mahalla ma'lumotlarini tahrirlash
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



