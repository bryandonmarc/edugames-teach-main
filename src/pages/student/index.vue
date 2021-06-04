<template>
  <!-- component -->
  <main
    class="flex-1 px-10 pt-2 pb-2 my-1 overflow-y-auto transition duration-500 ease-in-out bg-gray-200 rounded-l-lg dark:bg-black"
  >
    <div class="flex flex-col mt-3 text-3xl capitalize">
      <span class="font-semibold"
        >hello,
        <span class="font-normal">{{ getAuthUser.displayName }}</span>
      </span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div
        class="flex flex-col flex-shrink-0 w-full py-2 my-4 mr-6 bg-white rounded-lg dark:bg-gray-600"
      >
        <!-- Card list container -->

        <h3
          class="flex items-center px-8 pt-1 pb-1 text-lg font-semibold capitalize dark:text-gray-300"
        >
          <!-- Header -->
          <span>Upcoming Activities</span>
          <button class="ml-2">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 256 512">
              <path
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
								0l-22.6-22.6c-9.4-9.4-9.4-24.6
								0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
								0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
								136c9.5 9.4 9.5 24.6.1 34z"
              ></path>
            </svg>
          </button>
        </h3>

        <div>
          <!-- List -->
          <ul
            v-if="getActivities.length"
            class="py-4 space-y-4 overflow-y-auto hide-scroll-bar"
            style="max-height: 60vh"
          >
            <ActivityCard
              v-for="(activity, index) in getActivities
                .slice()
                .sort((a, b) => new Date(a.endTime) - new Date(b.endTime))
                .filter((a) => new Date(a.endTime) > new Date())
                .filter((activity) => activity.id !== 'flat-dew-2511')
                .filter((activity) =>
                  getScoresGrouped.some(
                    (score) =>
                      score.studentID === getAuthUser.email &&
                      score.activityID === activity.id
                  )
                    ? +getScoresGrouped.find(
                        (score) =>
                          score.studentID === getAuthUser.email &&
                          score.activityID === activity.id
                      ).score /
                        +overall(activity.sessionId, activity.id) <
                      0.6
                    : true
                )"
              :key="index"
              class="px-4"
              v-bind="{
                id: activity.id,
                classCode: activity.sessionId,
                className: getSessionById(activity.sessionId).className,
                activityName: activity.activityName,
                activityTopic: activity.activityTopic,
                startTime: activity.startTime,
                endTime: activity.endTime,
              }"
            ></ActivityCard>
          </ul>
          <div v-else class="flex flex-col items-center mt-12">
            <EmptyClass style="max-height: 523px" class="w-full px-10" />

            <span class="mt-8 font-bold"
              >There are no upcoming activities!</span
            >

            <span class="text-blue-500">
              Just make sure you check back once in a while :)
            </span>

            <!-- <button
      class="px-4 py-2 my-4 text-white bg-blue-500 rounded-lg"
      @click="checkVerifiedStatus()"
    >
      Create Activity
    </button> -->
          </div>

          <!-- <a
              href="/"
              class="flex justify-center text-blue-500 capitalize dark:text-blue-200"
            >
              <span>see all</span>
            </a> -->
        </div>
      </div>
      <div
        class="flex flex-col flex-grow flex-shrink-0 w-full py-2 my-4 mr-6 text-purple-600 bg-purple-200 rounded-lg"
      >
        <h3
          class="flex items-center px-8 pt-1 pb-1 text-lg font-bold capitalize"
        >
          <span>Enrolled Classes</span>
          <button class="ml-2">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 256 512">
              <path
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
								0l-22.6-22.6c-9.4-9.4-9.4-24.6
								0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
								0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
								136c9.5 9.4 9.5 24.6.1 34z"
              ></path>
            </svg>
          </button>
        </h3>
        <ul v-if="getSessions.length" class="grid grid-cols-1 md:grid-cols-2">
          <nuxt-link
            v-for="(session, index) in getSessions
              .slice(0, 4)
              .filter((session) => session.id !== 'sweet-snow-5368')"
            :key="index"
            :to="'/student/session/' + session.id"
          >
            <ClassCard :key="index" :random="index" :session="session" />
          </nuxt-link>
          <li
            v-if="getSessions.length < 4"
            class="flex p-4 mt-2 overflow-y-auto"
            style="min-height: 16.5rem"
          >
            <button
              class="flex items-center justify-center flex-grow w-full h-auto bg-white bg-opacity-25 border-4 border-white border-opacity-50 border-dashed rounded-lg"
              @click="toggleModal"
            >
              <h3 class="font-semibold text-white">
                <svg
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
                </svg>
              </h3>
            </button>
          </li>
        </ul>
        <div v-else class="flex flex-col items-center mt-12">
          <EmptySession style="max-height: 523px" class="w-full px-10" />

          <span class="mt-8 font-bold">Your class list is empty</span>

          <span class="text-purple-500"> Add your classes here! </span>

          <button
            :event="$fire.auth.currentUser.emailVerified ? 'click' : 'disabled'"
            class="px-4 py-2 my-4 text-white bg-purple-800 rounded-lg"
            @click="toggleModal"
          >
            Add Session
          </button>
        </div>
        <nuxt-link
          v-if="getSessions.length > 4"
          to="/student/session"
          class="flex justify-center mt-4 mb-2 font-bold text-purple-600 capitalize dark:text-blue-200 hover:underline"
        >
          <span>see all</span>
        </nuxt-link>
        <SessionModal :toggle="modalToggle" @closed="toggleModal" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EmptySession from '~/assets/svg/empty_session.svg?inline'
import EmptyClass from '~/assets/svg/empty_class.svg?inline'

export default {
  components: {
    EmptySession,
    EmptyClass,
  },
  layout(context) {
    return 'homeStudentLayout'
  },
  data() {
    return {
      modalToggle: false,
    }
  },
  computed: {
    ...mapGetters('login', ['getAuthUser']),
    ...mapGetters('session', ['getSessions', 'getSessionById']),
    ...mapGetters('activity', ['getActivities', 'getActivitiesBySessionId']),
    ...mapGetters('score', ['getScoresGrouped']),
  },
  methods: {
    ...mapActions('login', ['logOut']),
    notImplemented() {
      this.$toast.info('This feature is coming soon!')
    },
    toggleModal() {
      this.modalToggle = !this.modalToggle
    },
    getActivitiesStudent(sessionId) {
      return this.getActivitiesBySessionId(sessionId).map(
        ({ id, activityName, questions }) => ({
          id,
          activityName,
          questions,
        })
      )
    },
    overall(sessionId, activityId) {
      const activity = this.getActivitiesStudent(sessionId).find(
        (activity) => activity.id === activityId
      )
      if (Object.prototype.hasOwnProperty.call(activity, 'questions')) {
        return activity.questions.length
      }
      return ''
    },
  },
}
</script>
