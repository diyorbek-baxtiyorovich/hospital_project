<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

import ClientInfo from "@/pages/clients/coponents/ClientInfo.vue";
import CollateralInfo from "@/pages/clients/coponents/CollateralInfo.vue";
import GuarantorInfo from "@/pages/clients/coponents/GuarantorInfo.vue";
import PaymentInfo from "@/pages/clients/coponents/PaymentInfo.vue";
import AgentVisitLogs from "@/pages/clients/coponents/AgentVisitLogs.vue";
import AgentCallLogs from "@/pages/clients/coponents/AgentCallLogs.vue";
</script>

<template>
  <section>
    <VBtn class="mb-4" variant="text" @click="router.back()">
      <VIcon color="primary" icon="mdi-arrow-left-bottom" size="20"/>
      Ro'yxatga qaytish
    </VBtn>
    <ClientInfo class="mb-4"/>
    <CollateralInfo class="mb-4"/>
    <GuarantorInfo class="mb-4"/>
    <PaymentInfo class="mb-4"/>
    <AgentVisitLogs class="mb-4"/>
    <AgentCallLogs class="mb-4"/>
  </section>
</template>

