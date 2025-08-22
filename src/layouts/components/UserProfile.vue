<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const user = computed(() => {
  const userData = localStorage.getItem('user_data')
  return userData ? JSON.parse(userData) : null
})
</script>

<template>
  <VBadge
    bordered
    color="success"
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1"/>

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        location="bottom end"
        offset="14px"
        width="230"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  color="success"
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1"/>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ user?.user?.username }}
            </VListItemTitle>
            <VListItemSubtitle> {{ user?.data?.full_name }}</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2"/>

          <!-- 👉 Profile -->


          <VListItem to="/profile">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-settings"
                size="22"
              />
            </template>

            <VListItemTitle>Sozlamalar</VListItemTitle>
          </VListItem>


          <!-- Divider -->
          <VDivider class="my-2"/>

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Chiqish</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
