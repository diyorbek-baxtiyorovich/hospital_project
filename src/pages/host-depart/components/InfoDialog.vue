<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Boolean,
  item: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(["update:modelValue"]);

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
        Departament ma’lumotlari
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
            <strong>Id:</strong><br />
            <span>{{ props.item.department_id }}</span>
          </VSheet>
        </VCol>

        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>Asosiy kvota:</strong><br />
            <span>{{ props.item.base_slots }}</span>
          </VSheet>
        </VCol>

        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>Qo‘shimcha kvota:</strong><br />
            <span>{{ props.item.extra_slots }}</span>
          </VSheet>
        </VCol>

        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>Sana:</strong><br />
            <span>{{ formattedDate }}</span>
          </VSheet>
        </VCol>

        <VCol cols="12" md="6">
          <VSheet class="pa-3 rounded-lg bg-grey-lighten-4">
            <strong>Yangilangan sana:</strong><br />
            <span>{{ formattedUpdatedAt }}</span>
          </VSheet>
        </VCol>
      </VRow>

      <VDivider class="my-4" />

      <div class="d-flex justify-end">
        <VBtn
          color="primary"
          variant="flat"
          @click="emit('update:modelValue', false)"
        >
          Yopish
        </VBtn>
      </div>
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
