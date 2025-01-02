<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white shadow-sm rounded-lg">
      <div class="card-body p-4">
        <div class="col-span-12 grid grid-cols-12 gap-4">
          <!-- Company Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="name" class="block text-gray-700 mb-1">
              {{ t("company.form.name") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.namePlaceholder')"
              aria-label="Company Name"
              readonly
            />
          </div>

          <!-- Activity -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="activity" class="block text-gray-700 mb-1">
              {{ t("company.form.activity") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="activity"
              v-model="form.activity"
              type="text"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.activityPlaceholder')"
              aria-label="Company Activity"
              readonly
            />
          </div>

          <!-- Number of Employees -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="numberOfEmployees" class="block text-gray-700 mb-1">
              {{ t("company.form.numberOfEmployees") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="numberOfEmployees"
              v-model="form.number_of_employees"
              type="text"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.numberOfEmployeesPlaceholder')"
              aria-label="Number of Employees"
              readonly
            />
          </div>

          <!-- Phone -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="phone" class="block text-gray-700 mb-1">
              {{ t("company.form.phone") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="text"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.phonePlaceholder')"
              aria-label="Company Phone"
              readonly
            />
          </div>

          <!-- Email -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="email" class="block text-gray-700 mb-1">
              {{ t("company.form.email") }}
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.emailPlaceholder')"
              aria-label="Company Email"
              readonly
            />
          </div>

          <!-- Website -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="website" class="block text-gray-700 mb-1">
              {{ t("company.form.website") }}
            </label>
            <input
              id="website"
              v-model="form.website"
              type="url"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.websitePlaceholder')"
              aria-label="Company Website"
              readonly
            />
          </div>

          <!-- Address -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="address" class="block text-gray-700 mb-1">
              {{ t("company.form.address") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="address"
              v-model="form.address"
              type="text"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.addressPlaceholder')"
              aria-label="Company Address"
              readonly
            />
          </div>

          <!-- City -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="city" class="block text-gray-700 mb-1">
              {{ t("company.form.city") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="city"
              v-model="form.city"
              type="text"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.cityPlaceholder')"
              aria-label="Company City"
              readonly
            />
          </div>

          <!-- Zip Code -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="zip_code" class="block text-gray-700 mb-1">
              {{ t("company.form.zipCode") }}
            </label>
            <input
              id="zip_code"
              v-model="form.zip_code"
              type="text"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.zipCodePlaceholder')"
              aria-label="Company Zip Code"
              readonly
            />
          </div>

          <!-- Country -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="country" class="block text-gray-700 mb-1">
              {{ t("company.form.country") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="country"
              v-model="form.country"
              type="text"
              class="w-full p-2 border rounded-lg cursor-not-allowed"
              :placeholder="t('company.form.countryPlaceholder')"
              aria-label="Company Country"
              readonly
            />
          </div>

          <!-- Status -->
          <div
            class="col-span-12 md:col-span-3 lg:col-span-2 flex items-center mb-4"
          >
            <input
              id="status"
              type="checkbox"
              v-model="form.status"
              class="checkbox checkbox-primary mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
              disabled
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
import { useCompanyStore } from "@/store";
const store = useCompanyStore();

const form = store.form;
</script>

<style scoped>
</style>
