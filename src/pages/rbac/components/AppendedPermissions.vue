<script lang="ts" setup>
import { useRbacRoleStore } from "@/stores/rbac";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const rbacRulesStore = useRbacRoleStore();

const { permissions, permissionsById } = storeToRefs(rbacRulesStore);

const toast = useToast();

const rolePermissionId = ref<number>(1);

async function appendPermissions() {
  rbacRulesStore.permissions.forEach(permission => {
    permissionsById.value.forEach(pById => {
      if (permission.id === pById.id) permission.isPermitted = true;
    });
  });
}

async function changePermissions() {
  const append = [];

  permissions.value.forEach(permission => {
    if (permission.isPermitted) {
      append.push(permission.id);
    }
  });

  const result = await rbacRulesStore.changePermissions(
    append,
    rolePermissionId.value
  );
  if (result)
    toast.success("Menyu ruxsatnomalari muvaffaqiyatli o'zgartirildi");
}

async function getRolePermissions(id) {
  await rbacRulesStore.fetchRbacPermissionsById(id);
  await appendPermissions();
}

onMounted(() => {
  getRolePermissions(rolePermissionId.value);
});
</script>

<template>
  <VCard flat>
    <VCardActions>
      <VRow>
        <VCol cols="12" md="4" />
        <VCol class="mt-3" cols="12" md="8">
          <VAutocomplete
            v-model="rolePermissionId"
            :items="rbacRulesStore.roles"
            aria-autocomplete="off"
            autocomplete="off"
            dense
            item-title="name"
            item-value="id"
            outlined
            @update:model-value="getRolePermissions(rolePermissionId)"
          />
        </VCol>
      </VRow>
    </VCardActions>

    <div
      v-for="(allPermissions, index) in permissions"
      :key="allPermissions.id"
      class="gap-3 align-center ml-5 my-1 d-flex"
    >
      <span class="font-weight-bold">{{ index + 1 }}) </span>
      <VCheckbox
        v-model="allPermissions.isPermitted"
        :label="` ${allPermissions?.name}`"
        class="font-weight-bold"
      />
      <span>path: {{ allPermissions?.endpoint }}</span>
    </div>

    <VCardActions>
      <VSpacer />
      <VBtn color="primary" @click="changePermissions">
        change permissions
      </VBtn>
    </VCardActions>
  </VCard>
</template>
