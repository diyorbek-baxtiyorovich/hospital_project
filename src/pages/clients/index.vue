<script setup>
import {watch, onMounted, ref} from "vue";
import {useToast} from "vue-toastification";
import {useClientStore} from '@/stores/clientStore'
import {useRouter} from 'vue-router'

const router = useRouter()

const toast = useToast()
const clientStore = useClientStore()

async function getClientList() {
  await clientStore.fetchClientList()
}

function perPageChanged() {
  clientStore.pageParams.page = 1
  getClientList()
}

async function sendById(id) {
  await router.push({path: `/clients/${id}`, param: {id}})
}


let debounceTimeout = null

watch(
  () => clientStore.pageParams.query,
  (newValue, oldValue) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      clientStore.pageParams.page = 1
      getClientList()
    }, 600)
  },
)

onMounted(() => {
  getClientList()
})
</script>

<template>
  <VCard>

    <VRow class="ma-2">
      <VCol
        cols="12"
        md="4"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Mijozlar ro'yxati
        </VCardTitle>
      </VCol>
      <VCol
        class="d-flex"
        cols="12"
        md="4"
      >
        <VAutocomplete
          v-model="clientStore.pageParams.client_status"
          :items="clientStore.statusList"
          clearable
          item-title="title"
          item-value="value"
          label="Status"
          @update:modelValue="getClientList"
        />
      </VCol>
      <VCol
        class="d-flex"
        cols="12"
        md="4"
      >
        <VTextField
          v-model="clientStore.pageParams.query"
          clearable
          density="compact"
          hide-details
          label="Mijoz F.I.SH"
          prepend-inner-icon="mdi-magnify"
        />
      </VCol>

    </VRow>
    <VCardText>
      <VDataTableVirtual
        :headers="clientStore.headers"
        :items="clientStore.clientList"
        :loading="clientStore.loading"
        fixed-header
        height="65vh"
        hide-default-footer
        loading-text="ma'lumotlar yuklanmoqda"
        no-data-text="ma'lumot topilmadi"
      >
        <template v-slot:item.full_name="{ item }">
          <span class="text-primary cursor-pointer" @click="sendById(item.id)"> {{ item.full_name }}</span>
        </template>

        <template v-slot:item.client_status="{ item }">
          <VChip
            v-if="item.client_status === 'not_completed'"
            class="ma-0"
            color="error"
            small
          >
            Yakunlanmagan
          </VChip>

          <VChip
            v-if="item.client_status === 'completed'"
            class="ma-0"
            color="success"
            small
          >
            Yakunlangan
          </VChip>

          <VChip
            v-if="item.client_status === 'in_progress'"
            class="ma-0"
            color="warning"
            small
          >
            Jarayonda
          </VChip>
        </template>
      </VDataTableVirtual>

      <VCardActions class="w-full d-flex justify-space-between mt-2">
        <VSelect
          v-model="clientStore.pageParams.size"
          :items="[10,20,50]"
          label="Har bir sahifa"
          max-width="150"
          @update:model-value="perPageChanged"
        />
        <VPagination
          v-model="clientStore.pageParams.page"
          :length="clientStore.pageLength"
          :total-visible="4"
          rounded="circle"
          @update:model-value="getClientList"
        />
      </VCardActions>
    </VCardText>

  </VCard>
</template>
