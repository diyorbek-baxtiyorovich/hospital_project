<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {fetchCallLogs} from "@/service/clientService.js";
import {useRouter} from "vue-router";

const router = useRouter()
const clientId = router.currentRoute.value.params.id

const visitLogsData = ref([])

async function getCallLogs() {
  const data = await fetchCallLogs(clientId)
  if (data) visitLogsData.value = data
}

function openMap(lat, lng) {
  const url = `https://yandex.com/maps/?pt=${lng},${lat}&z=16&l=map`;
  window.open(url, '_blank');
}

onMounted(() => {
  getCallLogs()
})
</script>

<template>
  <section>
    <VCard v-if="visitLogsData.length">
      <VCardTitle class="w-full text-center text-primary">
        Telefon qo'ng'iroqlari jurnali
      </VCardTitle>
      <VCardText class="mt-4">
        <VDataTableVirtual
          :headers="[
            { title: 'Agent F.I.SH', value: 'loan_agent.full_name' },
            { title: 'Izoh', value: 'comment' },
            { title: 'Mijoz telefon raqami', value: 'client_contact.phone', width: '200' },
            { title: 'Joy fotosuratlari', value: 'photos' },
          ]"
          :items="visitLogsData"
          class="elevation-1"
          fixed-header
          style="max-height: 400px;"
        >
          <template #item.client_address="{ item }">
            <div
              class="cursor-pointer hover-effect"
              @click="openMap(item.client_address.location_latt, item.client_address.location_long)"
            >
              {{ item.client_address?.address }}
            </div>
          </template>

          <template #item.photos="{ item }">
            <viewer>
              <img v-for="src in item.photos" :key="src" :src="src.photo" class="mr-2 cursor-pointer"
                   style="max-width: 50px;">
            </viewer>
          </template>
        </VDataTableVirtual>
      </VCardText>
    </VCard>
  </section>
</template>

<style scoped>
.hover-effect:hover {
  text-decoration: underline !important;
}
</style>
