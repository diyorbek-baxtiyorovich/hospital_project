<script setup>
import { useRbacRoleStore } from "@/stores/rbac"
import { reactive, ref } from "vue"
import { useToast } from "vue-toastification"

const rbacRulesStore = useRbacRoleStore()
const toast = useToast()

// Объект для создания роли
const newRole = reactive({
  id: 0,
  name: "",
  level: 0,
})

const rbacRuleStore = useRbacRoleStore()

// Правила валидации для поля level
const levelRules = [
  v => !!v || "Level тўлдирилиши шарт",

  // Здесь можно добавить дополнительные проверки, например, что значение – число
  v => !isNaN(v) || "Level рақам бўлиши керак",
]

// Правила валидации для поля name
const nameRules = [
  v => !!v || "Name тўлиқ исмини киритинг",

  // Можно добавить и другие проверки при необходимости
]

// Ссылка на форму, чтобы можно было вызвать метод validate() и reset()
const form = ref(null)

// Функция отмены создания роли
function cancelCreatingUser() {
  rbacRulesStore.isCreatingRole = false
  if (form.value) {
    form.value.reset()
  }
}

// Функция отправки формы
async function submitUser() {
  // Валидируем форму, используя встроенный метод в Vuetify (VForm)
  if (!form.value.validate()) {
    return
  }

  const result = await rbacRulesStore.createRole(newRole)

  toast.success("Фойдаланувчи мувофаққиятли қўшилди")
  rbacRulesStore.isCreatingRole = false
  form.value.reset()


  await rbacRuleStore.fetchRbacRole()
  await rbacRuleStore.fetchRbacPermissions()
}
</script>

<template>
  <VDialog
    :model-value="rbacRulesStore.isCreatingRole"
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
          Yangi Role qo'shish
        </VCardTitle>
        <template #append>
          <VBtn
            icon
            @click="cancelCreatingUser"
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
            <!-- Форма с валидацией -->
            <VForm
              ref="form"
              @submit.prevent="submitUser"
            >
              <VRow>
                <VCol cols="12">
                  <VTextField
                    id="level"
                    v-model="newRole.level"
                    :rules="levelRules"
                    density="compact"
                    label="Level"
                    name="level"
                    outlined
                    required
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    id="name"
                    v-model="newRole.name"
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
                    Qo'shish
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
