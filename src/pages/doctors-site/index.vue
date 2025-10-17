<script setup>
import { onMounted, ref } from "vue";
import { useDoctorsStore } from "@/stores/doctorsStore.js";
import { deleteDoctors, getDoctors } from "@/service/doctors.servise.js";
import { getDepartmentsAll } from "@/service/departement.servise.js";

import AddDoctorsInfo from "@/pages/doctors-site/components/AddDoctorsInfo.vue";
import DoctorEditDialog from "@/pages/doctors-site/components/DoctorEditDialog.vue";
import DoctorsDelete from "@/pages/doctors-site/components/doctorsDelete.vue";

const loading = ref(false);
const doctorsStore = useDoctorsStore();
const selectedItem = ref({});
const doctorsList = ref([]);
const search = ref("");

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const departamentList = ref([]);

async function getDoctorsList() {
  loading.value = true;
  try {
    const params = {
      query: search.value || ""
    };
    const res = await getDoctors(params);

    doctorsList.value = Array.isArray(res) ? res : res?.data || [];
  } catch (e) {
    console.error("Ошибка:", e);
  } finally {
    loading.value = false;
  }
}

async function getDepartament() {
  try {
    const data = await getDepartmentsAll();

    departamentList.value = data;
  } catch (e) {
    console.error(e);
  }
}

const deleteData = async () => {
  try {
    await deleteDoctors(selectedItem.value.id);
    await getDoctorsList();
  } catch (e) {
    console.error(e);
  }
};

function openAddDialog() {
  addDialog.value = true;
}

function openEditDialog(item) {
  selectedItem.value = item;
  editDialog.value = true;
}

function openDeleteDialog(item) {
  selectedItem.value = item;
  deleteDialog.value = true;
}

onMounted(() => {
  getDoctorsList();
  getDepartament();
});
</script>

<template>
  <VCard flat>
    <VRow class="ma-2 align-center">
      <VCol cols="12" md="6">
        <VCardTitle>Список врачей</VCardTitle>
      </VCol>

      <VCol cols="12" md="4">
        <VTextField
          v-model="search"
          label="Поиск..."
          prepend-icon="mdi-magnify"
          @keyup.enter="getDoctorsList"
        />
      </VCol>

      <VCol cols="12" md="2" class="text-right">
        <VBtn color="primary" @click="openAddDialog">Добавить</VBtn>
      </VCol>
    </VRow>

    <VDivider />

    <VDataTableVirtual
      :headers="doctorsStore.headers"
      :items="doctorsList"
      :loading="loading"
      height="70vh"
      loading-text="Загрузка..."
      no-data-text="Данные не найдены"
    >
      <template #item.id="{ index }">
        {{ index + 1 }}
      </template>

      <template #item.username="{ item }">
        <span style="color: #1976d2">{{ item.username }}</span>
      </template>

      <template #item.actions="{ item }">
        <div class="d-flex">
          <VBtn
            icon="mdi-pencil-circle"
            variant="plain"
            color="warning"
            @click="openEditDialog(item)"
          />
          <VBtn
            icon="mdi-delete"
            variant="plain"
            color="error"
            @click="openDeleteDialog(item)"
          />
        </div>
      </template>
    </VDataTableVirtual>

    <AddDoctorsInfo
      v-model="addDialog"
      :department-list="departamentList"
      @added="getDoctorsList"
    />

    <DoctorEditDialog
      v-model:editDialog="editDialog"
      :department-list="departamentList"
      :editing-item="selectedItem"
      @updated="getDoctorsList"
    />

    <DoctorsDelete v-model="deleteDialog" @confirm="deleteData" />
  </VCard>
</template>
