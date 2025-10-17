<script setup>
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { updateInfo } from "@/service/departement.servise.js";

const props = defineProps({
  modelValue: Boolean,
  item: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(["update:modelValue"]);
const toast = useToast();
const infoDialog = ref(false);
const menu = ref(false);
const for_date = ref(null);
const dateModel = ref(null);

const openInfoDialog = () => {
  infoDialog.value = true;
};

const updateFormattedDate = async value => {
  if (!value) return;
  const d = new Date(value);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  for_date.value = `${year}-${month}-${day}`;
  menu.value = false;
};

const handleUpdate = async () => {
  const params = {
    department_id: props.item.department_id,
    extra_slots: props.item.extra_slots,
    for_date: for_date.value
  };

  try {
    await updateInfo(params);
    toast.success("Данные успешно обновлены!");
    infoDialog.value = false;
  } catch (error) {
    toast.error("Произошла ошибка!");
  }
};

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date)) return "-";

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr"
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} yil, ${hours}:${minutes}`;
}

const formattedDate = computed(() => formatDate(props.item.date));
const formattedUpdatedAt = computed(() => formatDate(props.item.updated_at));
</script>

<template>
  <VDialog v-model="props.modelValue" max-width="700" persistent>
    <VCard class="pa-5 rounded-2xl elevation-3">
      <VCardTitle
        class="text-h6 font-weight-bold d-flex align-center justify-space-between mb-3"
      >
        Информация о департаменте
        <VBtn
          icon="mdi-close"
          size="small"
          variant="text"
          @click="emit('update:modelValue', false)"
        />
      </VCardTitle>

      <VDivider class="mb-5" />

      <VRow dense>
        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>ID департамента:</strong><br />
            <span>{{ props.item.department_id }}</span>
          </VSheet>
        </VCol>

        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>Основная квота:</strong><br />
            <span>{{ props.item.base_slots }}</span>
          </VSheet>
        </VCol>

        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>Дополнительная квота:</strong><br />
            <span>{{ props.item.extra_slots }}</span>
          </VSheet>
        </VCol>

        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>Дата:</strong><br />
            <span>{{ formattedDate }}</span>
          </VSheet>
        </VCol>

        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>Дата обновления:</strong><br />
            <span>{{ formattedUpdatedAt }}</span>
          </VSheet>
        </VCol>
      </VRow>

      <VDivider class="my-4" />

      <div class="d-flex justify-end">
        <VBtn
          class="mr-2"
          color="success"
          variant="flat"
          @click="openInfoDialog"
        >
          Обновить
        </VBtn>
        <VBtn
          color="primary"
          variant="flat"
          @click="emit('update:modelValue', false)"
        >
          Закрыть
        </VBtn>
      </div>
    </VCard>
  </VDialog>

  <VDialog v-model="infoDialog" max-width="500">
    <VCard>
      <VCardTitle class="text-h5 bg-primary text-white">
        Обновление данных
      </VCardTitle>

      <VCardText class="pt-4">
        <div class="d-flex align-center mb-2">
          <VIcon color="warning" size="48" class="mr-3">
            mdi-alert-circle-outline
          </VIcon>
          <div class="flex-grow-1">
            <p class="text-body-1 mb-2">
              Выберите дату для обновления квоты!
            </p>

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
                  label="Дата (ГГГГ-ММ-ДД)"
                  v-bind="props"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                />
              </template>

              <VDatePicker
                v-model="dateModel"
                color="primary"
                @update:model-value="updateFormattedDate"
              />
            </VMenu>
          </div>
        </div>
      </VCardText>

      <VCardActions class="px-4 pb-4">
        <VSpacer />
        <VBtn color="grey" variant="text" @click="infoDialog = false">
          Отмена
        </VBtn>
        <VBtn
          color="primary"
          variant="flat"
          :disabled="!for_date"
          @click="handleUpdate"
        >
          Обновить
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
.v-sheet {
  transition: background-color 0.2s ease;
}
.v-sheet:hover {
  background-color: #f2f4f8;
}
</style>
