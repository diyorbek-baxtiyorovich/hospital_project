<script setup>
import { ref } from "vue";
import { addDepartment } from "@/service/departement.servise.js";

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "refresh"]);

const form = ref(null);
const loading = ref(false);
const formData = ref({ name: "", default_quota: 5 });

async function saveDepartment() {
  const valid = await form.value.validate();
  if (!valid.valid) return;
  loading.value = true;
  try {
    await addDepartment(formData.value);
    toast.success("Departament muvaffaqiyatli qo'shildi!");
    emit("refresh");
    emit("update:modelValue", false);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <VDialog v-model="props.modelValue" max-width="600" persistent>
    <VCard class="pa-4">
      <VCardTitle>Yangi departament qo‘shish</VCardTitle>

      <VForm ref="form">
        <VTextField
          v-model="formData.name"
          label="Departament nomi"
          :rules="[v => !!v || 'Majburiy maydon']"
          class="mb-5"
        />
        <VTextField
          v-model.number="formData.default_quota"
          label="Default kvota"
          type="number"
          :rules="[v => v >= 0 || '0 dan kichik bo‘lmasin']"
        />
      </VForm>

      <VCardActions>
        <VSpacer />
        <VBtn text @click="emit('update:modelValue', false)">Bekor</VBtn>
        <VBtn color="primary" :loading="loading" @click="saveDepartment">
          Saqlash
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
