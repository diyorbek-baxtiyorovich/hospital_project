<script setup>
import { ref } from "vue";
import { addDepartment } from "@/service/departement.servise.js";
import { useToast } from "vue-toastification";

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "refresh"]);

const form = ref(null);
const loading = ref(false);
const toast = useToast();

const formData = ref({ name: "", default_quota: 5 });

async function saveDepartment() {
  const valid = await form.value.validate();
  if (!valid.valid) return;
  loading.value = true;
  try {
    await addDepartment(formData.value);
    toast.success("Отдел успешно добавлен!");
    emit("refresh");
    emit("update:modelValue", false);
  } catch (error) {
    toast.error("Произошла ошибка при добавлении отдела!");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <VDialog v-model="props.modelValue" max-width="600" persistent>
    <VCard class="pa-4">
      <VCardTitle>Добавить новый отдел</VCardTitle>

      <VForm ref="form">
        <VTextField
          v-model="formData.name"
          label="Название отдела"
          :rules="[v => !!v || 'Обязательное поле']"
          class="mb-5"
        />
        <VTextField
          v-model.number="formData.default_quota"
          label="Квота по умолчанию"
          type="number"
          :rules="[v => v >= 0 || 'Не может быть меньше 0']"
        />
      </VForm>

      <VCardActions>
        <VSpacer />
        <VBtn text @click="emit('update:modelValue', false)">Отмена</VBtn>
        <VBtn color="primary" :loading="loading" @click="saveDepartment">
          Сохранить
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
