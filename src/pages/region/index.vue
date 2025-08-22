<script setup>
import {onMounted, ref} from 'vue'
import {useRegionStore} from '@/stores/regionStore.js'
import {deleteRegion, getRegions} from '@/service/regionService.js'
import CreateRegion from "@/pages/region/components/CreateRegion.vue"
import {useToast} from "vue-toastification"
import UpdateRegion from "@/pages/region/components/UpdateRegion.vue"
import checkPermission from "@/utils/checkPermission.js";


const toast = useToast()
const regionStore = useRegionStore()

const loading = ref(false)
const regionsList = ref([])
const search = ref(null)

async function getRegionsList() {
  loading.value = true

  const data = await getRegions()

  loading.value = false
  if (data) {
    regionsList.value = data
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

  const result = await deleteRegion(updatingItem.value.id)

  loadingBtn.value = false
  if (result.status === 200) {
    toast.success('Muvofaqqiyatli o\'chirildi')
  }
  confirmDialog.value = false
  await getRegionsList()

}

const updateDialog = ref(false)

function handleUpdateDialog(item) {
  updatingItem.value = null
  updatingItem.value = item
  updateDialog.value = true
}

onMounted(() => {
  getRegionsList()
})
</script>


<template>
  <UpdateRegion
    v-model:update-dialog="updateDialog"
    :update-dialog="updateDialog"
    :updating-item="updatingItem"
    @updated="getRegionsList"
  />
  <VCard flat>
    <VRow class="ma-2">
      <VCol
        cols="12"
        md="6"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Viloyatlar ro'yxati
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
        <!--        <CreateRegion @created="getRegionsList"/>-->
      </VCol>
    </VRow>


    <VDivider/>
    <VDataTableVirtual
      v-model:search="search"
      :filter-keys="['name_uz', 'name_ru']"
      :headers="regionStore.headers"
      :items="regionsList"
      :loading="loading"
      fixed-header
      height="71vh"
      loading-text="ma'lumotlar yuklanmoqda"
      no-data-text="ma'lumot topilmadi"
    >
      <template #item.id="{ item, index }">
        {{ index + 1 }}
      </template>
      <!--      <template #item.actions="{ item }">-->
      <!--        <div>-->
      <!--          <VBtn-->
      <!--            v-if="checkPermission('/region/v1/update')"-->
      <!--            color="warning"-->
      <!--            density="default"-->
      <!--            icon="mdi-pencil-circle"-->
      <!--            size="x-large"-->
      <!--            variant="plain"-->
      <!--            @click="handleUpdateDialog(item)"-->
      <!--          />-->
      <!--          <VBtn-->
      <!--            v-if="checkPermission('/region/v1/delete')"-->
      <!--            color="error"-->
      <!--            density="default"-->
      <!--            icon="mdi-delete"-->
      <!--            size="x-large"-->
      <!--            variant="plain"-->
      <!--            @click="handleConfirmDialog(item)"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </template>-->
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
            md="12"
          >
            <VTextField
              v-model="updatingItem.name"
              label="Viloyat nomi"
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
