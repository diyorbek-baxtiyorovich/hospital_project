<script setup>
import {onMounted, ref} from 'vue'
import {useUserStore} from '@/stores/userStore.js'
import {deleteUser, getUsers} from '@/service/userService.js'
import {useToast} from "vue-toastification"
import {getRegions} from "@/service/regionService.js"
import {getLocalCode} from "@/service/localCodeService.js"
import {getDepartments} from "@/service/departmentService.js"
import CreateUser from "@/pages/user/components/CreateUser.vue"
import UpdateUser from "@/pages/user/components/UpdateUser.vue"
import EditPermission from "@/pages/user/components/EditPermission.vue";
import checkPermission from "@/utils/checkPermission.js";

const toast = useToast()
const userStore = useUserStore()

const loading = ref(false)
const usersList = ref([])
const search = ref(null)

async function getUsersList() {
  loading.value = true

  const data = await getUsers()

  loading.value = false
  if (data?.length) {
    usersList.value = data
  }
}

const regionList = ref([])

async function getRegionList() {
  const data = await getRegions()
  if (data?.length) {
    regionList.value = data
  }
}

const localCodeList = ref([])

async function getLocalCodeList() {
  const data = await getLocalCode()
  if (data?.length) {
    localCodeList.value = data
  }
}

const departmentList = ref([])

async function getDepartmentList() {
  const data = await getDepartments()
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

  const result = await deleteUser(updatingItem.value.id)

  loadingBtn.value = false
  if (result.status === 200) {
    toast.success('Muvofaqqiyatli o\'chirildi')
  }
  confirmDialog.value = false
  await getUsersList()

}

const updateDialog = ref(false)

function handleUpdateDialog(item) {
  updatingItem.value = null
  updatingItem.value = item
  updateDialog.value = true
}

const permissionDialog = ref(false)

function handlePermissionDialog(item) {
  updatingItem.value = null
  updatingItem.value = item
  permissionDialog.value = true
}

onMounted(() => {
  getUsersList()
  getRegionList()
  getDepartmentList()
})
</script>


<template>
  <UpdateUser
    v-model:update-dialog="updateDialog"
    :department-list="departmentList"
    :region-list="regionList"
    :update-dialog="updateDialog"
    :updating-item="updatingItem"
    @updated="getUsersList"
  />
  <EditPermission
    v-model:update-dialog="permissionDialog"
    :permission-dialog="permissionDialog"
    :updating-item="updatingItem"
  />
  <VCard flat>
    <VRow class="ma-2">
      <VCol
        cols="12"
        md="6"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Xodimlar ro'yxati
        </VCardTitle>
      </VCol>
      <VCol
        class="d-flex"
        cols="12"
        md="6"
      >
        <VTextField
          v-model="search"
          clearable
          density="compact"
          hide-details
          label="qidirish..."
          prepend-inner-icon="mdi-magnify"
        />
        <CreateUser
          :department-list="departmentList"
          :region-list="regionList"
          @created="getUsersList"
        />
      </VCol>
    </VRow>


    <VDivider/>
    <VDataTableVirtual
      v-model:search="search"
      :filter-keys="['full_name', 'pinfl']"
      :headers="userStore.headers"
      :items="usersList"
      :loading="loading"
      fixed-header
      height="71vh"
      loading-text="ma'lumotlar yuklanmoqda"
      no-data-text="ma'lumot topilmadi"
    >
      <template #item.id="{ item, index }">
        {{ index + 1 }}
      </template>

      <template #item.local_code="{ item, index }">
        <div>
          {{ item.local_code?.name }}
        </div>
      </template>
      <template #item.department="{ item, index }">
        <div>
          {{ item.department?.department_name }}
        </div>
      </template>
      <template #item.actions="{ item }">
        <div style="min-width: 180px">
          <VBtn
            v-tooltip:bottom-end="'O\'zgartirish'"
            color="warning"
            density="default"
            icon="mdi-pencil-circle"
            size="x-large"
            variant="plain"
            @click="handleUpdateDialog(item)"
          />
          <VBtn
            v-tooltip:bottom-end="'O\'chirish'"
            color="error"
            density="default"
            icon="mdi-delete"
            size="x-large"
            variant="plain"
            @click="handleConfirmDialog(item)"
          />
          <VBtn
            v-tooltip:bottom-end="'Rollarni o\'zgartirish'"
            color="black"
            density="default"
            icon="mdi-lock-reset"
            size="x-large"
            variant="plain"
            @click="handlePermissionDialog(item)"
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
              v-model="updatingItem.full_name"
              label="Xodim F.I.Sh"
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

<!--<route>-->
<!--{-->
<!--meta: {-->
<!--endpoint: '/user/v1/get-all',-->
<!--title: 'Departament'-->
<!--}-->
<!--}-->
<!--</route>-->
