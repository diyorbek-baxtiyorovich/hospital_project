<script setup>
import { ref } from "vue";
import { deleteDepartment } from "@/service/departement.servise.js";

const props = defineProps({
  modelValue: Boolean,
  item: Object
});
const emit = defineEmits(["update:modelValue", "refresh"]);

const loading = ref(false);

async function confirmDelete() {
  loading.value = true;
  try {
    await deleteDepartment(props.item.department_id);
    emit("refresh");
    emit("update:modelValue", false);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <VDialog v-model="props.modelValue" max-width="500" persistent>
    <VCard class="pa-4">
      <VCardTitle class="text-center">
        Ushbu ma'lumotni o‘chirishni tasdiqlaysizmi?
      </VCardTitle>

      <VCardText>
        <div><b>Nom:</b> {{ props.item?.name }}</div>
        <div><b>Kvota:</b> {{ props.item?.default_quota }}</div>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn text @click="emit('update:modelValue', false)">Bekor</VBtn>
        <VBtn color="error" :loading="loading" @click="confirmDelete">
          Tasdiqlash
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
