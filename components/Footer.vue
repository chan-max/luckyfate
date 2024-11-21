<template>
  <footer class="text-white py-6">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0"
    >
      <!-- Footer Logo and Description -->
      <div class="text-center md:text-left">
        <h2 class="text-lg font-bold">FunnyWord</h2>
        <p class="text-sm text-custom-400">
          Your guide to unlocking the mysteries of life.
        </p>
      </div>

      <!-- Footer Navigation -->
      <nav class="flex justify-center md:justify-end space-x-6">
        <NuxtLink to="/privacy" class="text-custom-400 hover:text-custom-500 transition">
          Privacy Policy
        </NuxtLink>
        <NuxtLink to="/terms" class="text-custom-400 hover:text-custom-500 transition">
          Terms of Service
        </NuxtLink>
        <NuxtLink to="/contact" class="text-custom-400 hover:text-custom-500 transition">
          Contact Us
        </NuxtLink>
      </nav>
    </div>

    <!-- Footer Copyright -->
    <div class="border-t border-custom-800 mt-6 pt-4 text-center">
      <p class="text-sm text-custom-400">&copy; 2024 FunnyWord. All rights reserved.</p>
    </div>
  </footer>
</template>
<style></style>
