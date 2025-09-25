<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

import ClientTable from "@/pages/agents/components/clientTable.vue";
</script>

<template>
  <section>
    <VBtn class="mb-4" variant="text" @click="router.push('/agents')">
      <VIcon color="primary" icon="mdi-arrow-left-bottom" size="20"/>
      Agent ma'lumotlariga qaytish
    </VBtn>
    <ClientTable class="mb-4"/>
  </section>
</template>










3

