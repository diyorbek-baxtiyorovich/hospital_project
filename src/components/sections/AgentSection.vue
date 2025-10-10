<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import { useRouter } from 'vue-router'
import { getStatistic } from "@/service/statistics.servise.js"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'


const props = defineProps({
  filters: Object,
})

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale)

const router = useRouter()
const statsData = ref(null)
const loading = ref(false)
const totalItems = ref(0)

const pagination = reactive({
  page: 1,
  itemsPerPage: 50,
})

const agents = ref([])

const headers = [
  { title: 'ID', key: 'index', sortable: true },
  { title: 'Kredit ID', key: 'loan_id', sortable: true },
  { title: 'FIO', key: 'full_name', sortable: true },
  { title: 'Kechikish kunlari', key: 'days_overdue', sortable: true },
  { title: 'Status', key: 'bucket_status', sortable: true },
  { title: 'Ishlangan', key: 'is_worked', sortable: true },
]

function getBucketColor(status) {
  const colors = {
    '1_to_30': 'success',
    '31_to_60': 'warning',
    '61_to_90': 'orange',
    'up_to_90': 'error',
  }

  return colors[status] || 'grey'
}

function getBucketText(status) {
  const texts = {
    '1_to_30': '1-30 kun',
    '31_to_60': '31-60 kun',
    '61_to_90': '61-90 kun',
    'up_to_90': '90+ kun',
  }

  return texts[status] || status
}

async function sendById(id) {
  await router.push({path: `/clients/${id}`, param: {id}})
}


async function loadData() {
  loading.value = true
  try {
    props.filters.page = pagination.page

    props.filters.itemsPerPage = pagination.itemsPerPage

    const res = await getStatistic(props.filters)

    statsData.value = res
    agents.value = res.agents || []
    totalItems.value = res.clients.total

    await new Promise(resolve => setTimeout(resolve, 500))

  } catch (error) {
    console.error('Ma\'lumotlarni yuklashda xatolik:', error)
  } finally {
    loading.value = false
  }
}


const chartDataLine = computed(() => ({
  labels: agents.value.map(a => a.day),
  datasets: [
    {
      label: 'Qo‘ng‘iroqlar soni',
      data: agents.value.map(a => a.call_logs_count),
      borderColor: '#1976D2',
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Tashriflar soni',
      data: agents.value.map(a => a.visitation_logs_count),
      borderColor: '#43A047',
      backgroundColor: 'rgba(67, 160, 71, 0.2)',
      tension: 0.3,
      fill: true,
    },
  ],
}))

const chartOptionsLine = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          if (Number.isInteger(value)) {
            return value
          }
          return null
        },
        stepSize: 1,
      },
    },
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
  },
}




const chartData = computed(() => {
  if (!statsData.value?.overall) return null
  const o = statsData.value.overall

  return {
    labels: ['1-30', '31-60', '61-90', '90+'],
    datasets: [
      {
        label: 'Mijozlar soni',
        data: [o["1_to_30_count"], o["31_to_60_count"], o["61_to_90_count"], o.up_to_90_count],
        backgroundColor: ['rgba(201, 203, 207, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgb(201, 203, 207)', 'rgb(75, 192, 192)', 'rgb(255, 159, 64)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: 'Kechikish davrlari bo‘yicha mijozlar' },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          if (Number.isInteger(value)) {
            return value
          }
          return null
        },
        stepSize: 1,
      },
    },
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
  },
}

watch(
  () => props.filters,
  () => loadData(),
  { deep: true },
)

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="statistics-dashboard">
    <VRow dense>
      <VCol
        cols="12"
        md="6"
      >
        <VCard class="pa-6 rounded-lg elevation-2 stats-card">
          <VCardTitle class="text-h6 font-weight-bold d-flex align-center justify-space-between mb-4 stats-card-item">
            <span>📊 Umumiy ma'lumotlar</span>
            <VIcon
              icon="mdi-chart-bar"
              color="primary"
              size="28"
            />
          </VCardTitle>

          <VRow>
            <VCol
              cols="12"
              sm="4"
              class="text-center"
            >
              <div class="stat-box">
                <VIcon
                  icon="mdi-account-group"
                  color="primary"
                  size="36"
                />
                <div class="text-caption text-grey mt-1">
                  Jami mijozlar
                </div>
                <div class="text-h5 font-weight-bold mt-1">
                  {{ statsData?.overall?.total_completed_clients || 0 }}
                </div>
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="4"
              class="text-center"
            >
              <div class="stat-box">
                <VIcon
                  icon="mdi-check-bold"
                  color="success"
                  size="36"
                />
                <div class="text-caption text-grey mt-1">
                  Ishlangan
                </div>
                <div class="text-h5 font-weight-bold text-success mt-1">
                  {{ statsData?.overall?.worked_clients || 0 }}
                </div>
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="4"
              class="text-center"
            >
              <div class="stat-box">
                <VIcon
                  icon="mdi-close-circle"
                  color="error"
                  size="36"
                />
                <div class="text-caption text-grey mt-1">
                  Ishlanmagan
                </div>
                <div class="text-h5 font-weight-bold text-error mt-1">
                  {{ statsData?.overall?.unworked_clients || 0 }}
                </div>
              </div>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <VCard
          elevation="2"
          class="pa-4"
        >
          <template v-if="statsData?.overall">
            <Bar
              :data="chartData"
              :options="chartOptions"
            />
          </template>
          <template v-else>
            <VSkeletonLoader
              type="image"
              height="200"
            />
          </template>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard elevation="2" class="pa-4">
          <VCardTitle class="text-h6 mb-3">
            Agentlarning kunlik faoliyati
          </VCardTitle>

          <VCardText>
            <Line
              :data="chartDataLine"
              :options="chartOptionsLine"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard elevation="2">
          <VCardTitle class="text-h5 pa-6 pb-2">
            Mijozlar ro'yxati
          </VCardTitle>
          <VCardText class="pa-0">
            <VDataTableVirtual
              :headers="headers"
              :items="statsData?.clients.items || []"
              :loading="loading"
              height="400px"
              class="elevation-0"
              hover
            >
              <template #item.index="{ index }">
                {{ (pagination.page - 1) * pagination.itemsPerPage + index + 1 }}
              </template>

              <template v-slot:item.full_name="{ item }">
                <span class="text-primary cursor-pointer" @click="sendById(item.client_id)"> {{ item.full_name }}</span>
              </template>

              <template #item.days_overdue="{ item }">
                <VChip
                  size="small"
                  :color="item.days_overdue > 90 ? 'error' : item.days_overdue > 60 ? 'orange' : item.days_overdue > 30 ? 'warning' : 'success'"
                  variant="flat"
                >
                  {{ item.days_overdue }} kun
                </VChip>
              </template>

              <template #item.bucket_status="{ item }">
                <VChip
                  size="small"
                  :color="getBucketColor(item.bucket_status)"
                  variant="tonal"
                >
                  {{ getBucketText(item.bucket_status) }}
                </VChip>
              </template>

              <template #item.is_worked="{ item }">
                <VIcon
                  :icon="item.is_worked ? 'mdi-check-circle' : 'mdi-close-circle'"
                  :color="item.is_worked ? 'success' : 'error'"
                  size="24"
                />
              </template>

              <template #loading>
                <VSkeletonLoader type="table-row@10" />
              </template>

              <template #no-data>
                <div class="text-center pa-8">
                  <VIcon
                    icon="mdi-database-off"
                    size="64"
                    color="grey"
                    class="mb-4"
                  />
                  <div class="text-h6 text-grey">
                    Ma'lumot topilmadi
                  </div>
                </div>
              </template>
            </VDataTableVirtual>
            <VCardActions class="w-full d-flex justify-space-between mt-2">
              <VSelect
                v-model="pagination.itemsPerPage"
                :items="[10,20,50]"
                label="Har bir sahifa"
                max-width="150"
                @update:model-value="loadData"
              />
              <VPagination
                v-model="pagination.page"
                :length="Math.ceil(totalItems / pagination.itemsPerPage)"
                :total-visible="4"
                rounded="circle"
                @update:model-value="loadData"
              />
            </VCardActions>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

  </div>
</template>

<style scoped>
.statistics-dashboard {
  padding: 0;
}
.stat-box {
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease-in-out;
}

.stat-box:hover {
  transform: translateY(-3px);
  background-color: rgba(0, 0, 0, 0.05);
}

.stats-card {
  height: 100%;
}

.stats-card-item{
  margin-bottom: 40px !important;
}


:deep(.v-data-table) {
  border-radius: 0 0 16px 16px !important;
}

:deep(.v-data-table-header) {
  background-color: rgba(0, 0, 0, 0.02);
}

:deep(.v-data-table__tr:hover) {
  background-color: rgba(0, 0, 0, 0.02) !important;
}

:deep(.v-card-title) {
  font-weight: 600;
  letter-spacing: -0.5px;
}
</style>
