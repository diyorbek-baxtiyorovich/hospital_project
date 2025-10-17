<script setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { updateDepartment } from "@/service/departement.servise.js";

const props = defineProps({
  modelValue: Boolean,
  item: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(["update:modelValue", "refresh"]);

const toast = useToast();
const form = ref(null);
const loading = ref(false);
const formData = ref({
  name: "",
  default_quota: 0,
  is_active: true
});

watch(
  () => props.item,
  val => {
    if (val) {
      formData.value = {
        name: val.name || "",
        default_quota: val.default_quota || 0,
        is_active: val.is_active ?? true
      };
    }
  },
  { immediate: true }
);

async function saveChanges() {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    const payload = {
      name: formData.value.name,
      default_quota: Number(formData.value.default_quota),
      // is_active: formData.value.is_active
      is_active: true
    };

    const res = await updateDepartment(props.item.department_id, payload);

    if (res?.status === 200 || res?.status === 201) {
      toast.success("Департамент успешно обновлён!");
      emit("refresh");
      emit("update:modelValue", false);
    } else {
      toast.error("Произошла ошибка при обновлении!");
    }
  } catch (err) {
    toast.error("Ошибка соединения с сервером!");
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <VDialog v-model="props.modelValue" max-width="600" persistent>
    <VCard class="pa-4">
      <VCardTitle class="text-h6 mb-4">
        Редактирование стандартной квоты
      </VCardTitle>

      <VForm ref="form">
        <VTextField
          v-model="formData.name"
          label="Название департамента"
          variant="outlined"
          class="mb-5"
          :rules="[v => !!v || 'Обязательное поле']"
        />

        <VTextField
          v-model.number="formData.default_quota"
          label="Стандартная квота"
          type="number"
          variant="outlined"
          :rules="[v => v >= 0 || 'Не может быть меньше 0']"
          class="mb-5"
        />
      </VForm>

      <VCardActions>
        <VSpacer />
        <VBtn text @click="emit('update:modelValue', false)">Отмена</VBtn>
        <VBtn color="primary" :loading="loading" @click="saveChanges">
          Сохранить
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
