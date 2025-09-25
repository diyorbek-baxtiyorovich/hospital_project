<script setup>
import { watch, onMounted, ref } from "vue"
import { useToast } from "vue-toastification"
import { useAgentStore } from '@/stores/agentsStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const agentStore = useAgentStore()

const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])$/

const for_month = ref(agentStore.pageParams.for_month || '')

function validateFormat(value) {
  return regex.test(value) || 'Format YYYY-MM bo‘lishi kerak (masalan: 2025-09)'
}

async function getAgentsList() {
  await agentStore.fetchAgentsList()
}

function perPageChanged() {
  agentStore.pageParams.page = 1
  getAgentsList()
}

async function sendById(id) {
  await router.push(`/agents/${id}`)
}

let debounceTimeout = null

watch(for_month, newVal => {
  agentStore.pageParams.for_month = newVal
})

watch(
  () => agentStore.pageParams.for_month,
  () => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      agentStore.pageParams.page = 1
      getAgentsList()
    }, 600)
  },
)

onMounted(() => {
  getAgentsList()
})
</script>

<template>
  <VCard>
    <VRow
      class="ma-2"
      align="center"
    >
      <VCol
        cols="12"
        md="6"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Agentlar to‘plagan daromadlari
        </VCardTitle>
      </VCol>

      <VCol
        cols="12"
        md="3"
      >
        <VTextField
          v-model="for_month"
          v-mask="'####-##'"
          label="Yil va oyni kiriting (YYYY-MM)"
          :rules="[validateFormat]"
          clearable
        />
      </VCol>
    </VRow>

    <VCardText>
      <VDataTableVirtual
        :headers="agentStore.headers"
        :items="agentStore.agentList"
        :loading="agentStore.loading"
        fixed-header
        height="65vh"
        hide-default-footer
        loading-text="ma'lumotlar yuklanmoqda"
        no-data-text="ma'lumot topilmadi"
      >
        <template #item.full_name="{ item }">
          <span
            class="text-primary cursor-pointer"
            @click="sendById(item.agent_id)"
          >
            {{ item.full_name }}
          </span>
        </template>
      </VDataTableVirtual>

      <VCardActions class="w-full d-flex justify-space-between mt-2">
        <VSelect
          v-model="agentStore.pageParams.size"
          :items="[10,20,50]"
          label="Har bir sahifa"
          max-width="150"
          @update:model-value="perPageChanged"
        />
        <VPagination
          v-model="agentStore.pageParams.page"
          :length="agentStore.pageLength"
          :total-visible="4"
          rounded="circle"
          @update:model-value="getAgentsList"
        />
      </VCardActions>
    </VCardText>
  </VCard>
</template>
