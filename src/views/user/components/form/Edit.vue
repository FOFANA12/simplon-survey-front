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
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="first_name"
              v-model="form.first_name"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.firstNamePlaceholder')"
              aria-label="First Name"
            />
            <HasError
              :form="form"
              field="first_name"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Last Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="last_name" class="block text-gray-700 mb-1">
              {{ t("user.form.lastName") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="last_name"
              v-model="form.last_name"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.lastNamePlaceholder')"
              aria-label="Last Name"
            />
            <HasError
              :form="form"
              field="last_name"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Email -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="email" class="block text-gray-700 mb-1">
              {{ t("user.form.email") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.emailPlaceholder')"
              aria-label="Email"
            />
            <HasError :form="form" field="email" class="text-red-500 text-xs" />
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
            />
            <HasError :form="form" field="phone" class="text-red-500 text-xs" />
          </div>

          <!-- Language -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="lang" class="block text-gray-700 mb-1">
              {{ t("profile.form.lang") }}
              <span class="text-red-500 text-md">*</span>
            </label>

            <v-select
              v-model="form.lang"
              :options="store.languages"
              label="name"
              value="code"
              :reduce="(l) => l.code"
              :placeholder="t('profile.form.langPlaceholder')"
            >
              <template #option="{ name }">
                {{ name[currentLocale] }}
              </template>
              <template #selected-option="{ name }">
                {{ name[currentLocale] }}
              </template>
            </v-select>

            <HasError :form="form" field="lang" class="text-red-500 text-xs" />
          </div>

          <!-- Status -->
          <div
            class="col-span-12 md:col-span-3 lg:col-span-2 flex items-center mb-4 md:mt-4"
          >
            <input
              id="status"
              type="checkbox"
              v-model="form.status"
              class="checkbox checkbox-primary mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
            />
            <label for="status" class="text-gray-700">
              {{ t("common.form.status") }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Section -->
    <div class="w-full mx-auto bg-white shadow-sm rounded-lg mt-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t("user.sections.security") }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Role -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="role" class="block text-gray-700 mb-1">
              {{ t("user.form.role") }}
              <span class="text-red-500 text-md">*</span>
            </label>

            <v-select
              v-model="form.role"
              :options="store.roles"
              label="name"
              value="uuid"
              :reduce="(o) => o.uuid"
              :placeholder="t('user.form.rolePlaceholder')"
            />
            <HasError :form="form" field="role" class="text-red-500 text-xs" />
          </div>

          <!-- Password -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="password" class="block text-gray-700 mb-1">
              {{ t("user.form.password") }}
            </label>
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.passwordPlaceholder')"
              aria-label="Password"
            />
            <HasError
              :form="form"
              field="password"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Password Confirmation -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="password_confirm" class="block text-gray-700 mb-1">
              {{ t("user.form.passwordConfirm") }}
            </label>
            <input
              id="password_confirm"
              v-model="form.password_confirm"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('user.form.passwordConfirmPlaceholder')"
              aria-label="Password Confirmation"
            />
            <HasError
              :form="form"
              field="password_confirm"
              class="text-red-500 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale: currentLocale } = useI18n();
import { useUserStore } from "@/store";
const store = useUserStore();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const form = store.form;
</script>