<script setup>
import {onMounted, ref} from 'vue'
import {useNeighborhoodStore} from '@/stores/neighborhoorStore.js'
import {deleteNeighborhood, getNeighborhood} from '@/service/neighborhoodService.js'
import {useToast} from "vue-toastification"
import CreateNeighborhood from "@/pages/neighborhood/components/CreateNeighborhood.vue";
import {getRegions} from "@/service/regionService.js";
import {getDistrict, getDistrictByRegion} from "@/service/districtService.js";
import UpdateNeighborhood from "@/pages/neighborhood/components/UpdateNeighborhood.vue";
import checkPermission from "@/utils/checkPermission.js";

const toast = useToast()
const neighborhoodStore = useNeighborhoodStore()

const loading = ref(false)

const loanPurposeList = ref({
  items: [],
  total: 0,
})

const pageLength = ref(0)

const regionList = ref([])

async function getRegionsList() {
  const data = await getRegions()
  if (data?.length) {
    regionList.value = data
  }
}

const districtList = ref([])

async function getDistrictList() {
  const data = await getDistrict()
  if (data?.length) {
    districtList.value = data
  }
}

async function regionChanged() {
  neighborhoodStore.pageParams.district_id = null
  neighborhoodStore.pageParams.page = 1
  await getNeighborhoodsList()
  if (neighborhoodStore.pageParams.region_id) {
    const data = await getDistrictByRegion(neighborhoodStore.pageParams.region_id)
    if (data?.length) {
      districtList.value = data
    }
  } else {
    await getDistrictList()
  }

}


function perPageChanged() {
  neighborhoodStore.pageParams.page = 1
  getNeighborhoodsList()
}

async function getNeighborhoodsList() {
  loading.value = true

  const data = await getNeighborhood(neighborhoodStore.pageParams)
  loading.value = false
  if (data?.items) {
    loanPurposeList.value = data
    pageLength.value = Math.ceil(loanPurposeList.value.total / neighborhoodStore.pageParams.size)
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

  const result = await deleteNeighborhood(updatingItem.value.id)

  loadingBtn.value = false
  if (result.status === 200) {
    toast.success('Muvofaqqiyatli o\'chirildi')
  }
  confirmDialog.value = false
  await getNeighborhoodsList()

}

const updateDialog = ref(false)

function handleUpdateDialog(item) {
  updatingItem.value = null
  updatingItem.value = item
  updateDialog.value = true
}


let debounceTimeout = null

watch(
  () => neighborhoodStore.pageParams.name,
  (newValue, oldValue) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      neighborhoodStore.pageParams.page = 1
      getNeighborhoodsList()
    }, 600)
  },
)

onMounted(() => {
  getNeighborhoodsList()
  getRegionsList()
  getDistrictList()
})
</script>


<template>
  <UpdateNeighborhood
    v-model:update-dialog="updateDialog"
    :regions-list="regionList"
    :update-dialog="updateDialog"
    :updating-item="updatingItem"
    @updated="getNeighborhoodsList"
  />
  <VCard flat>
    <VRow class="ma-2">
      <VCol
        cols="12"
        md="4"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Mahallalar ro'yxati
        </VCardTitle>
      </VCol>
      <VCol
        class="d-flex justify-end"
        cols="12"
        md="8"
      >
        <VAutocomplete
          v-model="neighborhoodStore.pageParams.region_id"
          :items="regionList"
          class="mr-4"
          clearable
          density="compact"
          item-title="name"
          item-value="id"
          label="Viloyat"
          prepend-inner-icon="mdi-magnify"
          @update:model-value="regionChanged()"
        />
        <VAutocomplete
          v-model="neighborhoodStore.pageParams.district_id"
          :items="districtList"
          clearable
          density="compact"
          item-title="name"
          item-value="id"
          label="Tuman"
          prepend-inner-icon="mdi-magnify"
          @update:model-value="perPageChanged()"
        />
        <CreateNeighborhood
          v-if="checkPermission('/neighborhood/v1/create')"
          :regions-list="regionList"
          @created="getNeighborhoodsList()"
        />
      </VCol>
    </VRow>

    <VDivider/>
    <VDataTableVirtual
      :headers="neighborhoodStore.headers"
      :items="loanPurposeList.items"
      :loading="loading"
      fixed-header
      height="68vh"
      loading-text="ma'lumotlar yuklanmoqda"
      no-data-text="ma'lumot topilmadi"
    >
      <template #item.id="{ item, index }">
        {{ index + 1 }}
      </template>
      <template #item.actions="{ item }">
        <div style="min-width: 120px">
          <VBtn
            v-if="checkPermission('/neighborhood/v1/update')"
            color="warning"
            density="default"
            icon="mdi-pencil-circle"
            size="x-large"
            variant="plain"
            @click="handleUpdateDialog(item)"
          />
          <VBtn
            v-if="checkPermission('/neighborhood/v1/delete')"
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

    <VCardActions class="w-full d-flex justify-space-between mt-2">
      <VSelect
        v-model="neighborhoodStore.pageParams.size"
        :items="[10,20,50]"
        label="Har bir sahifa"
        max-width="150"
        @update:model-value="perPageChanged"
      />
      <VPagination
        v-model="neighborhoodStore.pageParams.page"
        :length="pageLength"
        :total-visible="4"
        rounded="circle"
        @update:model-value="getNeighborhoodsList"
      />
    </VCardActions>

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
              v-model="updatingItem.name"
              label="Mahalla nomi (uz)"
              readonly
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="updatingItem.mfy_code"
              label="MFY kodi"
              readonly
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="updatingItem.region.name_uz"
              label="Viloyat"
              readonly
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="updatingItem.district.name_uz"
              label="Tuman"
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

<route>
{
meta: {
endpoint: '/neighborhood/v1/get-paginated',
title: 'Mahalla'
}
}
</route>

