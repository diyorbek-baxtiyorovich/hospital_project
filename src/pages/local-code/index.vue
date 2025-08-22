<script setup>
import {onMounted, ref} from 'vue'
import {useLocalCodeStore} from '@/stores/localCodeStore.js'
import {deleteLocalCode, getLocalCode} from '@/service/localCodeService.js'
import {getRegions} from "@/service/regionService.js"
import {useToast} from "vue-toastification"
import CreateLocalCode from "@/pages/local-code/components/CreateLocalCode.vue"
import UpdateLocalCode from "@/pages/local-code/components/UpdateLocalCode.vue"
import checkPermission from "@/utils/checkPermission.js";


const toast = useToast()
const localCodeStore = useLocalCodeStore()

const loading = ref(false)
const regionList = ref([])
const localCodeList = ref([])
const region_id = ref(null)


async function getRegionList() {
  const data = await getRegions()
  if (data.length) {
    regionList.value = data
  }
}

async function getLocalCodeList() {
  loading.value = true

  const data = await getLocalCode(region_id.value)

  loading.value = false
  if (data.length) {
    localCodeList.value = data
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

  const result = await deleteLocalCode(updatingItem.value.id)

  loadingBtn.value = false
  if (result.status === 200) {
    toast.success('Muvofaqqiyatli o\'chirildi')
  }
  confirmDialog.value = false
  await getLocalCodeList()

}

const updateDialog = ref(false)

function handleUpdateDialog(item) {
  updatingItem.value = null
  updatingItem.value = item
  updateDialog.value = true
}

onMounted(() => {
  getRegionList()
  getLocalCodeList()
})
</script>


<template>
  <UpdateLocalCode
    v-model:update-dialog="updateDialog"
    :region-list="regionList"
    :update-dialog="updateDialog"
    :updating-item="updatingItem"
    @updated="getLocalCodeList"
  />
  <VCard flat>
    <VRow class="ma-2">
      <VCol
        cols="12"
        md="6"
      >
        <VCardTitle class="d-flex align-center pe-2">
          Filiallar
        </VCardTitle>
      </VCol>
      <VCol
        class="d-flex"
        cols="12"
        md="6"
      >
        <VAutocomplete
          v-model="region_id"
          :items="regionList"
          clearable
          density="compact"
          item-title="name_uz"
          item-value="id"
          label="Viloyatlar"
          @update:model-value="getLocalCodeList"
        />
        <CreateLocalCode
          :region-list="regionList"
          @created="getLocalCodeList"
        />
      </VCol>
    </VRow>


    <VDivider/>
    <VDataTableVirtual
      :headers="localCodeStore.headers"
      :items="localCodeList"
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
        <div style="min-width: 120px">
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
              label="Filial nomi"
              readonly
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="updatingItem.code"
              label="Filial kodi"
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


