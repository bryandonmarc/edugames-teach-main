<template>
  <main
    class="flex-1 px-10 pt-2 pb-2 my-1 overflow-y-auto transition duration-500 ease-in-out bg-gray-200 rounded-l-lg dark:bg-black"
  >
    <div class="flex flex-col mt-3 text-3xl capitalize">
      <span class="font-semibold">Enrolled Classes</span>
    </div>
    <ul
      v-if="getSessions.length"
      class="py-10 mx-auto sm:px-6 lg:px-8 md:grid md:grid-cols-3 md:gap-6"
      style="max-width: 80rem"
    >
      <nuxt-link
        v-for="(session, index) in getSessions.filter(
          (session) => session.id !== 'sweet-snow-5368'
        )"
        :key="index"
        :to="'/student/session/' + session.id"
      >
        <ClassCard :random="index" :session="session" />
      </nuxt-link>
      <li
        class="flex w-full h-full p-4 mt-2 overflow-y-auto"
        style="min-height: 16.5rem"
      >
        <button
          class="flex items-center justify-center flex-grow w-full h-auto bg-gray-300 bg-opacity-25 border-4 border-gray-500 border-opacity-50 border-dashed rounded-lg"
          @click="toggleModal"
        >
          <h3 class="font-bold text-gray-500 text-opacity-50">
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-24 h-24 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> -->
            + Add Class
          </h3>
        </button>
      </li>
    </ul>
    <div v-else class="py-10 mx-auto sm:px-6 lg:px-8" style="max-width: 80rem">
      <button
        class="flex items-center justify-center flex-grow w-full h-auto bg-gray-300 bg-opacity-25 border-4 border-gray-500 border-opacity-50 border-dashed rounded-lg"
        style="min-height: 16.5rem"
        @click="toggleModal"
      >
        <h3 class="font-bold text-gray-500 text-opacity-50">
          <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-24 h-24 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> -->
          + Create your first class!
        </h3>
      </button>
    </div>
    <SessionModal :toggle="modalToggle" @closed="toggleModal" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout(context) {
    return 'homeStudentLayout'
  },
  data() {
    return {
      modalToggle: false,
    }
  },
  computed: {
    ...mapGetters('session', ['getSessions']),
  },
  methods: {
    checkVerifiedStatus(event) {
      if (!this.$fire.auth.currentUser.emailVerified) {
        this.$toast.error(
          'To access this feature, please verify your email first, then log out and log in again!'
        )
        event.preventDefault()
      }
    },
    toggleModal() {
      this.modalToggle = !this.modalToggle
    },
  },
}
</script>

<style lang="scss" scoped></style>
