<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {fetchClientById} from "@/service/clientService.js";
import {useRouter} from "vue-router";

const router = useRouter()
const clientId = router.currentRoute.value.params.id

const clientData = ref(null)

async function getClientById() {
  const data = await fetchClientById(clientId)
  if (data?.id) clientData.value = data
}


function toSum(amount) {
  if (!amount) return "0"
  return Number(amount).toLocaleString("uz-UZ")
}

function openMap(lat, lng) {
  const url = `https://yandex.com/maps/?pt=${lng},${lat}&z=16&l=map`;
  window.open(url, '_blank');
}

onMounted(() => {
  getClientById()
})
</script>

<template>
  <section>
    <VCard v-if="clientData">
      <VCardTitle class="w-full text-center">
        <VChip class="pa-2" color="primary" size="20">{{ clientData.loan_id }}</VChip>
      </VCardTitle>
      <VCardText class="mt-4">
        <VRow>
          <VCol cols="12" md="6">
            <strong>Mijoz F.I.SH:</strong> {{ clientData.full_name }}
          </VCol>
          <VCol cols="12" md="6">
            <strong>Mijoz manzili:</strong> {{ clientData.client_address }}
          </VCol>
          <VCol cols="12" md="6">
            <strong>Muddati o'tgan qarz:</strong> {{ toSum(clientData.overdue_balance) }}
          </VCol>
          <VCol cols="12" md="6">
            <strong>Kredit turi:</strong> {{ clientData.loan_product }}
          </VCol>
          <VCol cols="12" md="6">
            <strong>Muddati o'tgan kun(lar):</strong> {{ clientData.days_overdue }}
          </VCol>
          <VCol cols="12" md="6">
            <strong>Muddati o'tgan sana:</strong> {{ clientData.overdue_date }}
          </VCol>
        </VRow>
      </VCardText>

      <v-expansion-panels class="ma-4">
        <v-expansion-panel
        >
          <v-expansion-panel-title>
            <span class="text-info text-md-h5">Agent tomonidan qo'shilgan ma'lumotlar</span>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <div
                v-for="(address, index) in clientData.client_addresses"
                :key="index"
                class="ml-4 mb-4"
              >
                <div
                  class="cursor-pointer hover-effect"
                  @click="openMap(address.location_latt, address.location_long)"
                >
                  {{ index + 1 }}) {{ address.address }}
                </div>

                <div class="mt-2">
                  <viewer>
                    <img v-for="src in address.photos" :key="src" :src="src.photo" class="mr-2"
                         style="max-width: 100px;">
                  </viewer>
                </div>

                <div>
                  <span class="font-weight-bold">Izoh: </span>
                  {{ address.comment ? address.comment : "Izoh mavjud emas" }}
                </div>
                <VDivider class="my-2"/>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

    </VCard>
  </section>
</template>

<style scoped>
.hover-effect:hover {
  text-decoration: underline !important;
}
</style>
