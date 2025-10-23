<template>
  <div>
    <div class="ma-2" flat>
      <VCard class="mb-2 text-xl">
        <VTabs v-model="currentTab" color="primary" grow>
          <VTab value="planned">
            Планируется
          </VTab>
          <VTab value="admitted">
            Допущенный
          </VTab>
          <VTab value="hospitalized">
            Госпитализирован
          </VTab>
          <VTab value="canceled">
            Отменено
          </VTab>
        </VTabs>
      </VCard>
      <VCard class="mb-3 py-1" flat>
        <VRow class="pa-2 align-center">
          <VCardTitle class="mr-4">
            <span>📊 Общая информация</span>
          </VCardTitle>
          <VCol cols="12" md="3">
            <VSelect
              v-model="filters.department_id"
              label="Departament"
              :items="agentList"
              item-title="name"
              item-value="id"
              clearable
            />
          </VCol>
          <VCol cols="12" md="3">
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
                  clearable
                />
              </template>

              <VDatePicker
                v-model="dateModel"
                color="primary"
                @update:model-value="updateFormattedDate"
              />
            </VMenu>
          </VCol>

          <VCol cols="12" md="3" class="d-flex justify-end">
            <VBtn color="primary" @click="showDataDialog = true">
              Добавить информацию
            </VBtn>
          </VCol>
        </VRow>
      </VCard>
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
              <template #item.status="{ item }">
                <VChip
                  :color="getStatusColor(item.status)"
                  text-color="white"
                  size="small"
                  class="font-weight-medium"
                >
                  <VIcon start small>
                    {{ getStatusIcon(item.status) }}
                  </VIcon>
                  {{ getStatusText(item.status) }}
                </VChip>
              </template>

              <template #item.actions="{ item }">
                <div class="d-flex">
                  <VTooltip text="Просмотр" location="top">
                    <template #activator="{ props }">
                      <VBtn
                        v-bind="props"
                        icon="mdi-eye-outline"
                        variant="plain"
                        color="info"
                        @click="openEyeData(item)"
                      />
                    </template>
                  </VTooltip>

                  <VTooltip text="Изменить статус" location="top">
                    <template #activator="{ props }">
                      <VBtn
                        v-bind="props"
                        icon="mdi-atom-variant"
                        variant="plain"
                        color="warning"
                        @click="openStatusDialog(item)"
                      />
                    </template>
                  </VTooltip>
                </div>
              </template>
            </VDataTableVirtual>
            <VCardActions class="w-full d-flex justify-space-between mt-2">
              <VSelect
                v-model="pagination.itemsPerPage"
                :items="[10, 20, 50]"
                label="Каждая страница"
                max-width="150"
                @update:model-value="fetchLoadData"
              />
              <VPagination
                v-model="pagination.page"
                :length="Math.ceil(totalItems / pagination.itemsPerPage)"
                :total-visible="4"
                rounded="circle"
                @update:model-value="fetchLoadData"
              />
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </div>
    <InfoDataDialog
      v-if="showDialog"
      v-model="showDialog"
      :data="appointmentData"
    />
    <AddDataDialog
      v-if="showDataDialog"
      v-model="showDataDialog"
      :departament="agentList"
      @submit="AddDataHandl"
    />
    <ChangeStatus
      v-if="showStatusDialog"
      v-model="showStatusDialog"
      :item="selectedStatus"
      :current-tab="currentTab"
      @update-status="handleStatusUpdate"
    />
  </div>
</template>

<script setup>
import InfoDataDialog from "@/components/basis/infoDataDialog.vue";
import { useAppointments } from "@/stores/basisStore";
import { reactive, ref, watch } from "vue";
import { getDepartmentsAll } from "@/service/departement.servise.js";
import { useToast } from "vue-toastification";
import {
  addAppointments,
  getAppointments,
  updateAppointments
} from "@/service/appointments.servise.js";
import AddDataDialog from "@/components/basis/addDataDialog.vue";
import ChangeStatus from "@/components/basis/changeStatus.vue";

const AppointmentsStore = useAppointments();
const toast = useToast();
const menu = ref(false);
const for_date = ref(null);
const dateModel = ref(null);
const showDataDialog = ref(false);
const currentTab = ref("planned");
const showStatusDialog = ref(false);

const pagination = reactive({
  page: 1,
  itemsPerPage: 10
});

const totalItems = ref(0);
const showDialog = ref(false);
const selectedStatus = ref(null);
const doctorsList = ref([]);
const appointmentData = ref([]);

const filters = reactive({
  department_id: null,
  for_date: null,
  status: currentTab.value
});

const loading = ref(false);

const agentList = ref([]);
function getStatusColor(status) {
  switch (status) {
    case "planned":
      return "blue";
    case "admitted":
      return "green";
    case "hospitalized":
      return "deep-purple";
    case "canceled":
      return "red";
    default:
      return "grey";
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "planned":
      return "mdi-calendar-clock";
    case "admitted":
      return "mdi-check-circle";
    case "hospitalized":
      return "mdi-hospital-building";
    case "canceled":
      return "mdi-cancel";
    default:
      return "mdi-help-circle";
  }
}

function getStatusText(status) {
  switch (status) {
    case "planned":
      return "Планируется";
    case "admitted":
      return "Допущен";
    case "hospitalized":
      return "Госпитализирован";
    case "canceled":
      return "Отменено";
    default:
      return "Неизвестно";
  }
}

const updateFormattedDate = value => {
  if (!value) return;

  const d = new Date(value);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  for_date.value = `${year}-${month}-${day}`;

  filters.for_date = for_date.value;

  menu.value = false;
};

const openStatusDialog = item => {
  selectedStatus.value = item;
  showStatusDialog.value = true;
};

const openEyeData = item => {
  appointmentData.value = item;
  showDialog.value = true;
};

const departamentData = async () => {
  try {
    agentList.value = await getDepartmentsAll();

    if (agentList.value.length > 0) {
      filters.department_id = agentList.value[0].id;
    }

    await fetchLoadData();
  } catch (err) {
    console.error("Ошибка при загрузке департаментов:", err);
    toast.error("Ошибка при загрузке департаментов: ❌");
  }
};

const fetchLoadData = async () => {
  loading.value = true;

  const params = {
    department_id: filters.department_id,
    for_date: filters.for_date,
    status: filters.status
  };

  try {
    doctorsList.value = await getAppointments(params);
  } catch (err) {
    console.error("Data loading error", err);
  } finally {
    loading.value = false;
  }
};

const AddDataHandl = async newData => {
  try {
    await addAppointments(newData);
    toast.success("Приём успешно добавлен ✅");
    await fetchLoadData();
  } catch (error) {
    console.error("Ошибка при добавлении приёма:", error);
    toast.error("Ошибка при сохранении ❌");
  }
};

const handleStatusUpdate = async ({ id, status }) => {
  try {
    await updateAppointments(id, status);
    await fetchLoadData();
    toast.success("Status muvaffaqiyatli yangilandi ✅");
  } catch (error) {
    console.error("Ошибка при обновлении статуса:", error);
    toast.error("Ошибка при обновлении статуса ❌");
  }
};

onMounted(() => {
  departamentData();
});

watch(currentTab, async val => {
  filters.status = val;
  await fetchLoadData();
});

watch(
  () => filters.department_id,
  (newVal, oldVal) => {
    if (newVal !== oldVal) fetchLoadData();
  }
);

watch(
  () => filters.for_date,
  (newVal, oldVal) => {
    if (newVal !== oldVal) fetchLoadData();
  }
);
</script>
