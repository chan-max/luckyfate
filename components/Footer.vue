<template>
  <footer class="bg-custom-900 text-white py-6">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0"
    >
      <!-- Footer Logo and Description -->
      <div class="text-center md:text-left">
        <h2 class="text-lg font-bold">LuckyFate</h2>
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
      <p class="text-sm text-custom-400">&copy; 2024 LuckyFate. All rights reserved.</p>
    </div>
  </footer>
</template>
<style>
.text-custom-400 {
  color: #9ca3af; /* Tailwind gray-400 */
}

.text-custom-500 {
  color: #fbbf24; /* Tailwind yellow-500 */
}

.bg-custom-900 {
  background-color: #111827; /* Tailwind gray-900 */
}

.border-custom-800 {
  border-color: #1f2937; /* Tailwind gray-800 */
}
</style>
