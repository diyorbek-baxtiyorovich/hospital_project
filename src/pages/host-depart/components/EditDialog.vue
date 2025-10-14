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
      is_active: formData.value.is_active
    };

    const res = await updateDepartment(props.item.id, payload);

    if (res?.status === 200 || res?.status === 201) {
      toast.success("Departament muvaffaqiyatli yangilandi!");
      emit("refresh");
      emit("update:modelValue", false);
    } else {
      toast.error("Yangilashda xatolik yuz berdi!");
    }
  } catch (err) {
    toast.error("Server bilan bog‘lanishda xatolik!");
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <VDialog v-model="props.modelValue" max-width="600" persistent>
    <VCard class="pa-4">
      <VCardTitle class="text-h6 mb-4">Default kvotani tahrirlash</VCardTitle>

      <VForm ref="form">
        <VTextField
          v-model="formData.name"
          label="Departament nomi"
          variant="outlined"
          class="mb-5"
        />

        <VTextField
          v-model.number="formData.default_quota"
          label="Default kvota"
          type="number"
          :rules="[v => v >= 0 || '0 dan kichik bo‘lmasin']"
          variant="outlined"
        />
      </VForm>

      <VCardActions>
        <VSpacer />
        <VBtn text @click="emit('update:modelValue', false)">Bekor</VBtn>
        <VBtn color="primary" :loading="loading" @click="saveChanges">
          Saqlash
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
