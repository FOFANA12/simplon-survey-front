<template>
  <div class="card mt-4">
    <!-- Personal Information Section -->
    <div class="w-full mx-auto bg-white shadow-sm rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t("user.sections.personalInformation") }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- First Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="first_name" class="block text-gray-700 mb-1">
              {{ t("user.form.firstName") }}
            </label>
            <input
              id="first_name"
              v-model="form.first_name"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.firstNamePlaceholder')"
              aria-label="First Name"
              readonly
            />
          </div>

          <!-- Last Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="last_name" class="block text-gray-700 mb-1">
              {{ t("user.form.lastName") }}
            </label>
            <input
              id="last_name"
              v-model="form.last_name"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.lastNamePlaceholder')"
              aria-label="Last Name"
              readonly
            />
          </div>

          <!-- Email -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="email" class="block text-gray-700 mb-1">
              {{ t("user.form.email") }}
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.emailPlaceholder')"
              aria-label="Email"
              readonly
            />
          </div>

          <!-- Phone -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="phone" class="block text-gray-700 mb-1">
              {{ t("user.form.phone") }}
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.phonePlaceholder')"
              aria-label="Phone"
              readonly
            />
          </div>

          <!-- Language -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="lang" class="block text-gray-700 mb-1">
              {{ t("profile.form.lang") }}
            </label>
            <input
              id="lang"
              v-model="form.lang"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.langPlaceholder')"
              aria-label="Language"
              readonly
            />
          </div>

          <!-- Role -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="role" class="block text-gray-700 mb-1">
              {{ t("user.form.role") }}
            </label>
            <input
              id="role"
              v-model="form.role"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.rolePlaceholder')"
              aria-label="Role"
              readonly
            />
          </div>

          <!-- Status Field (6 columns) -->
          <div class="col-span-12 md:col-span-6 flex items-center mb-4">
            <input
              id="status"
              type="checkbox"
              v-model="form.status"
              disabled
              class="checkbox checkbox-primary mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
            />
            <label for="status" class="text-gray-700">
              {{ t("common.form.status") }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store";
const store = useUserStore();

const form = store.form;
</script>