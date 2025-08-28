<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {fetchGuarData} from "@/service/clientService.js";
import {useRouter} from "vue-router";

const router = useRouter()
const clientId = router.currentRoute.value.params.id

const guarData = ref([])

async function getGuarData() {
  const data = await fetchGuarData(clientId)
  if (data) guarData.value = data
}

onMounted(() => {
  getGuarData()
})
</script>

<template>
  <section>
    <VCard v-if="guarData.length">
      <VCardTitle class="w-full text-center text-primary">
        Garov ma'lumotlari
      </VCardTitle>
      <VCardText class="mt-4">
        <VRow v-for="(guarItem, index) in guarData" :key="index">
          <VCol cols="12" md="6">
            <strong>{{ index + 1 }}) Garov turi:</strong> {{ guarItem.guar_type_name }}
          </VCol>
          <VCol cols="12" md="6">
            <strong>Garov ID:</strong> {{ guarItem.guar_id }}
          </VCol>

          <VCol cols="12" md="12">
            <v-expansion-panels>
              <v-expansion-panel
              >
                <v-expansion-panel-title>
                  <span class="text-info text-md-h5">Garov tavsifi</span>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <VCol v-for="guarParam in guarItem.guar_params" :key="guarParam.id" cols="12" md="12">
                    <strong>{{ guarParam.comment }}:</strong> {{ guarParam.field_value }}
                  </VCol>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </VCol>
        </VRow>

        <VDivider class="my-2"/>
      </VCardText>
    </VCard>
  </section>
</template>
