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
              <!-- Name -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="name" class="block text-gray-700 mb-1">
                  {{ t("settings.user.form.name") }}
                  <span class="text-red-500 text-md">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('settings.user.form.namePlaceholder')"
                  aria-label="Name"
                />
                <HasError
                  :form="form"
                  field="name"
                  class="text-red-500 text-xs"
                />
              </div>

              <!-- Email -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="email" class="block text-gray-700 mb-1">
                  {{ t("settings.user.form.email") }}
                  <span class="text-red-500 text-md">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('settings.user.form.emailPlaceholder')"
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
                  {{ t("settings.user.form.phone") }}
                  <span class="text-red-500 text-md">*</span>
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('settings.user.form.phonePlaceholder')"
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
                  {{ t("settings.user.form.lang") }}
                  <span class="text-red-500 text-md">*</span>
                </label>

                <v-select
                  v-model="form.lang"
                  :options="store.languages"
                  label="name"
                  value="code"
                  :reduce="(l) => l.code"
                  :placeholder="t('settings.user.form.langPlaceholder')"
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

              <!-- Job Title -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4" v-if="form.is_employee">
                <label for="jobTitle" class="block text-gray-700 mb-1">
                  {{ t("employee.form.jobTitle") }}
                </label>
                <input
                  id="jobTitle"
                  v-model="form.job_title"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('employee.form.jobTitlePlaceholder')"
                  aria-label="Employee Job Title"
                />
                <HasError
                  :form="form"
                  field="job_title"
                  class="text-red-500 text-xs"
                />
              </div>

              <!-- Floor -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4" v-if="form.is_employee">
                <label for="floor" class="block text-gray-700 mb-1">
                  {{ t("employee.form.floor") }}
                </label>
                <input
                  id="floor"
                  v-model="form.floor"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('employee.form.floorPlaceholder')"
                  aria-label="Employee Floor"
                />
                <HasError
                  :form="form"
                  field="floor"
                  class="text-red-500 text-xs"
                />
              </div>

              <!-- Office -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4" v-if="form.is_employee">
                <label for="office" class="block text-gray-700 mb-1">
                  {{ t("employee.form.office") }}
                </label>
                <input
                  id="office"
                  v-model="form.office"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('employee.form.officePlaceholder')"
                  aria-label="Employee Office"
                />
                <HasError
                  :form="form"
                  field="office"
                  class="text-red-500 text-xs"
                />
              </div>

              <!-- Organization Unit -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4" v-if="form.is_employee">
                <label for="organizationUnit" class="block text-gray-700 mb-1">
                  {{ t("employee.form.organizationUnit") }}
                </label>
                <input
                  id="organizationUnit"
                  v-model="form.organization_unit"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('employee.form.organizationUnitPlaceholder')"
                  aria-label="Employee Organization Unit"
                  readonly
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
              <div class="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <label for="role" class="block text-gray-700 mb-1">
                  {{ t("settings.user.form.role") }}
                </label>
                <input
                  id="role"
                  v-model="form.role"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  :placeholder="t('settings.user.form.rolePlaceholder')"
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
