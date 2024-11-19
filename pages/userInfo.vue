<template>
  <div class="p-8 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center">Edit User Information</h1>
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
          required
          class="w-full"
          disabled
        />
        <small v-if="errors.username" class="text-red-500">{{ errors.username }}</small>
      </div>

      <!-- Gender -->
      <div class="mb-6">
        <label for="gender" class="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <USelect
          id="gender"
          v-model="form.gender"
          :options="genderOptions"
          placeholder="Select your gender"
          class="w-full"
        />
        <small v-if="errors.gender" class="text-red-500">{{ errors.gender }}</small>
      </div>
      <!-- Birthday -->
      <div class="mb-6">
        <label for="birthday" class="block text-sm font-medium text-gray-700 mb-2">
          Birthday
        </label>

        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="
              form.birthday ? format(form.birthday, 'yyy MMM d hh:mm') : 'please input'
            "
          />

          <template #panel="{ close }">
            <DatePicker v-model="form.birthday" is-required />
          </template>
        </UPopover>

        <small v-if="errors.birthday" class="text-red-500">{{ errors.birthday }}</small>
      </div>

      <!-- Save Button -->
      <div class="flex justify-center">
        <UButton
          :loading="loading"
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStatusStore } from "~/common/store/login";
import { format } from "date-fns";
import Api from "@/common/api/axios";
const router = useRouter();

const loginStore = useLoginStatusStore();
const form = ref({
  username: "",
  birthday: "",
  gender: "",
});

watch(
  loginStore,
  () => {
    form.value = {
      ...(loginStore.userInfo || {}),
      birthday: loginStore.userInfo?.birthday
        ? new Date(loginStore.userInfo?.birthday)
        : new Date(),
    };
  },
  {
    immediate: true,
  }
);

const errors = ref({
  username: "",
  birthday: "",
  gender: "",
});

const genderOptions = [
  { label: "Male", value: "1" },
  { label: "Female", value: "0" },
];

function validateForm() {
  errors.value.username = form.value.username.trim() ? "" : "Username is required.";
  errors.value.birthday = form.value.birthday ? "" : "Birthday is required.";
  errors.value.gender = form.value.gender ? "" : "Gender is required.";

  return !errors.value.username && !errors.value.birthday && !errors.value.gender;
}

const loading = ref(false);

async function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  try {
    loading.value = true;
    await Api.updateUserInfo(toRaw(form.value));
    message.success("user info updated successfully");
  } catch (e) {
    message.error("user info updated failed");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Optional styling */
</style>
