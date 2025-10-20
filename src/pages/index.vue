<template>
  <div>
    <VCard
      class="ma-2"
      flat
    >
      <VRow class="pa-2 align-center">
        <VCardTitle class="mr-4">
          <span>📊 Umumiy ma'lumotlar</span>
        </VCardTitle>
        <VCol
          cols="12"
          md="3"
        >
          <VSelect
            v-model="filters.department_id"
            label="Departament"
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
          <VMenu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ props }">
              <VTextField
                v-model="for_date"
                label="Дата (YYYY-MM-DD)"
                v-bind="props"
                prepend-inner-icon="mdi-calendar"
                placeholder="2025-10-14"
              />
            </template>

            <VDatePicker
              v-model="dateModel"
              color="primary"
              @update:model-value="updateFormattedDate"
            />
          </VMenu>
        </VCol>

        <VCol
          cols="12"
          md="3"
          class="d-flex justify-end"
        >
          <VBtn
            color="primary"
            @click="addData"
          >
            Ma'lumot qo'shish
          </VBtn>
        </VCol>
      </VRow>
      <VRow dense>
        <VCol cols="12">
          <VCard flat>
            <VDivider />
            <VDataTableVirtual
              :headers="AppointmentsStore.headers"
              :items="doctorsList"
              :loading="loading"
              height="70vh"
              loading-text="Загрузка..."
              no-data-text="Данные не найдены"
            >
              <template #item.actions="{ item }">
                <div class="d-flex">
                  <VBtn
                    icon="mdi-eye-outline"
                    variant="plain"
                    color="info"
                    @click="showDialog = true"
                  />
                  <VBtn
                    icon="mdi-pencil-circle"
                    variant="plain"
                    color="warning"
                  />
                  <VBtn
                    icon="mdi-delete"
                    variant="plain"
                    color="error"
                  />
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
          </vcard>
        </vcol>
      </vrow>
    </vcard>
    <InfoDataDialog
      v-model="showDialog"
      :data="appointmentData"
    />
  </div>
</template>

<script setup>
import InfoDataDialog from '@/components/basis/infoDataDialog.vue'
import { useAppointments } from '@/stores/basisStore'
import { reactive, ref } from 'vue'

const AppointmentsStore = useAppointments()

const menu = ref(false)
const for_date = ref(null)
const dateModel = ref(null)

const pagination = reactive({
  page: 1,
  itemsPerPage: 10,
})

const showDialog = ref(false)

const appointmentData = ref({
  department_id: 1,
  date: "2025-10-19",
  slot_no: 5,
  doctor_id: 1,
  patient_fullname: "Aliyev Jasur Baxtiyorovich",
  birth_date: "1985-03-15",
  diagnosis: "ORVI, yuqori nafas yo'llari infeksiyasi, gripp belgisi",
  phone: "+998 90 123 45 67",
  purpose: "Umumiy tekshiruv va konsultatsiya",
  doctor_name_text: "Dr. Karimov Aziz",
  note_for_head: "Bemor maxsus e'tibor talab qiladi, surunkali kasallik tarixi mavjud",
  note_public: "Qabul oldidan 2 soat ovqat iste'mol qilmaslik tavsiya etiladi",
  id: 12345,
  created_by_user: {
    id: 10,
    full_name: "Rahimova Dilnoza",
    user: { username: "d.rahimova" },
  },
  created_at: "2025-10-15T09:30:00.000Z",
  updated_at: "2025-10-18T14:45:00.000Z",
  department: { name: "Terapiya bo'limi", default_quota: 30, is_active: true, id: 1 },
  doctor: {
    id: 1,
    full_name: "Karimov Aziz Shavkatovich",
    user: { username: "a.karimov" },
  },
})

const filters = reactive({
  department_id: null,
  for_month: null,
  local_code_id: null,
})

const loading = ref(false)

// === Select Data ===
const agentList = ref([
  { full_name: "Dilnoza Jo‘rayeva", loan_agent_id: 1 },
  { full_name: "Azizbek To‘xtasinov", loan_agent_id: 2 },
  { full_name: "Nodirbek Rahmonov", loan_agent_id: 3 },
])


const updateFormattedDate = async value => {
  if (!value) return
  const d = new Date(value)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  for_date.value = `${year}-${month}-${day}`
  menu.value = false

  // await getLocalCodeList()
}


const doctorsList = ref([
  {
    department_id: 3,
    date: "2025-10-18",
    id: 1,
    patient_fullname: "Karimov Diyorbek Kenzo",
    birth_date: "1998-04-23",
    diagnosis: "Yengil bronxit",
    phone: "+99890 123 45 67",
    purpose: "Shifokor ko‘rigiga yozilish",
    doctor: { full_name: "Nodirbek Rahmonov" },
    department: { name: "Terapiya bo‘limi" },
  },
  {
    department_id: 5,
    id: 2,
    date: "2025-10-19",
    patient_fullname: "Islomov Anvarbek Shoxrux",
    birth_date: "1985-11-15",
    diagnosis: "Yurak aritmiyasi",
    phone: "+99891 765 43 21",
    purpose: "Yurak tekshiruvi",
    doctor: { full_name: "Saodat Gulomova" },
    department: { name: "Kardiologiya bo‘limi" },
  },
])

// === Methods ===
const addData = () => {
  console.log('here')
}
</script>
