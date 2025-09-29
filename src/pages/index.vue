<script setup>
// eslint-disable-next-line import/extensions
import {getUsersMe} from "@/service/userService.js";

const user = computed(() => {
  const userData = localStorage.getItem('user_data')
  return userData ? JSON.parse(userData) : null
})

async function getUsersList() {
  const res = await getUsersMe()
}
onMounted(async () => {
  await getUsersList()
})
</script>

<template>
  <div>
    <VCard
      class="mb-6 text-xl"
      title="Asosiy ma'lumotlar"
    >
      <VCardText>
        <div class="mb-2">
          <span class="font-weight-bold ">Xodim F.I.Sh: </span> {{ user?.data?.full_name }}
        </div>
        <div class="mb-2">
          <span class="font-weight-bold">Foydalanuvchi nomi: </span> {{ user?.data?.username }}
        </div>
        <div class="mb-2">
          <span class="font-weight-bold">Struktura: </span> {{ user?.data?.department?.name }}
        </div>
        <div class="mb-2">
          <span class="font-weight-bold">Joylashuv: </span> {{ user?.data?.region?.name_uz }} ,
          {{ user?.data?.local_code?.name_uz }}
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
