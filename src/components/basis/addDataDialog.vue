<template>
  <VDialog
    v-model="model"
    max-width="800"
    persistent
    transition="dialog-bottom-transition"
  >
    <VCard class="rounded-2xl elevation-6">
      <VCardTitle
        class="d-flex justify-space-between align-center py-4 px-6 bg-primary  rounded-t-2xl"
      >
        <span class="text-h6 text-white font-weight-bold">
          <VIcon>mdi-stethoscope</VIcon>
          Добавить данные нового приёма
        </span>
        <VBtn
          icon="mdi-close"
          variant="text"
          color="white"
          @click="closeDialog"
        />
      </VCardTitle>

      <VCardText class="py-6 px-6">
        <VContainer>
          <VRow dense>
            <VCol cols="12" md="6">
              <VTextField
                v-model="form.patient_fullname"
                label="👤 Ф.И.О. пациента"
                variant="outlined"
                density="comfortable"
                clearable
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="form.phone"
                label="📞 Номер телефона"
                type="tel"
                variant="outlined"
                density="comfortable"
                clearable
                placeholder="+7 (___) ___-__-__"
                @input="formatPhone"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="form.birth_date"
                label="🎂 Дата рождения"
                variant="outlined"
                density="comfortable"
                clearable
                type="text"
                prepend-inner-icon="mdi-cake-variant"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="form.date"
                label="📅 Дата приёма"
                variant="outlined"
                density="comfortable"
                clearable
                type="text"
                placeholder="YYYY-MM-DD"
                prepend-inner-icon="mdi-calendar"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="form.doctor_name_text"
                label="👨‍⚕️ Врач (текст)"
                variant="outlined"
                density="comfortable"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="form.diagnosis"
                label="🧠 Диагноз"
                variant="outlined"
                density="comfortable"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="form.purpose"
                label="🎯 Цель приёма"
                variant="outlined"
                density="comfortable"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="form.note_public"
                label="📝 Общий комментарий"
                variant="outlined"
                density="comfortable"
              />
            </VCol>

            <VCol cols="12">
              <VTextarea
                v-model="form.note_for_head"
                label="📋 Комментарий для руководителя"
                variant="outlined"
                auto-grow
                rows="2"
                clearable
              />
            </VCol>

            <VCol cols="12" md="4">
              <VSelect
                v-model="form.department_id"
                :items="agentList"
                item-title="name"
                item-value="id"
                label="🏢 Отделение"
                variant="outlined"
                density="comfortable"
                clearable
                prepend-inner-icon="mdi-office-building"
              />
            </VCol>

            <VCol cols="12" md="4">
              <VSelect
                v-model="form.doctor_id"
                :items="doctorsList"
                item-title="full_name"
                item-value="id"
                label="👨‍⚕️ Врач"
                variant="outlined"
                density="comfortable"
                clearable
                prepend-inner-icon="mdi-stethoscope"
              />
            </VCol>

            <VCol cols="12" md="4">
              <VTextField
                v-model.number="form.slot_no"
                label="⏰ Номер слота"
                type="number"
                variant="outlined"
                density="comfortable"
              />
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>

      <VCardActions class="px-6 pb-6 d-flex justify-end">
        <VBtn variant="tonal" color="grey" class="mr-3" @click="closeDialog">
          Отмена
        </VBtn>
        <VBtn
          color="primary"
          class="px-6"
          prepend-icon="mdi-content-save"
          @click="submitForm"
        >
          Сохранить
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { getDoctors } from "@/service/doctors.servise.js";
import { getDepartmentsAll } from "@/service/departement.servise.js";

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "submit"]);

const model = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => (model.value = val)
);
watch(model, val => emit("update:modelValue", val));

const birthMenu = ref(false);
const appointmentMenu = ref(false);

const doctorsList = ref([]);
const agentList = ref([]);

const form = reactive({
  department_id: null,
  date: getTodayDate(),
  slot_no: null,
  doctor_id: null,
  patient_fullname: "",
  birth_date: null,
  diagnosis: "",
  phone: "",
  purpose: "",
  doctor_name_text: "",
  note_for_head: "",
  note_public: ""
});

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatPhone() {
  let value = form.phone.replace(/\D/g, "");
  if (!value.startsWith("7")) {
    value = "7" + value;
  }
  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  const parts = [
    value.slice(1, 4),
    value.slice(4, 7),
    value.slice(7, 9),
    value.slice(9, 11)
  ];

  form.phone = `+7 (${parts[0] || ""}) ${parts[1] || ""}${
    parts[2] ? "-" + parts[2] : ""
  }${parts[3] ? "-" + parts[3] : ""}`;
}

async function doctorsData() {
  try {
    doctorsList.value = await getDoctors();
  } catch (error) {
    console.error("Ошибка при получении списка врачей:", error);
  }
}

async function departamentData() {
  try {
    agentList.value = await getDepartmentsAll();
  } catch (err) {
    console.log("Departamentlar yuklanishda xatolik yuz berdi", err);
  }
}
function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function closeDialog() {
  model.value = false;
}

function submitForm() {
  const payload = {
    ...form
  };

  emit("submit", payload);
  closeDialog();
}

onMounted(() => {
  doctorsData();
  departamentData();
});
</script>

<style scoped>
.v-card {
  background-color: #fff;
}

.v-text-field,
.v-textarea {
  border-radius: 12px;
}

.v-card-title {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.v-card-actions {
  border-top: 1px solid #f2f2f2;
}
</style>
