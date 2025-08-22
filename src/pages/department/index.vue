<script setup>
import {onMounted, ref} from 'vue'
import {useDepartmentStore} from '@/stores/departmentStore.js'
import {deleteDepartment, getDepartments} from '@/service/departmentService.js'
import {useToast} from "vue-toastification"
import CreateDepartment from "@/pages/department/components/CreateDepartment.vue"
import UpdateDepartment from "@/pages/department/components/UpdateDepartment.vue"
import checkPermission from "@/utils/checkPermission.js";

const toast = useToast()
const departmentStore = useDepartmentStore()

const loading = ref(false)
const departmentList = ref([])
const search = ref(null)

async function getDepartmentList() {
  loading.value = true

  const data = await getDepartments()

  loading.value = false
  if (data?.length) {
    departmentList.value = data
  }
}

const confirmDialog = ref(false)
const updatingItem = ref(null)
const loadingBtn = ref(false)

function handleConfirmDialog(item) {
  updatingItem.value = item
  confirmDialog.value = true
}

async function confirmDelete() {
  loadingBtn.value = true

  const result = await deleteDepartment(updatingItem.value.id)

  loadingBtn.value = false
  if (result.status === 200) {
    toast.success('Muvofaqqiyatli o\'chirildi')
  }
  confirmDialog.value = false
  await getDepartmentList()

}

const updateDialog = ref(false)

function handleUpdateDialog(item) {
  updatingItem.value = null
  updatingItem.value = item
  updateDialog.value = true
}

onMounted(() => {
  getDepartmentList()
})
</script>


<template>
  <UpdateDepartment
    v-model:update-dialog="updateDialog"
    :update-dialog="updateDialog"
    :updating-item="updatingItem"
    @updated="getDepartmentList"
  />
  <VCard flat>
    <VRow class="ma-2">
      <VCol
        cols="12"
        md="6"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Departamentlar ro'yxati
        </VCardTitle>
      </VCol>
      <VCol
        class="d-flex"
        cols="12"
        md="6"
      >
        <VTextField
          v-model="search"
          density="compact"
          hide-details
          label="qidirish..."
          prepend-inner-icon="mdi-magnify"
        />
        <CreateDepartment @created="getDepartmentList"/>
      </VCol>
    </VRow>


    <VDivider/>
    <VDataTableVirtual
      v-model:search="search"
      :filter-keys="['department_name']"
      :headers="departmentStore.headers"
      :items="departmentList"
      :loading="loading"
      fixed-header
      height="71vh"
      loading-text="ma'lumotlar yuklanmoqda"
      no-data-text="ma'lumot topilmadi"
    >
      <template #item.id="{ item, index }">
        {{ index + 1 }}
      </template>
      <template #item.actions="{ item }">
        <div>
          <VBtn
            color="warning"
            density="default"
            icon="mdi-pencil-circle"
            size="x-large"
            variant="plain"
            @click="handleUpdateDialog(item)"
          />
          <VBtn

            color="error"
            density="default"
            icon="mdi-delete"
            size="x-large"
            variant="plain"
            @click="handleConfirmDialog(item)"
          />
        </div>
      </template>
    </VDataTableVirtual>

    <VDialog
      v-model="confirmDialog"
      max-width="600"
      persistent
    >
      <VCard class="pa-4">
        <VCardTitle class="text-center mb-4 font-weight-bold">
          Ushbu ma'lumotni o'chirishni tasdiqlaysizmi?
        </VCardTitle>
        <VRow class="mb-4">
          <VCol
            cols="12"
            md="12"
          >
            <VTextField
              v-model="updatingItem.name"
              label="Departament nomi"
              readonly
            />
          </VCol>
        </VRow>
        <template #actions>
          <VSpacer/>

          <VBtn
            color="success"
            @click="confirmDialog = false"
          >
            Bekor qilish
          </VBtn>

          <VBtn
            :loading="loadingBtn"
            color="error"
            @click="confirmDelete"
          >
            Tasdiqlash
          </VBtn>
        </template>
      </VCard>
    </VDialog>
  </VCard>
</template>


