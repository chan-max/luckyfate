<template>
  <div class="p-8 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center">User Registration</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Username -->
      <div class="mb-6">
        <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <UInput
          id="username"
          v-model="form.username"
          placeholder="Enter your username"
          :maxLength="15"
          :minLength="5"
          required
          class="w-full"
        />
        <small v-if="errors.username" class="text-red-500">{{ errors.username }}</small>
      </div>

      <!-- Password -->
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <UInput
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          :maxLength="15"
          :minLength="5"
          required
          class="w-full"
        />
        <small v-if="errors.password" class="text-red-500">{{ errors.password }}</small>
      </div>

      <!-- Confirm Password -->
      <div class="mb-6">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <UInput
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
          class="w-full"
        />
        <small v-if="errors.confirmPassword" class="text-red-500">{{
          errors.confirmPassword
        }}</small>
      </div>

      <!-- Register Button -->
      <div class="flex justify-center">
        <UButton
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Register
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, toRaw } from "vue";
import Api from "@/common/api/axios";
// Form state
const form = ref({
  username: "",
  password: "",
  confirmPassword: "",
});

// Validation errors
const errors = ref({
  username: "",
  password: "",
  confirmPassword: "",
});

// Form validation
function validateForm() {
  errors.value.username =
    form.value.username.length >= 5 && form.value.username.length <= 15
      ? ""
      : "Username must be between 5 and 15 characters.";

  errors.value.password =
    form.value.password.length >= 5 && form.value.password.length <= 15
      ? ""
      : "Password must be between 5 and 15 characters.";

  errors.value.confirmPassword =
    form.value.confirmPassword === form.value.password ? "" : "Passwords do not match.";

  return (
    !errors.value.username && !errors.value.password && !errors.value.confirmPassword
  );
}

// Handle form submission
async function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  try {
    await Api.signup(toRaw(form.value));
    message.success("signup successful");
  } catch (e) {
    message.error("signup failed");
  }
}
</script>

<style scoped>
/* Optional custom styles */
</style>
