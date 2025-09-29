<script lang="ts" setup>
import {watch, onMounted, ref} from "vue";
import {useToast} from "vue-toastification";
import {useLoanPortfolioStore} from '@/stores/loanPortfolioStore'
import {uploadLoanPortfolio} from '@/service/loanPortfolioService'
import AppendPortfolio from "@/pages/loan-portfolio/components/AppendPortfolio.vue";

const toast = useToast()
const loanPortfolioStore = useLoanPortfolioStore()
const selectedDate = ref(null)
const uploadPortfolioDialog = ref(false)
const file = ref(null)

async function getLoanPortfolio() {
  await loanPortfolioStore.fetchLoanPortfolio()
}

function toSum(amount) {
  if (!amount) return "0"
  return Number(amount).toLocaleString("uz-UZ")
}

function perPageChanged() {
  loanPortfolioStore.pageParams.page = 1
  getLoanPortfolio()
}

const loadingUpload = ref(false)

async function uploadFile() {
  if (!file.value || !selectedDate.value) {
    toast.error("Sana va faylni kiritish shart!")
    return
  }

  loadingUpload.value = true
  try {
    let formattedDate = ""
    if (selectedDate.value instanceof Date) {
      formattedDate = selectedDate.value.toISOString().slice(0, 10)
    } else {
      formattedDate = String(selectedDate.value)
    }

    const formData = new FormData()
    formData.append("file", file.value)

    const result = await uploadLoanPortfolio(formData, formattedDate)

    toast.success("Fayl muvaffaqiyatli yuklandi")
    uploadPortfolioDialog.value = false
    await getLoanPortfolio()
  } catch (error) {
    toast.error("Faylni yuklashda xatolik yuz berdi")
  } finally {
    loadingUpload.value = false
  }
}

const selectedItem = ref(null)

let debounceTimeout = null

watch(
  () => loanPortfolioStore.pageParams.query,
  (newValue, oldValue) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      loanPortfolioStore.pageParams.page = 1
      getLoanPortfolio()
    }, 600)
  },
)

onMounted(() => {
  getLoanPortfolio()
  loanPortfolioStore.fetchAgents()
})
</script>

<template>
  <VCard>

    <VRow class="ma-2">
      <VCol
        cols="12"
        md="3"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Kredit portfeli
        </VCardTitle>
      </VCol>
      <VCol
        class="d-flex"
        cols="12"
        md="3"
      >
        <VAutocomplete
          v-model="loanPortfolioStore.pageParams.loan_agent_id"
          :items="loanPortfolioStore.agentsList"
          clearable
          item-title="full_name"
          item-value="loan_agent_id"
          label="Agent"
          @update:modelValue="getLoanPortfolio"
        />
      </VCol>
      <VCol
        class="d-flex"
        cols="12"
        md="3"
      >
        <VTextField
          v-model="loanPortfolioStore.pageParams.query"
          clearable
          density="compact"
          hide-details
          label="Mijoz F.I.SH"
          prepend-inner-icon="mdi-magnify"
        />
      </VCol>

      <VCol class="d-flex justify-end" cols="12" md="3">
        <VBtn
          @click="uploadPortfolioDialog = true"
        >
          <VIcon class="mr-1" icon="mdi-file-excel" size="25"/>
          yuklash
        </VBtn>
      </VCol>
    </VRow>
    <VCardText>
      <VDataTableVirtual
        :headers="loanPortfolioStore.headers"
        :items="loanPortfolioStore.loanPortfolioList"
        :loading="loanPortfolioStore.loading"
        fixed-header
        height="65vh"
        hide-default-footer
        loading-text="ma'lumotlar yuklanmoqda"
        no-data-text="ma'lumot topilmadi"
      >
        <template v-slot:item.overdue_balance="{ item }">
          {{ toSum(item.overdue_balance) }}
        </template>

        <template v-slot:item.loan_agents="{ item }">
          <div v-for="item in item.loan_agents" :key="item.loan_agent_id">
            {{ item.full_name }}
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <AppendPortfolio :updating-item="item"/>
        </template>
      </VDataTableVirtual>

      <VCardActions class="w-full d-flex justify-space-between mt-2">
        <VSelect
          v-model="loanPortfolioStore.pageParams.size"
          :items="[10,20,50]"
          label="Har bir sahifa"
          max-width="150"
          @update:model-value="perPageChanged"
        />
        <VPagination
          v-model="loanPortfolioStore.pageParams.page"
          :length="loanPortfolioStore.pageLength"
          :total-visible="4"
          rounded="circle"
          @update:model-value="getLoanPortfolio"
        />
      </VCardActions>
    </VCardText>

    <VDialog v-model="uploadPortfolioDialog" max-width="600px">
      <VCard>
        <div class="ma-2 d-flex justify-space-between">
          <VCardTitle class="text-h5">
            Kredit portfeli
          </VCardTitle>
          <VBtn
            color="error"
            icon="mdi-close"
            size="large"
            variant="text"
            @click="uploadPortfolioDialog = false"
          />
        </div>

        <VCardText>
          <VFileInput
            v-model="file"
            accept=".xlsx, .xls, .csv"
            label="Excel faylni tanlang"
            variant="outlined"
          />
          <VDateInput
            v-model="selectedDate"
            label="Sanani kiriting"
            variant="outlined"
            prepend-icon="mdi-calendar"
            class="mt-4"
          />
          <div class="mt-2">
            <span class="text-caption text-secondary">
              Excel faylni yuklash uchun shartlar:
              <ul>
                <li>Faylning kengaytmasi .xlsx, .xls yoki .csv bo'lishi kerak.</li>
                <li>Faylda mijozlar haqida to'liq ma'lumot bo'lishi zarur.</li>
              </ul>
            </span>
          </div>
          <div class="w-full d-flex justify-end mt-4">
            <VBtn :disabled="!file" :loading="loadingUpload" @click="uploadFile">
              Yuklash
            </VBtn>
          </div>

        </VCardText>
      </VCard>
    </VDialog>
  </VCard>
</template>
