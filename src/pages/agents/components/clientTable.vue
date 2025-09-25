<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getAgentDataId } from "@/service/agents.servise"


const route = useRoute()
const router = useRouter()
const agent_id = Number(route.params.id)
const loading = ref(false)
const pageLength = ref(1)

const pageParams = ref({
  page: 1,
  size: 50,
})


const headers = ref([
  {
    title: "Id",
    align: 'start',
    key: 'index',
    sortable: false,
  },
  {
    title: 'Mijoz F.I.SH',
    align: 'start',
    key: 'full_name',
  },
  {
    title: 'Kechiktirilgan daromad',
    align: 'start',
    key: 'overdue_income',
  },
  {
    title: 'Foiz daromadi',
    align: 'start',
    key: 'percentage_income',
  },
  {
    title: 'Jarima daromadi',
    align: 'start',
    key: 'surcharge_income',
  },
  {
    title: 'Umumiy daromad',
    align: 'start',
    key: 'total_income',
  },
],
)

const clientList = ref([])


const fetchData = async () => {
  loading.value = true
  try {
    const res = await getAgentDataId(agent_id, pageParams.value)

    clientList.value = res.items
    pageLength.value = res.pages || 1
  } catch (error) {
    console.error("Xatolik:", error)
  } finally {
    loading.value = false
  }
}

async function sendById(id) {
  await router.push({path: `/clients/${id}`, param: {id}})
}

const perPageChanged = () => {
  pageParams.value.page = 1
  fetchData()
}

const getClientList = () => {
  fetchData()
}

onMounted(async () => {
  await fetchData()
})
</script>


<template>
  <section>
    <VCard>
      <VCardText>
        <VDataTableVirtual
          :headers="headers"
          :items="clientList"
          :loading="loading"
          fixed-header
          height="65vh"
          hide-default-footer
          loading-text="ma'lumotlar yuklanmoqda"
          no-data-text="ma'lumot topilmadi"
        >
          <template #item.index="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.full_name="{ item }">
            <span class="text-primary cursor-pointer" @click="sendById(item.client_id)"> {{ item.full_name }}</span>
          </template>
        </VDataTableVirtual>

        <VCardActions class="w-full d-flex justify-space-between mt-2">
          <VSelect
            v-model="pageParams.size"
            :items="[10,20,50]"
            label="Har bir sahifa"
            max-width="150"
            @update:model-value="perPageChanged"
          />
          <VPagination
            v-model="pageParams.page"
            :length="pageLength"
            :total-visible="4"
            rounded="circle"
            @update:model-value="getClientList"
          />
        </VCardActions>
      </VCardText>
    </VCard>
  </section>
</template>
