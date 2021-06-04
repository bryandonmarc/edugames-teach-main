<template>
  <FormulateInput
    input-class="formulate-textfield"
    name="password"
    :validation="isSignup ? item.rules : 'required:trim'"
    placeholder="Password"
    :type="isVisible ? 'text' : 'password'"
    input-is-valid-class="is-valid"
    input-has-errors-class="has-error"
    :validation-rules="isSignup ? item.validationRule : {}"
    :validation-messages="isSignup ? item.validationMessage : {}"
    error-behavior="value"
  >
    <template #suffix>
      <i class="absolute -translate-x-8 translate-y-1 transform-gpu">
        <FormulateInput
          type="checkbox"
          v-model="isVisible"
          input-class="invisible"
        >
          <template #suffix>
            <div
              class="absolute -translate-x-1 -translate-y-1 cursor-pointer transform-gpu"
              @click="isVisible = !isVisible"
            >
              <svg
                v-if="!isVisible"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
            </div>
          </template>
        </FormulateInput>
      </i>
    </template>
  </FormulateInput>
</template>

<script>
export default {
  props: {
    isSignup: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isVisible: false,
      item: {
        rules: 'required:trim|min:8|strong',
        validationRule: {
          strong: ({ value }) =>
            value.match(
              `((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$`
            ),
        },
        validationMessage: {
          strong:
            'Password must contain at least 1 upper case letter, 1 lower case letter, and 1 number or special character.',
        },
      },
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
      console.log('toggled!')
    },
  },
}
</script>

<style></style>
