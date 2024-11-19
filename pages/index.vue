<template>
  <div class="bg-gray-100 min-h-screen py-4">
    <div class="container mx-auto flex flex-col lg:flex-row gap-4 px-4">
      <!-- Left Section -->
      <aside
        class="w-full lg:w-1/5 lg:min-w-[320px] bg-white shadow rounded-md p-4 flex flex-col justify-between min-h-[80vh]"
      >
        <div>
          <h2 class="text-base font-bold mb-3 text-gray-700">Categories</h2>
          <ul class="space-y-2">
            <li v-for="(item, index) in leftItems" :key="index">
              <NuxtLink
                :to="item.url"
                class="block text-sm text-gray-600 hover:text-indigo-500 transition"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Center Section -->
      <main
        class="w-full lg:flex-1 bg-white shadow rounded-md p-4 flex flex-col justify-between min-h-[80vh]"
      >
        <div>
          <h1 class="text-lg font-bold mb-3 text-gray-700">Main Content</h1>
          <p class="text-sm text-gray-600">
            This is the main content area. Place your articles, posts, or any primary
            content here. The layout is designed to adapt to various screen sizes.
          </p>
        </div>
      </main>

      <!-- Right Section -->
      <aside
        class="w-full lg:w-1/5 lg:min-w-[320px] bg-white shadow rounded-md p-4 flex flex-col justify-between min-h-[80vh]"
      >
        <div>
          <h2 class="text-base font-bold mb-3 text-gray-700">今日运势</h2>
          <div class="text-xs" style="color: #888">
            <div>阳历: {{ getSolarChinese() }}</div>
            <div>阴历: {{ getLunarChinese() }}</div>
            <div>宜: {{ getDailyGoodThings().join(',') }}</div>
            <div>忌: {{ getDailyBadThings().join(',') }}</div>
          </div>
          <IndexCalendar mode="date"></IndexCalendar>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import {
  getSolarChinese,
  getLunarChinese,
  getDailyGoodThings,
  getDailyBadThings,
} from "@/common/core/lunar";
</script>

<style scoped>
/* Styling for responsive spacing */
.container {
  max-width: 1280px; /* Optimized for large screens */
}

/* Optional: Adjust hover and spacing behavior */
.hover\:text-indigo-500:hover {
  color: #6366f1;
}
</style>
