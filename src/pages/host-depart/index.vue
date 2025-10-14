<script setup>
import { ref, computed, onMounted } from "vue";
import { useDepartaments } from "@/stores/departaments.js";
import { getDepartments } from "@/service/departement.servise.js";

import AddDialog from "@/pages/host-depart/components/AddDialog.vue";
import EditDialog from "@/pages/host-depart/components/EditDialog.vue";
import DeleteDialog from "@/pages/host-depart/components/DeleteDialog.vue";
import InfoDialog from "@/pages/host-depart/components/InfoDialog.vue";

const loading = ref(false);
const search = ref("");
const for_date = ref(null);
const menu = ref(false);
const dateModel = ref(null);
const infoDialog = ref(false);
const selectedItem = ref(null);
const departamentList = ref([]);
const departamentsStore = useDepartaments();

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

const availableMonths = ref([]);

function generateAvailableMonths() {
  const now = new Date();
  const year = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  availableMonths.value = Array.from({ length: currentMonth }, (_, i) => {
    const month = String(i + 1).padStart(2, "0");

    return `${year}-${month}`;
  });
}

async function getLocalCodeList() {
  loading.value = true;
  try {
    const params = {};
    if (for_date.value) params.date = for_date.value;
    const data = await getDepartments(params);

    if (Array.isArray(data)) {
      departamentList.value = data.map(item => ({
        name: item.department?.name || "-",
        default_quota: item.department?.default_quota ?? 0,
        is_active: item.department?.is_active ?? false,
        department_id: item.department?.id ?? null,

        id: item.id,
        base_slots: item.base_slots ?? 0,
        extra_slots: item.extra_slots ?? 0,
        date: item.date || "-",
        updated_at: item.updated_at || "-"
      }));
    } else {
      departamentList.value = [];
    }
  } catch (e) {
    console.error("Xatolik:", e);
  } finally {
    loading.value = false;
  }
}

const filteredList = computed(() => {
  if (!search.value) return departamentList.value;

  return departamentList.value.filter(d =>
    d.name?.toLowerCase().includes(search.value.toLowerCase())
  );
});

function openAddDialog() {
  addDialog.value = true;
}
function openInfoDialog(item) {
  selectedItem.value = item;
  infoDialog.value = true;
}
function openEditDialog(item) {
  selectedItem.value = item;
  editDialog.value = true;
}

function openDeleteDialog(item) {
  selectedItem.value = item;
  deleteDialog.value = true;
}

const updateFormattedDate = async value => {
  if (!value) return;
  const d = new Date(value);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  for_date.value = `${year}-${month}-${day}`;
  menu.value = false;

  await getLocalCodeList();
};

onMounted(() => {
  getLocalCodeList();
  generateAvailableMonths();
});
</script>

<template>
  <VCard flat>
    <VRow class="ma-2 align-center">
      <VCol cols="12" md="2">
        <VCardTitle>Departamentlar</VCardTitle>
      </VCol>
      <VCol cols="12" md="4">
        <VTextField
          v-model="search"
          label="Qidirish..."
          append-icon="mdi-magnify"
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
              label="Sana (YYYY-MM-DD)"
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
      <VCol cols="12" md="2" class="text-right">
        <VBtn color="primary" @click="openAddDialog">
          Qo‘shish
        </VBtn>
      </VCol>
    </VRow>

    <VDivider />

    <VDataTableVirtual
      :headers="departamentsStore.headers"
      :items="filteredList"
      :loading="loading"
      height="70vh"
      loading-text="Yuklanmoqda..."
      no-data-text="Ma’lumot topilmadi"
    >
      <template #item.id="{ index }">
        {{ index + 1 }}
      </template>

      <template #item.name="{ item }">
        <span
          class="cursor-pointer"
          style="color: #338aff"
          @click="openInfoDialog(item)"
          >{{ item.name }}</span
        >
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

    <AddDialog v-model="addDialog" @refresh="getLocalCodeList" />
    <EditDialog
      v-model="editDialog"
      :item="selectedItem"
      @refresh="getLocalCodeList"
    />
    <DeleteDialog
      v-model="deleteDialog"
      :item="selectedItem"
      @refresh="getLocalCodeList"
    />
    <InfoDialog v-model="infoDialog" :item="selectedItem" />
  </VCard>
</template>
