<template>
  <VDialog
    v-model="isOpen"
    max-width="1200"
    transition="dialog-bottom-transition"
  >
    <VCard>
      <VToolbar flat color="primary" dark>
        <VToolbarTitle class="text-h6 font-weight-medium text-white">
          Детали приёма
        </VToolbarTitle>
        <VSpacer />
        <VBtn variant="text" icon @click="isOpen = false">
          <VIcon color="white">mdi-close</VIcon>
        </VBtn>
      </VToolbar>

      <VCardText class="pa-6">
        <VContainer fluid>
          <VRow>
            <VCol cols="12">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Информация о пациенте
              </div>
              <VDivider />
            </VCol>

            <VCol cols="12" sm="6">
              <div class="info-label">
                Ф.И.О:
              </div>
              <div class="info-value">
                {{ data.patient_fullname }}
              </div>
            </VCol>
            <VCol cols="12" sm="6">
              <div class="info-label">
                Дата рождения:
              </div>
              <div class="info-value">
                {{ formatDate(data.birth_date) }}
              </div>
            </VCol>

            <VCol cols="12" sm="6">
              <div class="info-label">
                Телефон:
              </div>
              <div class="info-value">
                {{ data.phone }}
              </div>
            </VCol>
            <VCol cols="12" sm="6">
              <div class="info-label">
                Отделение:
              </div>
              <div class="info-value">
                {{ data.department?.name }}
              </div>
            </VCol>

            <VCol cols="12" sm="6">
              <div class="info-label">
                Врач:
              </div>
              <div class="info-value">
                {{ data.doctor_name_text }}
              </div>
            </VCol>
            <VCol cols="12" sm="6">
              <div class="info-label">
                Дата приёма:
              </div>
              <div class="info-value">
                {{ formatDate(data.date) }} (Слот №{{ data.slot_no }})
              </div>
            </VCol>

            <VCol cols="12">
              <div class="info-label">
                Диагноз:
              </div>
              <div class="info-value">
                {{ data.diagnosis }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="info-label">
                Цель визита:
              </div>
              <div class="info-value">
                {{ data.purpose }}
              </div>
            </VCol>
          </VRow>

          <VDivider class="my-4" />

          <VRow>
            <VCol cols="12">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Примечания
              </div>
              <VDivider />
            </VCol>

            <VCol cols="12">
              <div class="info-label text-red-darken-2">
                Для главного врача:
              </div>
              <div class="info-value">
                {{ data.note_for_head }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="info-label text-blue-darken-2">
                Заметка для пациента:
              </div>
              <div class="info-value">
                {{ data.note_public }}
              </div>
            </VCol>
          </VRow>

          <VDivider class="my-4" />

          <VRow>
            <VCol cols="12">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Системная информация
              </div>
              <VDivider />
            </VCol>

            <VCol cols="12" sm="6">
              <div class="info-label">
                Создано:
              </div>
              <div class="info-value">
                {{ formatDateTime(data.created_at) }}
              </div>
            </VCol>

            <VCol cols="12" sm="6">
              <div class="info-label">
                Обновлено:
              </div>
              <div class="info-value">
                {{ formatDateTime(data.updated_at) }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="info-label">
                Пользователь, создавший запись:
              </div>
              <div class="info-value">
                {{ data.created_by_user?.full_name || "неизвестно" }}
                {{ data.created_by_user?.user?.username || "неизвестно" }}
              </div>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VDivider />
      <VCardActions class="pa-4 justify-end">
        <VBtn variant="outlined" color="primary" @click="isOpen = false">
          Закрыть
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  data: { type: Object, required: true }
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  v => (isOpen.value = v)
);
watch(isOpen, v => emit("update:modelValue", v));

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function formatDateTime(datetime) {
  if (!datetime) return "-";

  return new Date(datetime).toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
</script>

<style scoped>
.info-label {
  color: #757575;
  font-size: 0.9rem;
}

.info-value {
  color: #212121;
  font-size: 1rem;
  font-weight: 500;
  margin-block-end: 12px;
}

.v-card {
  background-color: #fafafa;
}
</style>
