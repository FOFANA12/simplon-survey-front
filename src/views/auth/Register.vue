<template>
  <div class="min-h-screen auth-layout-container">
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      <!-- Colonne gauche : Description -->
      <div class="hidden lg:flex flex-col justify-center px-6 col-span-1">
        <h1 class="text-3xl font-bold mb-4">
          Bienvenue sur notre plateforme d'évaluation numérique
        </h1>
        <p class="mt-6 text-lg leading-relaxed">
          Cette plateforme vous aide à analyser vos capacités numériques et
          identifier les domaines clés à améliorer pour une transformation
          réussie.
        </p>
        <p class="mt-6 text-sm text-black-200">
          Conçue avec une simplicité d'utilisation, elle permet une collecte et
          une analyse rapide des données grâce à des formulaires dynamiques et
          personnalisables.
        </p>
        <div class="hidden lg:block mt-6">
          <a
            href="https://simplon.sn"
            target="_blank"
            class="text-3xl text-primary font-bold"
            >Powered by Simplon</a
          >
        </div>
      </div>

      <!-- Colonne droite : Formulaire -->
      <div class="flex flex-col items-center justify-center col-span-2">
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.namePlaceholder')"
                    aria-label="Company Name"
                  />
                  <HasError
                    :form="form"
                    field="name"
                    class="text-red-500 text-xs"
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.activityPlaceholder')"
                    aria-label="Company Activity"
                  />
                  <HasError
                    :form="form"
                    field="activity"
                    class="text-red-500 text-xs"
                  />
                </div>

                <!-- Number of Employees -->
                <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                  <label
                    for="numberOfEmployees"
                    class="block text-gray-700 mb-1"
                  >
                    {{ t("company.form.numberOfEmployees") }}
                    <span class="text-red-500 text-md">*</span>
                  </label>
                  <input
                    id="numberOfEmployees"
                    v-model="form.number_of_employees"
                    type="text"
                    class="w-full p-2 border rounded-lg"
                    :placeholder="
                      t('company.form.numberOfEmployeesPlaceholder')
                    "
                    aria-label="Number of Employees"
                  />
                  <HasError
                    :form="form"
                    field="number_of_employees"
                    class="text-red-500 text-xs"
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.phonePlaceholder')"
                    aria-label="Company Phone"
                  />
                  <HasError
                    :form="form"
                    field="phone"
                    class="text-red-500 text-xs"
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.emailPlaceholder')"
                    aria-label="Company Email"
                  />
                  <HasError
                    :form="form"
                    field="email"
                    class="text-red-500 text-xs"
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.websitePlaceholder')"
                    aria-label="Company Website"
                  />
                  <HasError
                    :form="form"
                    field="website"
                    class="text-red-500 text-xs"
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.addressPlaceholder')"
                    aria-label="Company Address"
                  />
                  <HasError
                    :form="form"
                    field="address"
                    class="text-red-500 text-xs"
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.cityPlaceholder')"
                    aria-label="Company City"
                  />
                  <HasError
                    :form="form"
                    field="city"
                    class="text-red-500 text-xs"
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.zipCodePlaceholder')"
                    aria-label="Company Zip Code"
                  />
                  <HasError
                    :form="form"
                    field="zip_code"
                    class="text-red-500 text-xs"
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
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('company.form.countryPlaceholder')"
                    aria-label="Company Country"
                  />
                  <HasError
                    :form="form"
                    field="country"
                    class="text-red-500 text-xs"
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
                  />
                  <label for="status" class="text-gray-700">
                    {{ t("common.form.status") }}
                  </label>
                </div>
              </div>
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

const props = defineProps({
  edit: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
