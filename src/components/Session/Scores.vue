<template>
  <!-- component -->
  <div class="flex-1 w-full h-auto overflow-x-auto bg-gray-100">
    <div
      class="flex flex-col items-center h-full overflow-x-auto font-sans"
      style="padding-top: 10vh"
    >
      <div class="flex flex-col items-start w-5/6 md:flex-row">
        <div class="relative mb-3 mr-3 text-gray-600">
          <select
            required
            class="h-10 px-5 bg-white rounded-full focus:outline-none"
            name="answer"
            @change="fetchScoresAction"
          >
            <option value="" disabled selected>Choose an activity</option>
            <option
              v-for="activity in getActivities"
              :value="activity.id"
              :key="activity.id"
            >
              {{ activity.activityName }} - {{ activity.id }}
            </option>
          </select>
        </div>

        <!-- component -->
        <div class="relative mb-3 text-gray-600">
          <div class="flex flex-row">
            <input
              type="search"
              name="search"
              placeholder="Search"
              class="h-10 px-5 pr-10 bg-white rounded-full focus:outline-none"
              v-model="searchName"
            />
          </div>

          <button type="submit" class="absolute top-0 right-0 mt-3 mr-4">
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style="enable-background: new 0 0 56.966 56.966"
              xml:space="preserve"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="w-full px-2 lg:w-5/6">
        <div class="my-6 bg-white rounded shadow-md">
          <table class="w-full table-auto min-w-max">
            <thead>
              <tr
                class="text-sm leading-normal text-gray-600 uppercase bg-gray-200"
              >
                <th class="px-6 py-3 text-left">Student</th>
                <th class="px-6 py-3 text-left">Email</th>
                <th class="px-6 py-3 text-center">Score</th>
                <th class="px-6 py-3 text-center">Percentage</th>
                <th class="px-6 py-3 text-center">Attempts</th>
                <th class="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="text-sm font-light text-gray-600">
              <template
                v-if="
                  getScoresGrouped.some(
                    (score) => score.activityID == searchItem
                  ) && searchItem
                "
              >
                <tr
                  v-for="score in filteredResults()"
                  :key="score.studentID"
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="px-6 py-3 text-left capitalize whitespace-nowrap">
                    {{ getStudentMethod(score.studentID) }}
                  </td>
                  <td class="px-6 py-3 text-left">
                    {{ score.studentID }}
                  </td>
                  <td class="px-6 py-3 text-center">
                    {{ score.score }}
                    /
                    {{ overall }}
                  </td>
                  <td class="px-6 py-3 text-center">
                    {{ ((+score.score / +overall) * 100).toFixed(2) }}%
                  </td>
                  <td class="px-6 py-3 text-center">
                    {{ getAttempts(searchItem, score.studentID) }}
                  </td>
                  <td class="px-6 py-3 text-center">
                    <span
                      v-if="+score.score / +overall >= 0.6"
                      class="px-3 py-1 text-xs text-green-600 bg-green-200 rounded-full"
                      >Passed</span
                    >
                    <span
                      v-else
                      class="px-3 py-1 text-xs text-red-600 bg-red-200 rounded-full"
                      >Failed</span
                    >
                  </td>
                </tr>
              </template>
              <tr v-else class="border-b border-gray-200 hover:bg-gray-100">
                <td colspan="6" class="px-6 py-3 text-center">
                  No student has submitted yet!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- <div class="flex flex-col items-center mt-6">
        <div class="flex text-gray-700">
          <div
            class="flex items-center justify-center w-12 h-12 mr-1 transition-colors duration-150 ease-in-out bg-gray-200 rounded-full cursor-pointer hover:bg-purple-600 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
          <div class="flex h-12 font-medium bg-gray-200 rounded-full">
            <div
              class="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex hover:underline hover:text-white hover:bg-purple-400"
            >
              1
            </div>
            <div
              class="items-center justify-center hidden w-12 leading-5 text-white transition duration-150 ease-in bg-purple-600 rounded-full cursor-pointer md:flex"
            >
              2
            </div>
            <div
              class="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex"
            >
              3
            </div>
            <div
              class="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex"
            >
              ...
            </div>
            <div
              class="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex"
            >
              13
            </div>
            <div
              class="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex"
            >
              14
            </div>
            <div
              class="items-center justify-center hidden w-12 leading-5 transition duration-150 ease-in rounded-full cursor-pointer md:flex"
            >
              15
            </div>
            <div
              class="flex items-center justify-center w-12 h-12 leading-5 text-white transition duration-150 ease-in bg-purple-600 rounded-full cursor-pointer md:hidden"
            >
              2
            </div>
          </div>
          <div
            class="flex items-center justify-center w-12 h-12 ml-1 transition-colors duration-150 ease-in-out bg-gray-200 rounded-full cursor-pointer hover:bg-purple-600 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      searchName: '',
      searchItem: '',
      items: [],
      filteredItems: [],
      paginatedItems: [],
      selectedItems: [],
      pagination: {
        range: 5,
        currentPage: 1,
        itemPerPage: 5,
        items: [],
        filteredItems: [],
      },
    }
  },
  computed: {
    ...mapGetters('activity', ['getActivitiesBySessionId']),
    ...mapGetters('score', ['getScoresGrouped', 'getAttempts']),
    ...mapGetters('student', ['getStudentById']),
    getActivities() {
      return this.getActivitiesBySessionId(this.$route.params.id).map(
        ({ id, activityName, questions }) => ({
          id,
          activityName,
          questions,
        })
      )
    },
    overall() {
      if (this.searchItem) {
        const activity = this.getActivities.find(
          (activity) => activity.id === this.searchItem
        )
        if (Object.prototype.hasOwnProperty.call(activity, 'questions')) {
          return activity.questions.length
        }
      }
      return ''
    },
  },
  methods: {
    ...mapActions('score', ['fetchScores']),
    fetchScoresAction(event) {
      this.searchItem = event.target.value
      this.fetchScores(this.searchItem)
      //   console.log(this.getScores)
    },
    getStudentMethod(id) {
      return this.getStudentById(id)['display-name']
    },
    filteredResults() {
      const results = this.getScoresGrouped.filter(
        (score) => score.activityID === this.searchItem
      )
      if (this.searchName) {
        return results.filter((score) =>
          this.getStudentMethod(score.studentID)
            .toLowerCase()
            .includes(this.searchName.toLowerCase())
        )
      } else {
        return results
      }
    },
  },
}
</script>

<style></style>
