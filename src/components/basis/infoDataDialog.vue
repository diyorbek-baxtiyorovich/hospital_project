<template>
  <VDialog
    v-model="isOpen"
    max-width="1200"
    transition="dialog-bottom-transition"
  >
    <VCard>
      <!-- Header -->
      <VToolbar
        flat
        color="primary"
        dark
      >
        <VToolbarTitle class="text-h6 font-weight-medium text-white">
          Qabul tafsilotlari
        </VToolbarTitle>
        <VSpacer />
        <VBtn
          variant="text"
          @click="isOpen = false"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VToolbar>

      <VCardText class="pa-6">
        <VContainer fluid>
          <VRow>
            <VCol cols="12">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Bemor ma’lumotlari
              </div>
              <VDivider />
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="info-label">
                F.I.SH:
              </div>
              <div class="info-value">
                {{ data.patient_fullname }}
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <div class="info-label">
                Tug‘ilgan sana:
              </div>
              <div class="info-value">
                {{ formatDate(data.birth_date) }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="info-label">
                Telefon:
              </div>
              <div class="info-value">
                {{ data.phone }}
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <div class="info-label">
                Bo‘lim:
              </div>
              <div class="info-value">
                {{ data.department?.name }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="info-label">
                Shifokor:
              </div>
              <div class="info-value">
                {{ data.doctor_name_text }}
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <div class="info-label">
                Qabul sanasi:
              </div>
              <div class="info-value">
                {{ formatDate(data.date) }} (Slot №{{ data.slot_no }})
              </div>
            </VCol>

            <VCol cols="12">
              <div class="info-label">
                Tashxis:
              </div>
              <div class="info-value">
                {{ data.diagnosis }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="info-label">
                Maqsad:
              </div>
              <div class="info-value">
                {{ data.purpose }}
              </div>
            </VCol>
          </VRow>

          <VDivider class="my-4" />

          <VRow>
            <VCol cols="12">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Izohlar
              </div>
              <VDivider />
            </VCol>

            <VCol cols="12">
              <div class="info-label text-red-darken-2">
                Bosh shifokor uchun:
              </div>
              <div class="info-value">
                {{ data.note_for_head }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="info-label text-blue-darken-2">
                Bemor uchun eslatma:
              </div>
              <div class="info-value">
                {{ data.note_public }}
              </div>
            </VCol>
          </VRow>

          <VDivider class="my-4" />

          <VRow>
            <VCol cols="12">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Tizim ma’lumotlari
              </div>
              <VDivider />
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="info-label">
                Yaratilgan:
              </div>
              <div class="info-value">
                {{ formatDateTime(data.created_at) }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="info-label">
                Yangilangan:
              </div>
              <div class="info-value">
                {{ formatDateTime(data.updated_at) }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="info-label">
                Yaratgan foydalanuvchi:
              </div>
              <div class="info-value">
                {{ data.created_by_user?.full_name }}
                ({{ data.created_by_user?.user?.username }})
              </div>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VDivider />
      <VCardActions class="pa-4 justify-end">
        <VBtn
          variant="outlined"
          color="primary"
          @click="isOpen = false"
        >
          Yopish
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  modelValue: Boolean,
  data: { type: Object, required: true },
})

const emit = defineEmits(["update:modelValue"])

const isOpen = ref(props.modelValue)

watch(() => props.modelValue, v => (isOpen.value = v))
watch(isOpen, v => emit("update:modelValue", v))

function formatDate(date) {
  if (!date) return "-"
  
  return new Date(date).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatDateTime(datetime) {
  if (!datetime) return "-"
  
  return new Date(datetime).toLocaleString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
</script>

<style scoped>
.info-label {
  color: #757575;
  font-size: 0.9rem;
}

.info-value {
  color: #212121;
  font-size: 1rem;
  font-weight: 500;
  margin-block-end: 12px;
}

.v-card {
  background-color: #fafafa;
}
</style>
