<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {fetchPaymentData} from "@/service/clientService.js";
import {useRouter} from "vue-router";

const router = useRouter()
const clientId = router.currentRoute.value.params.id

const paymentData = ref([])

async function getPaymentData() {
  const data = await fetchPaymentData(clientId)
  if (data) paymentData.value = data
}


function toSum(amount) {
  if (!amount) return "0"
  return Number(amount).toLocaleString("uz-UZ")
}

onMounted(() => {
  getPaymentData()
})
</script>

<template>
  <section>
    <VCard v-if="paymentData.length">
      <VCardTitle class="w-full text-center text-primary">
        To'lov ma'lumotlari
      </VCardTitle>
      <VCardText class="mt-4">
        <VDataTableVirtual
          :headers="[
            { title: 'To\'lov sanasi', value: 'payment_day' },
            { title: 'To\'lov summasi', value: 'paid_amount' },
            { title: 'Kredit hisobi', value: 'credit_balance' },
            { title: 'To\'langan foiz', value: 'paid_percent_amount' },
          ]"
          :items="paymentData"
          class="elevation-1"
          fixed-header
          style="max-height: 400px;"
        >
          <template #item.paid_amount="{ item }">
            {{ toSum(item.paid_amount) }}
          </template>
          <template #item.credit_balance="{ item }">
            {{ toSum(item.credit_balance) }}
          </template>
          <template #item.paid_percent_amount="{ item }">
            {{ toSum(item.paid_percent_amount) }}
          </template>
          <template #no-data>
            <div class="text-center pa-4">
              To'lov ma'lumotlari mavjud emas.
            </div>
          </template>
        </VDataTableVirtual>
      </VCardText>
    </VCard>
  </section>
</template>
