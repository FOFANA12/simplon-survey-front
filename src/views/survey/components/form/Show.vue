<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white shadow-sm rounded-lg">
      <div class="card-body p-4">
        <div class="col-span-12 grid grid-cols-12 gap-4">
          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="name" class="block text-gray-700 mb-1">
              {{ t("survey.form.name") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.namePlaceholder')"
              aria-label="Equipment Name"
              readonly
            />
            <HasError :form="form" field="name" class="text-red-500 text-xs" />
          </div>

          <!-- Serial Number -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="serialNumber" class="block text-gray-700 mb-1">
              {{ t("survey.form.serialNumber") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="serialNumber"
              v-model="form.serial_number"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.serialNumberPlaceholder')"
              aria-label="Equipment Serial Number"
              readonly
            />
            <HasError
              :form="form"
              field="serial_number"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Source -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="source" class="block text-gray-700 mb-1">
              {{ t("survey.form.source") }}
            </label>
            <input
              id="source"
              v-model="form.source"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.sourcePlaceholder')"
              aria-label="Source"
              readonly
            />
            <HasError
              :form="form"
              field="source"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Brand -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="brand" class="block text-gray-700 mb-1">
              {{ t("survey.form.brand") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="brand"
              v-model="form.brand"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.brandPlaceholder')"
              aria-label="Brand"
              readonly
            />
            <HasError :form="form" field="brand" class="text-red-500 text-xs" />
          </div>

          <!-- Model -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="model" class="block text-gray-700 mb-1">
              {{ t("survey.form.model") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="model"
              v-model="form.model"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.modelPlaceholder')"
              aria-label="Model"
              readonly
            />
            <HasError :form="form" field="model" class="text-red-500 text-xs" />
          </div>

          <!-- Category -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="category" class="block text-gray-700 mb-1">
              {{ t("survey.form.category") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="category"
              v-model="form.category"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.categoryPlaceholder')"
              aria-label="Category"
              readonly
            />
            <HasError
              :form="form"
              field="category"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- State -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="state" class="block text-gray-700 mb-1">
              {{ t("survey.form.state") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <div class="relative">
              <input
                id="state"
                v-model="form.state.name"
                type="text"
                class="w-full p-2 border rounded-lg pl-7"
                :placeholder="t('survey.form.statePlaceholder')"
                aria-label="State"
                readonly
              />
              <font-awesome-icon
                :icon="['fas', 'circle']"
                :style="{
                  color: form.state.color}"
                class="absolute top-1/2 left-2 transform -translate-y-1/2"
              />
            </div>
          </div>

          

          <!-- Supplier -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="supplier" class="block text-gray-700 mb-1">
              {{ t("survey.form.supplier") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <input
              id="supplier"
              v-model="form.supplier"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.supplierPlaceholder')"
              aria-label="Supplier"
              readonly
            />
            <HasError
              :form="form"
              field="supplier"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Organization/Unit -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="assignment" class="block text-gray-700 mb-1">
              {{ t("survey.form.assignment") }}
            </label>
            <input
              id="assignment"
              v-model="form.organization_unit"
              type="text"
              class="w-full p-2 border rounded-lg"
              :placeholder="t('survey.form.assignmentPlaceholder')"
              aria-label="Assignment"
              readonly
            />
            <HasError
              :form="form"
              field="organization_unit"
              class="text-red-500 text-xs"
            />
          </div>

          <!-- Acquisition Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="acquisitionDate" class="block text-gray-700 mb-1">
              {{ t("survey.form.acquisitionDate") }}
            </label>
            <input
              id="acquisitionDate"
              v-model="form.acquisition_date"
              type="text"
              class="w-full p-2 border rounded-lg"
              aria-label="Acquisition Date"
              :placeholder="t('survey.form.acquisitionDatePlaceholder')"
              readonly
            />
          </div>

          <!-- Status -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
            <label for="status" class="block text-gray-700 mb-1">
              {{ t("survey.form.status") }}
              <span class="text-red-500 text-md">*</span>
            </label>
            <div class="relative">
              <input
                id="status"
                v-model="form.status.name"
                type="text"
                class="w-full p-2 border rounded-lg pl-7"
                :placeholder="t('survey.form.statusPlaceholder')"
                aria-label="Status"
                readonly
              />
              <font-awesome-icon
                :icon="['fas', 'circle']"
                :style="{
                  color: form.status.color}"
                class="absolute top-1/2 left-2 transform -translate-y-1/2"
              />
            </div>
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
