<template>
  <v-dialog
    v-model="localModel"
    max-width="420"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card class="rounded-2xl py-6 px-4" elevation="8">
      <v-card-title class="text-center">
        <v-avatar size="64" color="error" class="mb-2">
          <v-icon color="white" size="36">mdi-delete-forever</v-icon>
        </v-avatar>
        <div class="text-h6 font-weight-bold">Удалить запись?</div>
      </v-card-title>

      <v-card-text class="text-center text-body-2 text-medium-emphasis">
        Вы уверены, что хотите удалить эту запись?<br />
        Это действие невозможно отменить.
      </v-card-text>

      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn
          variant="outlined"
          color="grey"
          class="rounded-xl px-6"
          @click="closeDialog"
        >
          <v-icon left>mdi-close</v-icon>
          Отмена
        </v-btn>

        <v-btn color="error" class="rounded-xl px-6" @click="confirmDelete">
          <v-icon left>mdi-trash-can</v-icon>
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";

const emit = defineEmits(["update:modelValue", "confirm", "close"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const localModel = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => (localModel.value = val)
);

function closeDialog() {
  localModel.value = false;
  emit("update:modelValue", false);
  emit("close");
}

function confirmDelete() {
  emit("confirm");
  closeDialog();
}
</script>
