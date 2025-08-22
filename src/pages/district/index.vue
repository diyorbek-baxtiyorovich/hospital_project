<script setup>
import {onMounted, ref} from 'vue'
import {useDistrictStore} from '@/stores/districtStore.js'
import {deleteDistrict, getDistrict} from '@/service/districtService.js'
import {useToast} from "vue-toastification"
import {getRegions} from "@/service/regionService.js"
import CreateDistrict from "@/pages/district/components/CreateDistrict.vue"
import UpdateDistrict from "@/pages/district/components/updateDistrict.vue"
import checkPermission from "@/utils/checkPermission.js";

const toast = useToast()
const districtStore = useDistrictStore()

const loading = ref(false)
const districtList = ref([])
const regionsList = ref([])
const search = ref(null)

async function getRegionsList() {
  const data = await getRegions()

  if (data) {
    regionsList.value = data
  }
}

async function getDistrictList() {
  loading.value = true

  const data = await getDistrict()

  loading.value = false
  if (data) {
    districtList.value = data
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

  const result = await deleteDistrict(updatingItem.value.id)

  loadingBtn.value = false
  if (result.status === 200) {
    toast.success('Muvofaqqiyatli o\'chirildi')
  }
  confirmDialog.value = false
  await getDistrictList()

}

const updateDialog = ref(false)

function handleUpdateDialog(item) {
  updatingItem.value = null
  updatingItem.value = item
  updateDialog.value = true
}

onMounted(() => {
  getDistrictList()
  getRegionsList()
})
</script>


<template>
  <UpdateDistrict
    v-model:update-dialog="updateDialog"
    :regions-list="regionsList"
    :update-dialog="updateDialog"
    :updating-item="updatingItem"
    @updated="getDistrictList"
  />
  <VCard flat>
    <VRow class="ma-2">
      <VCol
        cols="12"
        md="6"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Tumanlar ro'yxati
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
        <CreateDistrict
          v-if="checkPermission('/district/v1/create')"
          :regions-list="regionsList"
          @created="getDistrictList"
        />
      </VCol>
    </VRow>


    <VDivider/>
    <VDataTableVirtual
      v-model:search="search"
      :filter-keys="['name_uz', 'name_ru']"
      :headers="districtStore.headers"
      :items="districtList"
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
            v-if="checkPermission('/district/v1/update')"
            color="warning"
            density="default"
            icon="mdi-pencil-circle"
            size="x-large"
            variant="plain"
            @click="handleUpdateDialog(item)"
          />
          <VBtn
            v-if="checkPermission('/district/v1/delete')"
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
      max-width="800"
      persistent
    >
      <VCard class="pa-4">
        <VCardTitle class="text-center mb-4 font-weight-bold">
          Ushbu ma'lumotni o'chirishni tasdiqlaysizmi?
        </VCardTitle>
        <VRow class="mb-4">
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="updatingItem.name_uz"
              label="Tuman nomi (uz)"
              readonly
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="updatingItem.name_ru"
              label="Название района (ru)"
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

