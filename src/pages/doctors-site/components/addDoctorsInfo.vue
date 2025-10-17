<script setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { addDoctors } from "@/service/doctors.servise.js";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  departmentList: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["update:modelValue", "added"]);
const toast = useToast();
const form = ref(null);
const dialog = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => {
    dialog.value = val;
  }
);

watch(dialog, val => {
  emit("update:modelValue", val);
});

const doctorForm = ref({
  username: "",
  full_name: "",
  department_id: null,
  speciality: "",
  password: ""
});

function closeDialog() {
  dialog.value = false;
}

async function onAdd() {
  const { valid } = await form.value.validate();
  if (!valid) return;

  const payload = { ...doctorForm.value };

  try {
    const result = await addDoctors(payload);
    if (result?.status === 200 || result?.status === 201) {
      toast.success("Врач успешно добавлен!");
      emit("added");
      closeDialog();
    } else {
      toast.error(result?.data?.detail || "Произошла ошибка при добавлении");
    }
  } catch (error) {
    console.error(error);
    toast.error("Ошибка при подключении к серверу");
  }
}
</script>

<template>
  <VDialog v-model="dialog" max-width="800">
    <VCard class="pa-4">
      <VCardTitle>
        <VIcon class="me-2" color="primary">
          mdi-doctor
        </VIcon>
        Добавить врача
      </VCardTitle>

      <VDivider class="mb-4" />

      <VForm ref="form" @submit.prevent="onAdd">
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="doctorForm.full_name"
              label="Полное имя"
              prepend-inner-icon="mdi-account"
              required
              :rules="[v => !!v || 'Обязательное поле']"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="doctorForm.username"
              label="Имя пользователя"
              prepend-inner-icon="mdi-account-circle-outline"
              required
              :rules="[v => !!v || 'Обязательное поле']"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VAutocomplete
              v-model="doctorForm.department_id"
              :items="props.departmentList"
              item-title="name"
              item-value="id"
              label="Отделение"
              prepend-inner-icon="mdi-hospital-building"
              clearable
              required
              :rules="[v => !!v || 'Выберите отделение']"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="doctorForm.speciality"
              label="Специальность"
              prepend-inner-icon="mdi-stethoscope"
              required
              :rules="[v => !!v || 'Обязательное поле']"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="doctorForm.password"
              label="Пароль"
              type="password"
              prepend-inner-icon="mdi-lock"
              required
              :rules="[v => !!v || 'Обязательное поле']"
            />
          </VCol>
        </VRow>

        <VCardActions class="d-flex justify-end mt-4">
          <VBtn color="error" @click="closeDialog">
            <VIcon left>
              mdi-close
            </VIcon>
            Отмена
          </VBtn>
          <VBtn color="success" type="submit">
            <VIcon left>
              mdi-content-save
            </VIcon>
            Сохранить
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template>
