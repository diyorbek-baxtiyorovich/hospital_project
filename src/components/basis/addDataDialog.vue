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
              />
            </VCol>

            <VCol cols="12" md="6">
              <VMenu
                v-model="birthMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template #activator="{ props }">
                  <div v-bind="props">
                    <VTextField
                      :model-value="formatDate(form.birth_date)"
                      label="🎂 Дата рождения"
                      variant="outlined"
                      density="comfortable"
                      readonly
                      clearable
                      prepend-inner-icon="mdi-cake-variant"
                      @click:clear="form.birth_date = null"
                    />
                  </div>
                </template>

                <VDatePicker
                  v-model="form.birth_date"
                  color="primary"
                  @update:model-value="birthMenu = false"
                />
              </VMenu>
            </VCol>

            <VCol cols="12" md="6">
              <VMenu
                v-model="appointmentMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template #activator="{ props }">
                  <div v-bind="props">
                    <VTextField
                      :model-value="formatDate(form.date)"
                      label="📅 Дата приёма"
                      variant="outlined"
                      density="comfortable"
                      readonly
                      clearable
                      prepend-inner-icon="mdi-calendar"
                      @click:clear="form.date = null"
                    />
                  </div>
                </template>

                <VDatePicker
                  v-model="form.date"
                  color="primary"
                  @update:model-value="appointmentMenu = false"
                />
              </VMenu>
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
  date: new Date(),
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
    ...form,
    date: formatDate(form.date),
    birth_date: formatDate(form.birth_date)
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
