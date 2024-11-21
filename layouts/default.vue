<template>
  <AConfigProvider :locale="locale == 'zh' ? zhCN : null">
    <div class="flex flex-col w-full h-full" style="background: #080808">
      <!-- Header -->
      <header class="text-white py-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center px-4">
          <!-- Logo -->
          <NuxtLink to="/">
            <img
              src="/logo.svg"
              alt="Logo"
              class="h-8 w-auto pr-2 max-w-[120px] md:max-w-none"
            />
          </NuxtLink>

          <!-- Navigation -->
          <div class="flex items-center space-x-4">
            <!-- Tabs for PC -->
            <nav class="hidden md:flex space-x-6">
              <button
                v-for="(tab, index) in tabs"
                :key="index"
                @click="navigateTab(index, tab)"
                class="text-white hover:text-yellow-300 transition px-4 py-2 rounded-lg text-sm font-medium text-nowrap"
                :class="[
                  'block w-full text-left px-4 py-2 text-sm',
                  $route.path === tab.path ? 'underline text-custom-200' : '',
                ]"
              >
                {{ tab.label }}
              </button>
            </nav>

            <!-- Dropdown for Mobile -->
            <div class="relative md:hidden">
              <button
                class="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                @click="toggleTabsMenu"
              >
                ☰
              </button>

              <div
                v-if="showTabsMenu"
                class="absolute top-full mt-2 left-0 w-48 bg-white text-gray-700 shadow-lg rounded-lg z-50"
              >
                <ul class="flex flex-col">
                  <li
                    v-for="(tab, index) in tabs"
                    :key="index"
                    class="hover:bg-gray-200 transition"
                  >
                    <button
                      @click="navigateTab(index, tab)"
                      class="block w-full text-left px-4 py-2 text-sm"
                    >
                      {{ tab.label }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <!-- <UDropdown :items="[langOptions]" :popper="{ placement: 'bottom-end' }">
              <div class="flex items-center mx-2">
                {{ locale }}
                <CaretDownOutlined style="margin-top: 4px" />
              </div>

              <template #item="{ item }">
                <span @click="langClick(item)" class="w-full text-left">
                  {{ item.label }}</span
                >
              </template>
            </UDropdown> -->

            <!-- User Avatar or Login -->
            <div>
              <template v-if="loginStore.isLogin">
                <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
                  <UAvatar
                    size="medium"
                    :src="loginStore.userInfo?.avatar"
                    :alt="loginStore.userInfo?.username"
                    class="cursor-pointer hover:opacity-80 transition user-avatar w-10 h-10"
                  />

                  <template #item="{ item }">
                    <div
                      @click="item.onclick"
                      class="flex w-full items-center"
                      style="column-gap: 6px"
                    >
                      <UIcon :name="item.icon" class="w-5 h-5 text-gray-500" />
                      <span>{{ item.label }}</span>
                    </div>
                  </template>
                </UDropdown>
              </template>
              <template v-else>
                <button
                  class="bg-custom-500 hover:bg-custom-600 text-white px-4 py-2 rounded transition"
                  @click="showLoginModal = true"
                >
                  Login
                </button>
              </template>
            </div>
          </div>
        </div>
      </header>

      <div style="flex: 1">
        <slot></slot>
      </div>

      <!-- Login Modal -->
      <UModal v-model="showLoginModal" title="User Login" :closable="true">
        <div class="p-6 space-y-6">
          <!-- Login Title -->
          <h2 class="text-lg font-bold text-gray-700">Login to Your Account</h2>

          <!-- Username Input -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-600 pb-2">
              Username
            </label>
            <UInput
              id="username"
              v-model="username"
              placeholder="Enter your username"
              :maxLength="15"
              :minLength="5"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-600 pb-2">
              Password
            </label>
            <UInput
              id="password"
              v-model="password"
              placeholder="Enter your password"
              type="password"
              :maxLength="15"
              :minLength="5"
              required
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4">
            <UButton  class="text-custom-500" @click="goSignup" variant="link"> Sign up </UButton>

            <div style="flex: 1"></div>

            <UButton
              class="px-6 text-custom-500"
              @click="showLoginModal = false"
              variant="link"
            >
              Cancel
            </UButton>
            <UButton
              class="px-6 bg-custom-500"
              @click="handleLogin"
              :loading="loginLoading"
            >
              Login
            </UButton>
          </div>
        </div>
      </UModal>

      <Footer></Footer>
    </div>
  </AConfigProvider>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/common/api/axios";
import {
  doLoginAction,
  useLoginStatusStore,
  initLoginStoreUserInfo,
  doLogout,
} from "@/common/store/login";
import { message } from "ant-design-vue";
import { langOptions } from "@/common/i18n";
import { CaretDownOutlined } from "@ant-design/icons-vue";
import Footer from "@/components/Footer.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

const { locale, locales, setLocale } = useI18n();

if (locale.value == "zh") {
  dayjs.locale("zh-cn");
}

const { t } = useI18n();

// Router navigation
const router = useRouter();

const loginStore = useLoginStatusStore();

const items = [
  [
    {
      label: "Info",
      icon: "i-heroicons-information-circle",
      onclick: async () => {
        router.push({ path: "/userInfo" });
      },
    },
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      onclick: async () => {
        doLogout();
      },
    },
  ],
];

// Tabs Configuration
const tabs = [{ label: "词库", path: "/fortune" }];

// State management
const showTabsMenu = ref(false); // Mobile tabs dropdown state
const showLoginModal = ref(false); // Login modal state

// Login form state
const username = ref("");
const password = ref("");

// Navigation function
const navigateTab = (index, tab) => {
  showTabsMenu.value = false;
  router.push({ path: tab.path });
};

// Handle login

const loginLoading = ref(false);

const handleLogin = async () => {
  if (username.value.length < 5 || username.value.length > 15) {
    alert("Username must be 5-15 characters long.");
    return;
  }
  if (password.value.length < 5 || password.value.length > 15) {
    alert("Password must be 5-15 characters long.");
    return;
  }

  try {
    loginLoading.value = true;

    let res = await Api.login({
      username: username.value,
      password: password.value,
    });

    doLoginAction(res.data);

    message.success("Login Successful");
    // Simulate login success
    showLoginModal.value = false;
  } catch (e) {
    loginLoading.value = false;
  } finally {
    loginLoading.value = false;
  }
};

function goSignup() {
  showLoginModal.value = false;
  router.push({ path: "/signup" });
}

function langClick(item) {
  setLocale(item.value);
  window.location.reload();
}

initLoginStoreUserInfo();
</script>

<style scoped>
/* Dropdown z-index */
.z-50 {
  z-index: 50;
}
</style>

<style>
html,
body,
#__nuxt {
  height: 100%;
}
.user-avatar img {
  height: 100%;
}
</style>
