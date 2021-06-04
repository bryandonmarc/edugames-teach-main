<template>
  <!-- overlay -->
  <div
    id="modal_overlay"
    class="absolute inset-0 items-start justify-center w-full h-screen pt-10 bg-black bg-opacity-30 md:items-center md:pt-0"
    :class="[toggle ? 'flex' : 'hidden']"
  >
    <!-- modal -->
    <div
      id="modal"
      class="relative transition-opacity transition-transform duration-300 transform bg-white rounded shadow-lg"
      :class="[toggle ? '' : 'opacity-0 -translate-y-full scale-150']"
    >
      <FormulateForm v-model="studentSession" @submit="submitHandler">
        <!-- button close -->
        <a
          @click="$emit('closed')"
          class="absolute w-10 h-10 text-2xl text-center text-white bg-red-500 rounded-full cursor-pointer -top-3 -right-3 hover:bg-red-600 focus:outline-none"
        >
          &cross;
        </a>

        <!-- header -->
        <div class="px-4 py-3 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-600">Add Session</h2>
        </div>

        <!-- body -->
        <div class="w-full p-3 mb-20">
          <div
            class="p-6 bg-white rounded-md shadow md:grid md:grid-cols-3 md:gap-6"
          >
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium text-gray-900">Search Class</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Search for a class using the code your teacher has given you!
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="px-4 py-5">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                      for="topic"
                    >
                      <span>Classroom Code</span>
                    </label>
                    <div class="flex">
                      <FormulateInput
                        v-model="sessionId"
                        name="sessionId"
                        type="text"
                        validation="required:trim"
                        input-class="session-code"
                      />
                      <a
                        class="p-3 px-8 font-bold text-white uppercase bg-purple-500 rounded-r-lg focus:outline-none active:outline-none"
                        @click="search"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="block">
            <div class="py-8"><div class="border-t border-gray-200"></div></div>
          </div>
          <div
            class="p-6 bg-white rounded-md shadow md:grid md:grid-cols-3 md:gap-6"
          >
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium text-gray-900">Class Details</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Here's the class you've inputted! Check it if its correct, and
                  click add
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="px-4 py-5">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                      for="className"
                    >
                      <span>Class Name</span>
                    </label>
                    <FormulateInput
                      name="className"
                      validation-name="Class Name"
                      placeholder="CS134-1P B56"
                      type="text"
                      validation="required:trim"
                      readonly
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-4">
                    <label
                      class="block text-sm font-medium text-gray-700"
                      for="topic"
                    >
                      <span>Topic</span>
                    </label>
                    <FormulateInput
                      name="topic"
                      placeholder="SOFTWARE ENGINEERING 1-Section B56"
                      type="text"
                      validation="required:trim"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="block">
            <div class="py-8"><div class="border-t border-gray-200"></div></div>
          </div>
          <div
            class="p-6 bg-white rounded-md shadow md:grid md:grid-cols-3 md:gap-6"
          >
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium text-gray-900">
                  Here's the class you've searched for!
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                  Check it if its correct, and click the Add button below.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="px-4 py-5">
                <ul class="grid grid-cols-6 gap-6">
                  <ClassCard
                    class="col-span-6 p-4 transition duration-300 ease-in-out delay-150 scale-110 bg-purple-100 border-2 border-purple-600 rounded-lg cursor-pointer md:col-span-3 ring-2 ring-purple-400 transform-gpu"
                    :session="session"
                    :img-url="session.imgUrl"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- footer -->
        <div
          class="absolute bottom-0 left-0 flex items-center justify-end w-full gap-3 px-4 py-3 border-t border-gray-200"
        >
          <button class="formulate-button" :disabled="checkError">Add</button>
          <a
            @click="$emit('closed')"
            class="px-4 py-2 text-center text-white bg-red-500 rounded cursor-pointer hover:bg-red-600 focus:outline-none"
          >
            Close
          </a>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sessionId: '',
      session: {},
      valid: false,
      studentSession: {},
    }
  },
  computed: {
    checkError() {
      if (!this.valid) return true
      return false
    },
  },
  methods: {
    ...mapActions('session', ['searchStudentSession', 'addStudentSession']),
    async submitHandler(data) {
      try {
        console.log(data)
        await this.addStudentSession(data)
        this.$toast.success(
          'You have been successfully enrolled to this class!'
        )
      } catch (error) {
        this.$toast.error('An error occured. ' + error)
      }
    },
    async search() {
      try {
        this.session = await this.searchStudentSession(this.sessionId)
        this.studentSession.className = this.session.className
        this.studentSession.topic = this.session.topic
        this.valid = true
      } catch (error) {
        this.valid = false
        this.$toast.error(error.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.formulate-input::v-deep {
  .formulate-input-wrapper {
    .formulate-input-element {
      input[type='text'] {
        @apply w-full py-2 px-1 mt-2 rounded-md bg-gray-50;

        &:focus,
        &:active {
          @apply mb-1 border-2 border-purple-400 outline-none ring-4 ring-purple-300 ring-opacity-50;
        }

        &.has-error {
          @apply mb-1 border-2 border-red-400 ring-4 ring-red-300 ring-opacity-50;
        }

        &.is-valid {
          @apply mb-1 border-2 border-green-400 ring-4 ring-green-300 ring-opacity-50;
        }
      }

      .session-code {
        margin: 0 !important;
        border-right-width: 0 !important;
        padding: 0.75rem !important;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;

        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
          var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
          calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;

        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000) !important;
      }
    }
  }

  .formulate-input-errors {
    .formulate-input-error {
      @apply text-xs text-red-500;
    }
  }
}

button.formulate-button {
  @apply px-12 py-3 text-xs font-bold tracking-widest uppercase rounded-full bg-purple-500 text-white outline-none;

  &:disabled {
    @apply font-bold bg-gray-400 opacity-50 pointer-events-none select-none;
  }
}
</style>
