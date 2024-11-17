<template>
  <div>
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 shadow-md"
    >
      <div class="container mx-auto flex justify-between items-center px-4">
        <!-- Logo -->
        <div class="text-2xl font-bold">LuckyFate</div>

        <!-- Tabs (Left-aligned) -->
        <div class="flex space-x-4">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="setTab(index, tab)"
            :class="{
              'bg-yellow-500 text-white': currentTab === index,
              'bg-transparent text-white hover:bg-yellow-400': currentTab !== index,
            }"
            class="px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Navigation Links (Right-aligned) -->
        <div class="flex items-center space-x-6">
          <nav class="flex space-x-6">
            <NuxtLink to="/" class="hover:text-yellow-300 transition">Home</NuxtLink>
            <NuxtLink to="/services" class="hover:text-yellow-300 transition"
              >Services</NuxtLink
            >
            <NuxtLink to="/about" class="hover:text-yellow-300 transition"
              >About Us</NuxtLink
            >
          </nav>

          <!-- User Avatar or Login -->
          <div>
            <template v-if="isLoggedIn">
              <UDropdown
                :items="items"
                mode="hover"
                :popper="{ placement: 'bottom-start' }"
              >
                <UAvatar
                  size="medium"
                  :src="userAvatar"
                  :alt="userName"
                  class="cursor-pointer hover:opacity-80 transition"
                />
              </UDropdown>
            </template>
            <template v-else>
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                @click="login"
              >
                Login
              </button>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 py-6">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 LuckyFate. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define tabs
const tabs = [
  { label: "Fortune Telling" },
  { label: "Zodiac" },
  { label: "Elements" },
  { label: "Calendar", path: "/calendar" },
  { label: "Dreams" },
];

const router = useRouter()

// Tab state management
const currentTab = ref(0);
const setTab = (index, tab) => {
  currentTab.value = index;

  router.push({ path: tab.path });
};

// User login state and avatar
const isLoggedIn = ref(false); // 模拟登录状态
const userAvatar = ref("https://via.placeholder.com/40"); // 用户头像 URL
const userName = ref("John Doe"); // 用户名称

// Navigation and logout
const navigateTo = (route) => {
  console.log(`Navigating to ${route}`);
};
const login = () => {
  isLoggedIn.value = true; // 模拟登录
};
const logout = () => {
  isLoggedIn.value = false; // 模拟退出登录
};

const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
];

const open = ref(true);

defineShortcuts({
  o: () => (open.value = !open.value),
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
