<script setup>
import { ref, computed } from "vue"
import AgentSection from "@/components/sections/AgentSection.vue"
import { getAgentsList } from "@/service/loanPortfolioService.js"
import { getRegions } from "@/service/regionService.js"
import { getLocalCode } from "@/service/localCodeService.js"

const currentTab = ref("agents")
const agentList = ref([])
const currentMonth = new Date().toISOString().slice(0, 7)
const availableMonths = ref([])

const filters = ref({
  agent_id: null,
  region_id: null,
  local_code_id: null,
  for_month: currentMonth,
  status: true,
})

const regionsList = ref([])
const branchesList = ref([])


const normalizedBranches = computed(() =>
  (branchesList.value || []).map(branch => ({
    ...branch,
    name: branch.name || "Noma'lum",
  })),
)

function resetFilters() {
  filters.value = {
    agent_id: null,
    region_id: null,
    local_code_id: null,
    for_month: currentMonth,
    status: true,
  }
}

function isValidMonthFormat(value) {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(value)
}

function generateAvailableMonths() {
  const now = new Date()
  const year = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  availableMonths.value = Array.from({ length: currentMonth }, (_, i) => {
    const month = String(i + 1).padStart(2, "0")

    return `${year}-${month}`
  })
}

const agentsData = async () => {
  try {
    agentList.value = await getAgentsList()
  }catch(err) {
    console.error("Error fetching agents:", err)
  }
}

const regionsData = async () => {
  try {
    regionsList.value = await getRegions()
  }catch (err){
    console.error("Error fetching regions:", err)
  }
}

const branchesData = async () => {
  try {
    branchesList.value = await getLocalCode()
  }catch(err) {
    console.error("Error fetching branches:", err)
  }
}

watch(
  () => filters.value.for_month,
  (newVal, oldVal) => {
    if (!isValidMonthFormat(newVal)) {
      console.warn("Noto‘g‘ri oy formati:", newVal)
      filters.value.for_month = null
    }
  },
)

onMounted(async () => {
  await agentsData()
  await regionsData()
  await branchesData()
  generateAvailableMonths()
})
</script>

<template>
  <div>
    <VCard class="mb-2 text-xl">
      <VTabs
        v-model="currentTab"
        color="primary"
        grow
      >
        <VTab value="agents">
          Agentlar bo‘yicha
        </VTab>
        <VTab value="branches">
          Filiallar bo‘yicha
        </VTab>
        <VTab value="regions">
          Regionlar bo‘yicha
        </VTab>
      </VTabs>
    </VCard>
    <VCard class="pa-4">
      <VRow
        align="center"
        dense
      >
        <template v-if="currentTab === 'agents'">
          <VCol
            cols="12"
            md="3"
          >
            <VSelect
              v-model="filters.agent_id"
              label="Agent"
              :items="agentList"
              item-title="full_name"
              item-value="loan_agent_id"
              clearable
            />
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <VSelect
              v-model="filters.for_month"
              label="Oy (YYYY-MM)"
              :items="availableMonths"
              clearable
              persistent-hint
            />
          </VCol>
        </template>

        <template v-if="currentTab === 'branches'">
          <VCol
            cols="12"
            md="3"
          >
            <VSelect
              v-model="filters.local_code_id"
              label="Filial"
              :items="normalizedBranches"
              item-title="name"
              item-value="id"
              clearable
            />
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <VSelect
              v-model="filters.for_month"
              label="Oy (YYYY-MM)"
              :items="availableMonths"
              clearable
              persistent-hint
            />
          </VCol>
        </template>

        <template v-if="currentTab === 'regions'">
          <VCol
            cols="12"
            md="3"
          >
            <VSelect
              v-model="filters.region_id"
              label="Region"
              :items="regionsList"
              item-title="name_uz"
              item-value="id"
              clearable
            />
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <VSelect
              v-model="filters.for_month"
              label="Oy (YYYY-MM)"
              :items="availableMonths"
              clearable
              persistent-hint
            />
          </VCol>
        </template>
        <VCol
          cols="12"
          md="3"
          class="d-flex align-center justify-start"
        >
          <VSelect
            v-model="filters.status"
            :items="[
              { text: 'Yopilgan', value: true },
              { text: 'Yopilmagan', value: false }
            ]"
            label="Status"
            item-title="text"
            item-value="value"
            clearable
            persistent-hint
          />
        </VCol>

        <VCol
          cols="12"
          md="2"
          class="d-flex align-center justify-start"
        >
          <VBtn
            color="secondary"
            variant="outlined"
            @click="resetFilters"
          >
            Tozalash
          </VBtn>
        </VCol>
      </VRow>
    </VCard>

    <VWindow
      v-model="currentTab"
      class="mt-2"
    >
      <AgentSection
        v-if="filters.for_month"
        :filters="filters"
      />
    </VWindow>
  </div>
</template>
