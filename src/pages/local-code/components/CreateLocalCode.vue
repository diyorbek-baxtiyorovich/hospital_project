<script setup>
import {ref} from 'vue'
import {useToast} from 'vue-toastification'
import {getDistrictByRegionId} from "@/service/districtService.js"
import {addLocalCode} from "@/service/localCodeService.js"

const props = defineProps({
  regionList: Array,
})

const emit = defineEmits(['created'])


const toast = useToast()

const submitCredentials = ref({
  code: null,
  name: null,
  region_id: null,
  head: null,
  index: null,
  address: null,
  location_latt: null,
  location_long: null,
  inn: null,
  phone_number: null,
  manager: null,
  status: true,
})


const createDialog = ref(false)

const form = ref(null)

async function createLocalCode() {

  const {valid} = await form.value.validate()


  if (!valid) return

  const result = await addLocalCode(submitCredentials.value)

  if (result?.status === 201) {
    toast.success('Muvofaqqiyatli yaratildi.')
    emit('created')
    form.value.reset()
    createDialog.value = false
  } else {
    toast.error('Xatolik yuz berdi!')
  }
}

const isNumberField = $event => {
  const char = String.fromCharCode($event.keyCode)
  if (/^\d*$/.test(char)) return true
  $event.preventDefault()
}
</script>

<template>
  <div class="text-center">
    <VBtn
      class="ml-3"
      @click="createDialog=true"
    >
      qo'shish
    </VBtn>
    <VDialog
      v-model="createDialog"
      max-width="800"
    >
      <VCard class="pa-4">
        <VCardTitle>
          Yangi filial yaratish
        </VCardTitle>
        <VDivider class="mb-4"/>
        <VForm
          ref="form"
          @submit.prevent="createLocalCode"
        >
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.code"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'kamida 3 raqamdan iborat bo\'lishi zarur',

                ]"
                label="Lokal kod"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.name"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || 'kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Filial nomi"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.address"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || ' kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Filial manzili"
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VAutocomplete
                v-model="submitCredentials.region_id"
                :items="regionList"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                ]"
                clearable
                item-title="name_uz"
                item-value="id"
                label="Viloyat"
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.location_long"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || '',
                ]"
                hint="Masalan: 41.2995 (navigator orqali olish mumkin)"
                label="Joylashuv uzunligi"
                persistent-hint
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.location_latt"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || '',
                ]"
                hint="Masalan: 69.2401 (navigator orqali olish mumkin)"
                label="Joylashuv kengligi"
                persistent-hint
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.index"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 3) || ' kamida 3 harfdan iborat bo\'lishi zarur',

                ]"
                label="Filial indeksi"
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.phone_number"
                v-mask="'(##) ###-##-##'"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 14 ) || 'Telefon raqamni to\'g\'ri kiriting',
                ]"
                label="Filial telefon raqami"
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.inn"
                v-mask="'#########'"
                :rules="[
                  v => !!v || 'to\'ldirish majburiy!',
                  v => (v && v.length >= 9 ) || 'INN raqamini to\'g\'ri kiriting',
                ]"
                label="Filial INN raqami"
                required
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="submitCredentials.manager"
                label="Filial boshqaruvchisi"
                required
              />
            </VCol>
          </VRow>

          <VCardActions class="d-flex w-full justify-end mt-4">
            <VBtn
              color="error"
              variant="elevated"
              @click="createDialog=false"
            >
              bekor qilish
            </VBtn>
            <VBtn
              color="success"
              type="submit"
              variant="elevated"
            >
              saqlash
            </VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>



