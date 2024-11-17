<template>
  <div>
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 shadow-md"
    >
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="text-2xl font-bold">LuckyFate</div>
        <nav class="space-x-6">
          <a href="#" class="hover:text-yellow-300 transition">Home</a>
          <a href="#services" class="hover:text-yellow-300 transition">Services</a>
          <a href="#about" class="hover:text-yellow-300 transition">About Us</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gray-900 text-white text-center py-20">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold mb-6">Discover Your Fate</h1>
        <p class="text-lg mb-8">
          Explore the mysteries of life with accurate predictions and guidance.
        </p>
        <button
          class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded transition"
        >
          Start Now
        </button>
      </div>
    </section>

    <!-- Tabs Section -->
    <section class="bg-white py-16">
      <div class="container mx-auto">
        <div>
          <!-- Tab Navigation -->
          <div class="flex justify-center space-x-4 mb-6">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="currentTab = index"
              :class="{
                'bg-indigo-500 text-white': currentTab === index,
                'bg-gray-100 text-gray-700': currentTab !== index,
              }"
              class="px-6 py-2 rounded-lg transition shadow-md hover:shadow-lg"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab Content -->
          <div>
            <div v-if="currentTab === 0" class="text-center">
              <h2 class="text-2xl font-bold mb-4">Fortune Telling</h2>
              <p class="text-gray-700">
                Reveal your destiny with professional predictions and insights.
              </p>
            </div>
            <div v-if="currentTab === 1" class="text-center">
              <h2 class="text-2xl font-bold mb-4">Zodiac Predictions</h2>
              <p class="text-gray-700">
                Explore your zodiac sign's unique traits and compatibility.
              </p>
            </div>
            <div v-if="currentTab === 2" class="text-center">
              <h2 class="text-2xl font-bold mb-4">Element Analysis</h2>
              <p class="text-gray-700">
                Discover the balance of elements in your life and personality.
              </p>
            </div>
            <div v-if="currentTab === 3" class="text-center">
              <h2 class="text-2xl font-bold mb-4">Chinese Calendar</h2>
              <p class="text-gray-700">
                Find auspicious dates and gain insights from the traditional Chinese
                calendar.
              </p>
              <!-- Chinese Calendar Component -->
              <div class="mt-6">
                <h3 class="text-xl font-bold mb-2">Today's Almanac</h3>
                <div class="border rounded-lg shadow p-6 bg-gray-100">
                  <p class="text-lg text-gray-700">📅 Date: {{ today }}</p>
                  <p class="text-lg text-gray-700">
                    ✅ Auspicious Activities: {{ almanac.good }}
                  </p>
                  <p class="text-lg text-gray-700">
                    ❌ Inauspicious Activities: {{ almanac.bad }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="currentTab === 4" class="text-center">
              <h2 class="text-2xl font-bold mb-4">Dream Interpretation</h2>
              <p class="text-gray-700">
                Decode the meaning of your dreams with Zhougong's wisdom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

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
  { label: "Zodiac Predictions" },
  { label: "Element Analysis" },
  { label: "Chinese Calendar" },
  { label: "Dream Interpretation" },
];

// Manage current tab state
const currentTab = ref(0);

// Fake almanac data
const today = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const almanac = ref({
  good: "Weddings, Business Openings, Travel",
  bad: "Funerals, Major Financial Decisions",
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
