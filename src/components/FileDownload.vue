<script setup>
import { downloadFile } from "@/service/loanProductService"

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
})

const fileName = computed(() => props.file?.file_url.split("/").at(-1))
</script>

<template>
  <VBtn
    variant="outlined"
    color="primary"
    class="d-flex align-center"
    prepend-icon="tabler-file-download"
    @click="downloadFile(file.file_url)"
  >
    {{ fileName }}
  </VBtn>
</template>


