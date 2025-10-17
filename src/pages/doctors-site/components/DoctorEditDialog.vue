<script setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { updateDoctors } from "@/service/doctors.servise.js";

const props = defineProps({
  editDialog: {
    type: Boolean,
    default: false
  },
  editingItem: {
    type: Object,
    default: () => ({})
  },
  departmentList: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["updated", "update:editDialog"]);
const toast = useToast();
const form = ref(null);

const doctorForm = ref({
  username: "",
  full_name: "",
  department_id: null,
  speciality: "",
  password: ""
});

function closeDialog() {
  emit("update:editDialog", false);
  form.value?.reset();
}

watch(
  () => props.editDialog,
  newValue => {
    if (newValue && props.editingItem) {
      const item = props.editingItem;
      doctorForm.value = {
        username: item?.username || "",
        full_name: item?.full_name || "",
        department_id: item?.department_id || null,
        speciality: item?.speciality || "",
        password: ""
      };
    }
  }
);

async function onUpdate() {
  const { valid } = await form.value.validate();
  if (!valid) return;

  const payload = {
    username: doctorForm.value.username,
    full_name: doctorForm.value.full_name,
    department_id: doctorForm.value.department_id,
    speciality: doctorForm.value.speciality
  };

  if (doctorForm.value.password) {
    payload.password = doctorForm.value.password;
  }

  try {
    const result = await updateDoctors(props.editingItem.id, payload);

    if (result?.status === 200) {
      toast.success("Данные врача успешно обновлены!");
      emit("updated");
      closeDialog();
    } else {
      toast.error(result?.data?.detail || "Ошибка при обновлении");
    }
  } catch (error) {
    console.error(error);
    toast.error("Ошибка при подключении к серверу");
  }
}
</script>

<template>
  <VDialog v-model="props.editDialog" max-width="600">
    <VCard class="pa-4">
      <VCardTitle>
        <v-icon class="me-2" color="primary">mdi-account-edit</v-icon>
        Редактировать данные врача
      </VCardTitle>
      <VDivider class="mb-4" />

      <VForm ref="form" @submit.prevent="onUpdate">
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
              label="Новый пароль (необязательно)"
              type="password"
              prepend-inner-icon="mdi-lock-reset"
            />
          </VCol>
        </VRow>

        <VCardActions class="d-flex justify-end mt-4">
          <VBtn color="error" @click="closeDialog">
            <v-icon left>mdi-close</v-icon>
            Отмена
          </VBtn>
          <VBtn color="success" type="submit">
            <v-icon left>mdi-content-save-edit</v-icon>
            Сохранить
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template>
