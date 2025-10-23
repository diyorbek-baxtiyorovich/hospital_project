<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import AppTextField from "@core/components/app-form-elements/AppTextField.vue";
import logo from "@/assets/images/logos.png";
definePage({
  meta: {
    layout: "blank",
    public: true
  }
});

const toast = useToast();
const router = useRouter();
const userStore = useAuthStore();

const loading = ref(false);
const password = ref("");
const username = ref("");
const isPasswordVisible = ref(false);

const userDetails = ref({
  username: username.value,
  password: password.value
});

const login = async () => {
  try {
    loading.value = true;
    if (
      userDetails.value.username === "" ||
      userDetails.value.password === ""
    ) {
      toast.error("Пожалуйста, заполните все поля");

      return;
    }

    const res = await userStore.login(userDetails.value);

    if (res?.token) {
      toast.success(`Добро пожаловать, ${res.data?.full_name}`);
      localStorage.setItem("access_token", res.token);
      localStorage.setItem("user_data", JSON.stringify(res));
      await router.push("/");
      location.reload();
    } else {
      toast.error("Неверное имя пользователя или пароль!");
    }

    loading.value = false;
  } catch (e) {
    toast.error("Произошла ошибка. Пожалуйста, попробуйте снова");
    loading.value = false;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <VRow class="auth-wrapper" no-gutters>
    <!-- Левая сторона - Иллюстрация -->
    <VCol
      cols="12"
      lg="7"
      class="d-none d-lg-flex align-center justify-center position-relative medical-illustration-section"
    >
      <div class="illustration-wrapper">
        <div class="medical-icon-grid">
          <VIcon icon="mdi-stethoscope" size="48" class="medical-icon icon-1" />
          <VIcon icon="mdi-heart-pulse" size="48" class="medical-icon icon-2" />
          <VIcon icon="mdi-medical-bag" size="48" class="medical-icon icon-3" />
          <VIcon
            icon="mdi-hospital-building"
            size="48"
            class="medical-icon icon-4"
          />
          <VIcon icon="mdi-chart-line" size="48" class="medical-icon icon-5" />
          <VIcon
            icon="mdi-clipboard-pulse"
            size="48"
            class="medical-icon icon-6"
          />
        </div>
        <div class="text-center illustration-content">
          <h2 class="text-h3 font-weight-bold mb-4 text-white">
            Панель управления врачами
          </h2>
          <p class="text-h6 text-white opacity-90">
            Управляйте информацией о пациентах и следите за их состоянием
          </p>
        </div>
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="5"
      class="d-flex align-center justify-center bg-surface"
    >
      <VCard flat class="pa-8 pa-sm-12 auth-card" max-width="500" width="100%">
        <VCardText class="text-center pa-0 mb-8">
          <div
            class="mb-6 d-flex justify-center"
            style="width: 100%; height: 150px "
          >
            <VImg :width="200" :src="logo" />
          </div>

          <h3 class="text-h4 font-weight-bold mb-2 text-primary">
            Вход в систему
          </h3>
          <p class="text-body-1 text-medium-emphasis">
            Добро пожаловать в административную панель врачей
          </p>
        </VCardText>

        <!-- Форма входа -->
        <VCardText class="pa-0">
          <VForm @submit.prevent="login">
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="userDetails.username"
                  autofocus
                  label="Имя пользователя"
                  placeholder="Введите имя пользователя"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  density="comfortable"
                  :rules="[v => !!v || 'Имя пользователя обязательно']"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="userDetails.password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                  "
                  prepend-inner-icon="mdi-lock-outline"
                  label="Пароль"
                  placeholder="Введите пароль"
                  variant="outlined"
                  density="comfortable"
                  autocomplete="current-password"
                  :rules="[v => !!v || 'Пароль обязателен']"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- Запомнить и забыли пароль -->
              <VCol
                cols="12"
                class="d-flex align-center justify-space-between mb-2"
              >
                <VCheckbox
                  label="Запомнить меня"
                  density="compact"
                  hide-details
                />
                <a
                  href="#"
                  class="text-primary text-decoration-none text-body-2"
                  @click.prevent="toast.info('Обратитесь к администратору')"
                >
                  Забыли пароль?
                </a>
              </VCol>

              <!-- Кнопка входа -->
              <VCol cols="12">
                <VBtn
                  block
                  size="large"
                  type="submit"
                  :loading="loading"
                  class="mb-4 text-capitalize"
                  color="primary"
                  elevation="0"
                >
                  <VIcon start icon="mdi-login" />
                  Войти в систему
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.auth-wrapper {
  min-height: 100vh;
  min-height: 100dvh;
}

.medical-illustration-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 50%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
}

.illustration-wrapper {
  position: relative;
  z-index: 1;
  padding: 2rem;
}

.medical-icon-grid {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.medical-icon {
  position: absolute;
  color: rgba(255, 255, 255, 0.15);
  animation: float 6s ease-in-out infinite;

  &.icon-1 {
    top: 10%;
    left: 15%;
    animation-delay: 0s;
  }

  &.icon-2 {
    top: 20%;
    right: 20%;
    animation-delay: 1s;
  }

  &.icon-3 {
    bottom: 30%;
    left: 10%;
    animation-delay: 2s;
  }

  &.icon-4 {
    bottom: 15%;
    right: 15%;
    animation-delay: 3s;
  }

  &.icon-5 {
    top: 50%;
    left: 5%;
    animation-delay: 4s;
  }

  &.icon-6 {
    top: 60%;
    right: 10%;
    animation-delay: 5s;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(5deg);
  }
  66% {
    transform: translateY(-10px) rotate(-5deg);
  }
}

.illustration-content {
  position: relative;
  z-index: 2;
}

.auth-card {
  background: rgb(var(--v-theme-surface));
  border-radius: 0;

  @media (min-width: 960px) {
    border-radius: 12px;
  }
}

// Form improvements
.v-text-field {
  :deep(.v-field) {
    border-radius: 8px;
  }
}

.v-btn {
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

// Responsive adjustments
@media (max-width: 959px) {
  .auth-card {
    max-width: 100% !important;
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
