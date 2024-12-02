<template>
  <footer class="text-black py-8 bg-white">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-6 md:space-y-0"
    >
      <!-- Footer Logo and Description -->
      <div class="text-center md:text-left">
        <h2 class="text-xl font-extrabold text-gray-800">Chinese Mystic Knowledge</h2>
        <p class="text-sm text-gray-600">
          Explore the depths of ancient wisdom and unlock life's hidden secrets.
        </p>
      </div>

      <!-- Footer Navigation -->
      <nav class="flex flex-wrap justify-center md:justify-end space-x-6">
        <NuxtLink to="/about" class="text-gray-600 hover:text-gray-800 transition">
          About Us
        </NuxtLink>
        <NuxtLink to="/discover" class="text-gray-600 hover:text-gray-800 transition">
          Discover
        </NuxtLink>
        <NuxtLink to="/blog" class="text-gray-600 hover:text-gray-800 transition">
          Blog
        </NuxtLink>
        <NuxtLink to="/privacy" class="text-gray-600 hover:text-gray-800 transition">
          Privacy Policy
        </NuxtLink>
      </nav>
    </div>

    <!-- Footer Copyright -->
    <div class="border-t border-gray-300 mt-6 pt-4 text-center">
      <p class="text-sm text-gray-600">
        &copy; 2024 ChineseMysticKnowledge. All rights reserved.
      </p>
      <p class="text-xs text-gray-500 mt-2">
        Crafted with passion and magic for knowledge seekers.
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
