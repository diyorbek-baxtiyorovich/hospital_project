<script setup>
import {ref} from "vue"
import {useToast} from "vue-toastification"
import {useRbacRoleStore} from "@/stores/rbac"
import {storeToRefs} from "pinia"

const rbacRulesStore = useRbacRoleStore()
const toast = useToast()

const {currentRole} = storeToRefs(rbacRulesStore)

// Ссылка на форму для вызова методов reset() и validate()
const form = ref(null)

// Правила валидации для поля "name"
const nameRules = [
  v => !!v || "Name тўлиқ исмини киритинг",
]

// Правила валидации для поля "level"
const levelRules = [
  v => !!v || "Level тўлдирилиши шарт",
  v => !isNaN(v) || "Level рақам бўлиши керак",
]

// Функция для отмены редактирования роли: сбрасываем текущую роль,
// сбрасываем форму и закрываем диалог редактирования
function cancelEditingRole() {
  rbacRulesStore.isEditingRole = false
  currentRole.value = {} // сбрасываем объект роли
  if (form.value) form.value.reset()
}

// Функция отправки изменений роли
async function submitRole() {
  // Используем метод validate() VForm, который возвращает true/false
  if (!form.value.validate()) {
    return
  }

  const result = await rbacRulesStore.update(currentRole.value)
  if (result) {
    toast.success("Muvofiqiyatli yangilandi.")
    cancelEditingRole()
  }
}
</script>

<template>
  <VDialog
    :model-value="rbacRulesStore.isEditingRole"
    class="scrollable-content"
    persistent
    scrollable
    width="1024"
  >
    <VCard flat>
      <VCardItem>
        <VCardTitle
          color="primary"
          dark
          height="64"
        >
          Фойдаланувчи маълумотларига ўзгартириш киритиш
        </VCardTitle>
        <template #append>
          <VBtn
            icon
            @click="cancelEditingRole"
          >
            <VIcon
              icon="tabler-x"
              size="18"
            />
          </VBtn>
        </template>
      </VCardItem>

      <VCardText>
        <VCard flat>
          <VCardText>
            <!-- Форма редактирования роли -->
            <VForm
              ref="form"
              @submit.prevent="submitRole"
            >
              <VRow>
                <VCol cols="12">
                  <VTextField
                    id="level"
                    v-model="currentRole.level"
                    :rules="levelRules"
                    density="compact"
                    label="Level of role"
                    name="level"
                    outlined
                    required
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    id="name"
                    v-model="currentRole.name"
                    :rules="nameRules"
                    density="compact"
                    label="Name"
                    name="name"
                    outlined
                    required
                  />
                </VCol>
              </VRow>

              <VRow>
                <VCol cols="12">
                  <VBtn
                    class="mt-5"
                    color="primary"
                    type="submit"
                  >
                    Сақлаш
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCardText>
    </VCard>
  </VDialog>
</template>
