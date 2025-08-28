<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {fetchGuarantorData} from "@/service/clientService.js";
import {useRouter} from "vue-router";

const router = useRouter()
const clientId = router.currentRoute.value.params.id

const guarantorData = ref([])

async function getGuarantorData() {
  const data = await fetchGuarantorData(clientId)
  if (data) guarantorData.value = data
}

onMounted(() => {
  getGuarantorData()
})
</script>

<template>
  <section>
    <VCard v-if="guarantorData.length">
      <VCardTitle class="w-full text-center text-primary">
        Kafil ma'lumotlari
      </VCardTitle>
      <VCardText class="mt-4">
        <VRow v-for="(guarantorItem, index) in guarantorData" :key="index">
          <VCol cols="12" md="4">
            <strong>Kafil F.I.SH:</strong> {{ guarantorItem.full_name }}
          </VCol>
          <VCol cols="12" md="4">
            <strong>Tug'ilgan sanasi:</strong> {{ guarantorItem.birthday }}
          </VCol>
          <VCol cols="12" md="4">
            <strong>Kafillik turi:</strong> {{ guarantorItem.guar_type_name }}
          </VCol>
          <VCol cols="12" md="4">
            <strong>PINFL:</strong> {{ guarantorItem.pinfl }}
          </VCol>
          <VCol cols="12" md="4">
            <strong>Passport:</strong> {{ guarantorItem.passport_sn }}
          </VCol>
          <VCol cols="12" md="4">
            <strong>Passport muddati:</strong> {{ guarantorItem.passport_end_date }}
          </VCol>
          <VCol cols="12" md="4">
            <strong>Telefon raqami:</strong> {{ guarantorItem.phone }}
          </VCol>
          <VCol cols="12" md="8">
            <strong>Manzili:</strong> {{ guarantorItem.address }}
          </VCol>
        </VRow>
        <VDivider class="mt-4"/>
      </VCardText>
    </VCard>
  </section>
</template>
