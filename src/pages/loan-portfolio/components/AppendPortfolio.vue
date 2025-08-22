<script setup>
import {ref} from "vue";

const appendPortfolioDialog = ref(null)
</script>

<template>

  <VBtn
    class="ml-2"
    color="primary"
    @click="appendPortfolioDialog = true"
  >
    Biriktirish
  </VBtn>

  <VDialog v-model="appendPortfolioDialog" max-width="600px">
    <VCard>
      <div class="ma-2 d-flex justify-space-between">
        <VCardTitle class="text-h5">
          Kredit portfeli
        </VCardTitle>
        <VBtn
          color="error"
          icon="mdi-close"
          size="large"
          variant="text"
          @click="appendPortfolioDialog = false"
        />
      </div>

      <VCardText>


        <div class="w-full d-flex justify-end mt-4">
          <VBtn>
            saqlash
          </VBtn>
        </div>

      </VCardText>
    </VCard>
  </VDialog>
</template>

