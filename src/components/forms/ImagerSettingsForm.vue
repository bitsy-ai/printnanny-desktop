<template>
  <Form
    v-slot="{ errors }"
    class="space-y-8 divide-y divide-gray-200"
    :validation-schema="schema"
    :initial-values="initialValues"
    @submit="onSubmit"
  >
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">
        <div class="pt-4">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Hostname, Authentication & SSH
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Set a hostname, username, password, and/or ssh key for your
              Raspberry Pi.
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label
                for="hostname"
                class="block text-sm font-medium text-gray-700"
                >Set hostname</label
              >
              <div class="mt-1 flex rounded-md shadow-sm">
                <Field
                  id="hostname"
                  type="text"
                  name="hostname"
                  class="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <span
                  class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                  >.local</span
                >
              </div>
              <ErrorMessage name="hostname" class="text-sm text-red-500" />
            </div>

            <div class="sm:col-span-3">
              <div class="mt-1">
                <div class="sm:col-span-3">
                  <label
                    for="username"
                    class="block text-sm font-medium text-gray-700"
                    >Username</label
                  >
                  <div class="mt-1">
                    <Field
                      id="username"
                      type="text"
                      name="username"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <ErrorMessage name="username" class="text-sm text-red-500" />
            </div>
            <div class="sm:col-span-3">
              <div class="mt-1">
                <div class="sm:col-span-3">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                  >
                  <div class="mt-1">
                    <Field
                      id="password"
                      :type="passwordFieldType"
                      name="password"
                      :value="store.form.password"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div class="relative flex items-start mt-1">
                    <div class="flex h-5 items-center">
                      <Field
                        id="showPassword"
                        v-slot="{ field }"
                        type="checkbox"
                        name="showPassword"
                        :standalone="true"
                        :value="false"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      >
                        <input
                          type="checkbox"
                          name="showPassword"
                          v-bind="field"
                          :value="false"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          @change="() => onPasswordShow(field.checked)"
                        />
                      </Field>
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="showPassword"
                        class="font-medium text-gray-700"
                        >Show password</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <ErrorMessage name="password" class="text-sm text-red-500" />
            </div>
            <div class="sm:col-span-6">
              <div class="relative flex items-start">
                <div class="flex h-5 items-center">
                  <Field
                    id="enableSSH"
                    :value="store.form.enableSSH"
                    name="enableSSH"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  ></Field>
                </div>
                <div class="ml-3 text-sm">
                  <label for="enableSSH" class="font-medium text-gray-700"
                    >Enable SSH</label
                  >
                  <p class="text-gray-500">
                    Secure Shell (SSH) allows you to log into your Raspberry Pi
                    from a terminal on another computer.
                  </p>
                </div>
              </div>
            </div>
            <div class="sm:col-span-6">
              <label for="about" class="block text-sm font-medium text-gray-700"
                >Authorized SSH Keys</label
              >
              <div class="mt-1">
                <Field
                  id="sshAuthorizedKeys"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  as="textarea"
                  name="sshAuthorizedKeys"
                  rows="3"
                  :disabled="store.form.enableSSH == false"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Sets the public key contents of ~/.ssh/authorized_keys
              </p>
            </div>
            <div class="sm:col-span-6">
              <div class="relative flex items-start">
                <div class="flex h-5 items-center">
                  <Field
                    id="disableSSHPassword"
                    name="disableSSHPassword"
                    type="checkbox"
                    :value="store.form.disableSSHPassword"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="disableSSHPassword"
                    class="font-medium text-gray-700"
                    >Allow public-key authentication only</label
                  >
                  <p class="text-gray-500">
                    You should set at least one authorized SSH key if you
                    disable this option, or you will be unable to log into your
                    Pi via SSH.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Wireless LAN
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Configure wifi network information. Your network password is never
              shared with PrintNanny.
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <div class="mt-1">
                <div class="sm:col-span-3">
                  <label
                    for="wifiSSID"
                    class="block text-sm font-medium text-gray-700"
                    >Network SSID</label
                  >
                  <div class="mt-1">
                    <Field
                      id="wifiSSID"
                      type="text"
                      name="wifiSSID"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div class="relative flex items-start mt-1">
                    <div class="flex h-5 items-center">
                      <Field
                        id="wifiSSIDHidden"
                        type="checkbox"
                        name="wifiSSIDHidden"
                        :standalone="true"
                        :value="false"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="wifiSSIDHidden"
                        class="font-medium text-sm text-gray-500"
                        >SSID is hidden (does not broadcast)</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <div class="mt-1">
                <div class="sm:col-span-3">
                  <label
                    for="wifiPassword"
                    class="block text-sm font-medium text-gray-700"
                    >Network Password</label
                  >
                  <div class="mt-1">
                    <Field
                      id="wifiPassword"
                      :type="wifiPasswordFieldType"
                      name="wifiPassword"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div class="relative flex items-start mt-1">
                    <div class="flex h-5 items-center">
                      <Field
                        id="showWifiPassword"
                        v-slot="{ field }"
                        type="checkbox"
                        name="showWifiPassword"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        :standalone="true"
                        :value="false"
                      >
                        <input
                          type="checkbox"
                          name="showWifiPassword"
                          v-bind="field"
                          :value="false"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          @change="() => onWifiPasswordShow(field.checked)"
                        />
                      </Field>
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="showWifiPassword"
                        class="font-medium text-sm text-gray-500"
                        >Show wifi password</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Locale Settings
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Configure keyboard layout and timezone.
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="timezone"
                class="block text-sm font-medium text-gray-700"
                >Set timezone</label
              >
              <div class="mt-1">
                <Field
                  id="timezone"
                  v-slot="{ value }"
                  name="timezone"
                  as="select"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>Select timezone</option>
                  <option
                    v-for="timezone in TIMEZONES"
                    :key="timezone"
                    :value="timezone"
                    :selected="value == timezone"
                  >
                    {{ timezone }}
                  </option>
                </Field>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="keyboardLayout"
                class="block text-sm font-medium text-gray-700"
                >Set keyboard layout</label
              >
              <div class="mt-1">
                <Field
                  id="keyboardLayout"
                  v-slot="{ value }"
                  name="keyboardLayout"
                  as="select"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>Select keyboard layout</option>
                  <option
                    v-for="item in KEYBOARD_LAYOUTS"
                    :key="item"
                    :value="item"
                    :selected="value == item"
                  >
                    {{ item }}
                  </option>
                </Field>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-4">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Privacy & Video Data Streaming
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Configure privacy preferences. You can change these settings at any
            time in
            <a
              href="https://printnanny.ai/devices"
              class="text-indigo-500 hover:text-indigo-600"
              >PrintNanny's Dashboard</a
            >. To learn more about the type of data collected,<a
              href="https://printnanny.ai/privacy/"
              class="text-indigo-500 hover:text-indigo-600 text-sm mt-2"
              target="_blank"
            >
              view the Privacy Policy</a
            >.
          </p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <div class="relative flex items-start mt-5 mb-5">
              <div class="flex h-5 items-center">
                <Field
                  id="enableTelemetry"
                  type="checkbox"
                  name="enableTelemetry"
                  :value="store.form.enableTelemetry"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div class="ml-3 text-sm">
                <label
                  for="enableTelemetry"
                  class="font-medium text-sm text-gray-500"
                  ><strong>Improve PrintNanny using my data</strong></label
                >
                <p class="text-gray-500">
                  Allow PrintNanny to use anonymized telemetry data to improve
                  the product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <span v-if="Object.keys(errors).length > 0" class="text-sm text-red-500">
        <p>Please correct the following errors:</p>
        <ol>
          <li v-for="error in Object.values(errors)">- {{ error }}</li>
        </ol>
      </span>
      <div class="flex justify-end">
        <button
          type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { ref, toRaw } from "vue";
import {
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Dialog,
} from "@headlessui/vue";
import * as yup from "yup";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { COUNTRY_CODES } from "@/utils/imager/country";
import { TIMEZONES } from "@/utils/imager/timezone";
import { KEYBOARD_LAYOUTS } from "@/utils/imager/keyboard";
import { useSettingsStore } from "@/stores/settings";
import { configure, useForm, Field, ErrorMessage, Form } from "vee-validate";
import { CloudInitForm } from "@/utils/cloudInit";

const props = defineProps({
  onSave: {
    type: Function,
    default: (form: CloudInitForm) => {
      console.log("Closing form");
    },
  },
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnModelUpdate: true,
});

const store = useSettingsStore();

const initialValues = toRaw(store.form);
console.log("Initializing form with values:", initialValues);

const wifiPasswordFieldType = ref("password");

function onWifiPasswordShow(value: boolean | undefined) {
  if (value == true) {
    wifiPasswordFieldType.value = "text";
  } else {
    wifiPasswordFieldType.value = "password";
  }
}

const passwordFieldType = ref("password");
function onPasswordShow(value: boolean | undefined) {
  if (value == true) {
    passwordFieldType.value = "text";
  } else {
    passwordFieldType.value = "password";
  }
}

async function onSubmit(values: any) {
  console.log("Form was submitted with values", values);
  const encryptedFormValues = await store.saveForm(values as CloudInitForm);
  console.log("Encrypted values", encryptedFormValues);
  props.onSave(store.form);
}

// define a validation schema
const schema = yup.object({
  hostname: yup
    .string()
    .required()
    .matches(/^[a-z0-9-]+$/i)
    .default("printnanny"),
  enableSSH: yup.bool(),
  saveSettings: yup.bool(),
  username: yup
    .string()
    .required()
    .matches(/^[a-z0-9]+$/i)
    .default("pi"),
  password: yup.string().required().default("raspberry"),
  disableSSHPassword: yup.bool(),
  sshAuthorizedKeys: yup.string(),
  wifiSSIDHidden: yup.bool(),
  wifiSSID: yup.string(),
  wifiPassword: yup.string(),
  wifiCountry: yup.string().oneOf(COUNTRY_CODES),
  timezone: yup.string().oneOf(TIMEZONES),
  keyboardLayout: yup.string().oneOf(KEYBOARD_LAYOUTS),
  enableRemoteVideo: yup.bool(),
  enableTelemetry: yup.bool(),
});
</script>
