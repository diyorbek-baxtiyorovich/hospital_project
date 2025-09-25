<script setup>
import { ref } from "vue"
import { useLoanPortfolioStore } from "@/stores/loanPortfolioStore.js"
import { appendLoanToAgent } from "@/service/loanPortfolioService.js"
import { useToast } from "vue-toastification"

const props = defineProps({
  updatingItem: Object,
})

const loanPortfolioStore = useLoanPortfolioStore()

const appendPortfolioDialog = ref(null)

const loading = ref(false)
const form = ref(null)
const toast = useToast()

async function onUpdate() {
  const { valid } = await form.value.validate()
  if (!valid) return
  loading.value = true

  const data = {
    loan_id: props.updatingItem.loan_id,
    loan_agent_id: props.updatingItem.loan_agent_id,
  }

  const result = await appendLoanToAgent(data)

  loading.value = false
  if (result.result === 'Ok') {
    appendPortfolioDialog.value = false
    await loanPortfolioStore.fetchLoanPortfolio()
    toast.success('Muvofaqqiyatli yangilandi.')
  }
}
</script>

<template>
  <VBtn
    class="ml-2"
    color="primary"
    @click="appendPortfolioDialog = true"
  >
    Biriktirish
  </VBtn>

  <VDialog
    v-model="appendPortfolioDialog"
    max-width="600px"
  >
    <VCard>
      <div class="ma-2 d-flex justify-space-between">
        <VCardTitle class="text-h5">
          Kredit portfelini biriktirish
        </VCardTitle>
        <VBtn
          color="error"
          icon="mdi-close"
          size="large"
          variant="text"
          @click="appendPortfolioDialog = false"
        />
      </div>

      <VForm
        ref="form"
        class="pa-6"
        @submit.prevent="onUpdate"
      >
        <VTextField
          v-model="props.updatingItem.client_name"
          label="Mijoz F.I.SH"
          readonly
        />
        <VTextField
          v-model="props.updatingItem.loan_id"
          class="mt-4"
          label="Kredit ID"
          readonly
        />
        <VAutocomplete
          v-model="props.updatingItem.loan_agent_id"
          :items="loanPortfolioStore.agentsList"
          :rules="[v => !!v || 'to\'ldirish majburiy!']"
          class="mt-4"
          item-title="full_name"
          item-value="loan_agent_id"
          label="Agent"
          clearable
        />
        <div class="w-full d-flex justify-end mt-4">
          <VBtn
            :loading="loading"
            type="submit"
          >
            saqlash
          </VBtn>
        </div>
      </VForm>
    </VCard>
  </VDialog>
</template>

