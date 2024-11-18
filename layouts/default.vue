<template>
  <div>
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 shadow-md"
    >
      <div class="container mx-auto flex justify-between items-center px-4">
        <!-- Logo -->
        <div class="text-xl font-bold">LuckyFate</div>

        <!-- Navigation -->
        <div class="flex items-center space-x-4">
          <!-- Tabs for PC -->
          <nav class="hidden md:flex space-x-6">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="navigateTab(index, tab)"
              class="text-white hover:text-yellow-300 transition px-4 py-2 rounded-lg text-sm font-medium"
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

          <!-- User Avatar or Login -->
          <div>
            <template v-if="isLoggedIn">
              <UAvatar
                size="medium"
                :src="userAvatar"
                :alt="userName"
                class="cursor-pointer hover:opacity-80 transition"
              />
            </template>
            <template v-else>
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                @click="showLoginModal = true"
              >
                Login 
              </button>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Login Modal -->
    <UModal v-model="showLoginModal" title="Login" :closable="true">
      <div class="p-4 space-y-4">
        <UInput
          v-model="username"
          placeholder="Enter Username"
          :maxLength="15"
          :minLength="5"
          required
        />
        <UInput
          v-model="password"
          placeholder="Enter Password"
          type="password"
          :maxLength="15"
          :minLength="5"
          required
        />
        <div class="flex justify-end space-x-4">
          <UButton type="default" @click="showLoginModal = false">Cancel</UButton>
          <UButton type="primary" @click="handleLogin">Login</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Tabs Configuration
const tabs = [
  { label: "Fortune Telling", path: "/fortune" },
  { label: "Zodiac", path: "/zodiac" },
  { label: "Elements", path: "/elements" },
  { label: "Calendar", path: "/calendar" },
  { label: "Dreams", path: "/dreams" },
];

// Router navigation
const router = useRouter();

// State management
const showTabsMenu = ref(false); // Mobile tabs dropdown state
const showLoginModal = ref(false); // Login modal state
const isLoggedIn = ref(false); // Simulate login state
const userAvatar = ref("https://via.placeholder.com/40");
const userName = ref("John Doe");

// Login form state
const username = ref("");
const password = ref("");

// Navigation function
const navigateTab = (index, tab) => {
  showTabsMenu.value = false;
  router.push({ path: tab.path });
};

// Handle login
const handleLogin = () => {
  if (username.value.length < 5 || username.value.length > 15) {
    alert("Username must be 5-15 characters long.");
    return;
  }
  if (password.value.length < 5 || password.value.length > 15) {
    alert("Password must be 5-15 characters long.");
    return;
  }

  // Simulate login success
  isLoggedIn.value = true;
  showLoginModal.value = false;
};
</script>

<style scoped>
/* Dropdown z-index */
.z-50 {
  z-index: 50;
}
</style>
