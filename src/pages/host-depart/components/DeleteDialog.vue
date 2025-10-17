<script setup>
import { ref } from "vue";
import { deleteDepartment } from "@/service/departement.servise.js";
import { useToast } from "vue-toastification";

const props = defineProps({
  modelValue: Boolean,
  item: Object
});

const emit = defineEmits(["update:modelValue", "refresh"]);

const loading = ref(false);
const toast = useToast();

async function confirmDelete() {
  loading.value = true;
  try {
    await deleteDepartment(props.item.department_id);
    toast.success("Отдел успешно удалён!");
    emit("refresh");
    emit("update:modelValue", false);
  } catch (error) {
    toast.error("Произошла ошибка при удалении отдела!");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <VDialog v-model="props.modelValue" max-width="500" persistent>
    <VCard class="pa-4">
      <VCardTitle class="text-center">
        Вы уверены, что хотите удалить эту запись?
      </VCardTitle>

      <VCardText>
        <div><b>Название:</b> {{ props.item?.name }}</div>
        <div><b>Квота:</b> {{ props.item?.default_quota }}</div>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn text @click="emit('update:modelValue', false)">Отмена</VBtn>
        <VBtn color="error" :loading="loading" @click="confirmDelete">
          Удалить
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
