<template>
  <VDialog
    v-model="model"
    max-width="450"
    transition="dialog-bottom-transition"
    persistent
  >
    <VCard class="pa-3 rounded-xl elevation-3">
      <!-- Title -->
      <VCardTitle class="d-flex align-center mb-1">
        <VIcon color="primary" size="28" class="mr-2">mdi-autorenew</VIcon>
        <span class="text-h6 font-weight-bold">Изменить статус</span>
      </VCardTitle>

      <!-- Divider -->
      <VDivider class="my-2" />

      <!-- Current Status -->
      <VCardText>
        <div class="mb-3">
          <span class="text-subtitle-2 text-medium-emphasis"
            >Текущий статус:</span
          >
          <div class="mt-2">
            <VChip
              :color="getStatusColor(item.status)"
              class="font-weight-medium"
              text-color="white"
              size="small"
            >
              <VIcon start small>{{ getStatusIcon(item.status) }}</VIcon>
              {{ getStatusText(item.status) }}
            </VChip>
          </div>
        </div>

        <VSelect
          v-model="selectedStatus"
          :items="statusOptions"
          item-title="label"
          item-value="value"
          label="Выберите новый статус"
          density="comfortable"
          variant="outlined"
          clearable
          class="rounded-lg"
          prepend-inner-icon="mdi-flag-outline"
        />

        <div v-if="selectedStatus" class="mt-4 text-center">
          <span class="text-body-2 mb-2 d-block">Выбранный статус:</span>
          <VChip
            :color="getStatusColor(selectedStatus)"
            size="large"
            text-color="white"
            class="font-weight-bold px-4"
          >
            <VIcon start small>{{ getStatusIcon(selectedStatus) }}</VIcon>
            {{ getStatusText(selectedStatus) }}
          </VChip>
        </div>
      </VCardText>

      <VDivider class="my-2" />

      <VCardActions class="justify-end">
        <VBtn variant="text" color="error" @click="closeDialog">
          <VIcon start small>mdi-close-circle</VIcon> Отмена
        </VBtn>
        <VBtn
          color="primary"
          class="px-4"
          :disabled="!selectedStatus"
          @click="confirmChange"
        >
          <VIcon start small>mdi-check-circle</VIcon> Сохранить
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: Boolean,
  currentTab: String,
  item: Object
});

const emit = defineEmits(["update:modelValue", "update-status"]);

const model = computed({
  get: () => props.modelValue,
  set: val => emit("update:modelValue", val)
});

const selectedStatus = ref(null);

const statusOptions = computed(() => {
  const map = {
    planned: [
      { label: "Допущен", value: "admitted" },
      { label: "Отменён", value: "canceled" }
    ],
    admitted: [
      { label: "Госпитализирован", value: "hospitalized" },
      { label: "Отменён", value: "canceled" }
    ],
    hospitalized: [{ label: "Отменён", value: "canceled" }],
    canceled: [{ label: "Планируется", value: "planned" }]
  };
  return map[props.currentTab] || [];
});

const confirmChange = () => {
  if (!selectedStatus.value) return;
  emit("update-status", {
    id: props.item.id,
    status: selectedStatus.value
  });
  closeDialog();
};

const closeDialog = () => {
  emit("update:modelValue", false);
  selectedStatus.value = null;
};

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
      return "Отменён";
    default:
      return "Неизвестно";
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
.text-subtitle-2 {
  font-weight: 600;
}
</style>
