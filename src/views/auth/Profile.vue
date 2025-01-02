<template>
  <div>
    <BreadcrumbNavigation
      :breadcrumbs="breadcrumbs"
      :pageTitle="t('profile.breadTitle')"
    />

    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4">
        <LoadingButton
          :busy="form.busy"
          customClass="min-w-[100px] bg-blue-500 text-white py-2 px-3 hover:bg-blue-600 transition-all"
        >
          <template #default>{{ t("common.buttons.save") }}</template>
          <template #loading>{{ t("common.buttons.processing") }}</template>
        </LoadingButton>
      </div>

      <div class="card mt-4">
        <div class="w-full mx-auto bg-white shadow-sm rounded-lg">
          <div class="card-header">
            <h2 class="text-xl p-4 pt-2 pb-2">
              {{ t("profile.sections.personalInformation") }}
            </h2>
            <hr class="border-t border-gray-200 w-full mb-0" />
          </div>
          <div class="card-body p-4">
            <div class="grid grid-cols-12 gap-4">
              <!-- First Name -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="firstName" class="block text-gray-700 mb-1">
                  {{ t("profile.form.firstName") }}
                  <span class="text-red-500 text-md">*</span>
                </label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('profile.form.firstNamePlaceholder')"
                  aria-label="First Name"
                />
                <HasError
                  :form="form"
                  field="firstName"
                  class="text-red-500 text-xs"
                />
              </div>

              <!-- Last Name -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="lastName" class="block text-gray-700 mb-1">
                  {{ t("profile.form.lastName") }}
                  <span class="text-red-500 text-md">*</span>
                </label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('profile.form.lastNamePlaceholder')"
                  aria-label="Last Name"
                />
                <HasError
                  :form="form"
                  field="lastName"
                  class="text-red-500 text-xs"
                />
              </div>

              <!-- Email -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="email" class="block text-gray-700 mb-1">
                  {{ t("profile.form.email") }}
                  <span class="text-red-500 text-md">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('profile.form.emailPlaceholder')"
                  aria-label="Email"
                />
                <HasError
                  :form="form"
                  field="email"
                  class="text-red-500 text-xs"
                />
              </div>

              <!-- Phone -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="phone" class="block text-gray-700 mb-1">
                  {{ t("profile.form.phone") }}
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('profile.form.phonePlaceholder')"
                  aria-label="Phone"
                />
                <HasError
                  :form="form"
                  field="phone"
                  class="text-red-500 text-xs"
                />
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

                <HasError
                  :form="form"
                  field="lang"
                  class="text-red-500 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mx-auto bg-white shadow-sm rounded-lg mt-6">
          <div class="card-header">
            <h2 class="text-xl p-4 pt-2 pb-2">
              {{ t("profile.sections.security") }}
            </h2>
            <hr class="border-t border-gray-200 w-full mb-0" />
          </div>
          <div class="card-body p-4">
            <div class="grid grid-cols-12 gap-4">
              <!-- Role -->
              <div
                class="col-span-12 md:col-span-6 lg:col-span-4 mb-4"
                v-if="!form.company"
              >
                <label for="role" class="block text-gray-700 mb-1">
                  {{ t("profile.form.role") }}
                </label>
                <input
                  id="role"
                  v-model="form.role"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('profile.form.rolePlaceholder')"
                  aria-label="Role"
                  readonly
                />
              </div>

              <!-- Password -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="password" class="block text-gray-700 mb-1">
                  {{ t("profile.form.password") }}
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('profile.form.passwordPlaceholder')"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label="Toggle Password Visibility"
                  >
                    <font-awesome-icon
                      :icon="showPassword ? 'eye-slash' : 'eye'"
                      class="text-gray-400"
                    />
                  </button>
                </div>

                <HasError
                  :form="form"
                  field="password"
                  class="text-red-500 text-xs"
                />
              </div>

              <!-- Password Confirmation -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="password_confirm" class="block text-gray-700 mb-1">
                  {{ t("profile.form.passwordConfirm") }}
                </label>
                <div class="relative">
                  <input
                    id="password_confirm"
                    v-model="form.password_confirm"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="w-full p-2 border rounded-lg"
                    :placeholder="t('profile.form.passwordConfirmPlaceholder')"
                    aria-label="Password Confirmation"
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label="Toggle Password Confirmation Visibility"
                  >
                    <font-awesome-icon
                      :icon="showConfirmPassword ? 'eye-slash' : 'eye'"
                      class="text-gray-400"
                    />
                  </button>
                </div>
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

      <div
        class="w-full mx-auto bg-white shadow-sm rounded-lg mt-6"
        v-if="form.company"
      >
        <div class="card-header">
          <h2 class="text-xl p-4 pt-2 pb-2">
            {{ t("profile.sections.company") }}
          </h2>
          <hr class="border-t border-gray-200 w-full mb-0" />
        </div>
        <div class="card-body p-4">
          <div class="grid grid-cols-12 gap-4">
            <!-- Name -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
              <label for="name" class="block text-gray-700 mb-1">
                {{ t("company.form.name") }}
              </label>
              <input
                id="name"
                v-model="form.company.name"
                type="text"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.namePlaceholder')"
                aria-label="Company Name"
                readonly
              />
            </div>

            <!-- Activity -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
              <label for="activity" class="block text-gray-700 mb-1">
                {{ t("company.form.activity") }}
              </label>
              <input
                id="activity"
                v-model="form.company.activity"
                type="text"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.activityPlaceholder')"
                aria-label="Activity"
                readonly
              />
            </div>

            <!-- Number of Employees -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
              <label for="numberOfEmployees" class="block text-gray-700 mb-1">
                {{ t("company.form.numberOfEmployees") }}
              </label>
              <input
                id="numberOfEmployees"
                v-model="form.company.numberOfEmployees"
                type="text"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.numberOfEmployeesPlaceholder')"
                aria-label="Number of Employees"
                readonly
              />
            </div>

            <!-- Phone -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
              <label for="phone" class="block text-gray-700 mb-1">
                {{ t("company.form.phone") }}
              </label>
              <input
                id="phone"
                v-model="form.company.phone"
                type="text"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.phonePlaceholder')"
                aria-label="Phone"
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
                v-model="form.company.email"
                type="email"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.emailPlaceholder')"
                aria-label="Email"
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
                v-model="form.company.website"
                type="url"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.websitePlaceholder')"
                aria-label="Website"
                readonly
              />
            </div>

            <!-- Address -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
              <label for="address" class="block text-gray-700 mb-1">
                {{ t("company.form.address") }}
              </label>
              <input
                id="address"
                v-model="form.company.address"
                type="text"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.addressPlaceholder')"
                aria-label="Address"
                readonly
              />
            </div>

            <!-- City -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
              <label for="city" class="block text-gray-700 mb-1">
                {{ t("company.form.city") }}
              </label>
              <input
                id="city"
                v-model="form.company.city"
                type="text"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.cityPlaceholder')"
                aria-label="City"
                readonly
              />
            </div>

            <!-- Zip Code -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
              <label for="zipCode" class="block text-gray-700 mb-1">
                {{ t("company.form.zipCode") }}
              </label>
              <input
                id="zipCode"
                v-model="form.company.zipCode"
                type="text"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.zipCodePlaceholder')"
                aria-label="Zip Code"
                readonly
              />
            </div>

            <!-- Country -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
              <label for="country" class="block text-gray-700 mb-1">
                {{ t("company.form.country") }}
              </label>
              <input
                id="country"
                v-model="form.company.country"
                type="text"
                class="w-full p-2 border rounded-lg"
                :placeholder="t('company.form.countryPlaceholder')"
                aria-label="Country"
                readonly
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store";
import { useSwalAlerte } from "@/composables/useSwalAlerte";
const store = useAuthStore();
const { showSimpleAlerte } = useSwalAlerte();

const { locale: currentLocale } = useI18n();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const breadcrumbs = [
  {
    title: "sidebar.dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "profile.breadActive",
    disabled: true,
    to: {
      name: "profile",
    },
  },
];

const form = store.form;
form.reset();
form.clear();

store.getProfil();

const onSubmit = () => {
  store
    .updateProfil()
    .then((resp) => {
      showSimpleAlerte({ icon: "success", text: resp.data.message });
    })
    .catch(() => {});
};
</script>
