<template>
  <div class="flex-1 w-full h-auto bg-gray-200">
    <div class="container relative p-10 mx-auto mb-8 overflow-hidden wrap">
      <div class="grid grid-cols-12 mb-12 gap-y-6">
        <div
          v-for="(activity, index) in getActivities"
          :key="index"
          class="flex items-center order-1 w-8 h-8 mx-4 bg-purple-700 rounded-full shadow-xl"
        >
          <a
            class="mx-auto text-lg font-semibold text-white"
            :href="'#' + 'activity-' + (index + 1)"
          >
            {{ index + 1 }}
          </a>
        </div>
      </div>
      <!-- <div
        v-if="getActivities.length"
        class="absolute hidden h-full border border-purple-700 md:block"
        style="left: 50%"
      ></div> -->
      <div v-if="!getActivities.length">
        <div
          class="flex items-center justify-center flex-grow w-full mb-16 bg-gray-300 bg-opacity-25 border-4 border-gray-500 border-opacity-50 border-dashed rounded-lg"
          style="height: 40vh"
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
            No Activities Yet!
          </h3>
        </div>
      </div>
      <!-- <div
        v-for="(activity, index) in getActivities"
        :key="index"
        class="flex items-center justify-between w-full mb-8 right-timeline"
        :class="[
          { 'flex-row-reverse': index % 2 == 0 },
          { 'pb-16': index + 1 == getActivities.length },
        ]"
      >
        <div class="order-1 hidden w-5/12 md:block"></div>
        <div
          class="z-20 items-center order-1 hidden w-8 h-8 bg-purple-700 rounded-full shadow-xl md:flex"
        >
          <h1 class="mx-auto text-lg font-semibold text-white">
            {{ index + 1 }}
          </h1>
        </div>
        <ul class="order-1 w-full rounded-lg shadow-xl md:w-5/12">
          <ActivityCard
            v-bind="{
              id: activity.id,
              activityName: activity.activityName,
              activityTopic: activity.activityTopic,
              startTime: activity.startTime,
              endTime: activity.endTime,
              className,
            }"
          ></ActivityCard>
        </ul>
      </div>
      <div class="container absolute bottom-0 w-full">
        <div
          class="flex items-center justify-between w-full mt-8 -ml-10 right-timeline"
        >
          <div class="order-1 w-5/12"></div>
          <div
            class="z-20 flex items-center order-1 w-full h-16 bg-purple-700 rounded-full shadow-xl cursor-pointer max-w-prose"
          >
            <h1 class="mx-auto text-lg font-semibold text-white">
              Your learning journey is up until here.
            </h1>
          </div>
          <div class="order-1 w-5/12"></div>
        </div>
      </div> -->
      <div class="flex justify-center min-h-screen">
        <div class="w-full mx-auto">
          <div
            v-for="(activity, index) in getActivities"
            :key="index"
            class="flex w-full"
            :class="[index % 2 == 0 ? 'flex-row' : 'flex-row-reverse']"
            :id="'activity-' + (index + 1)"
          >
            <!-- left col -->

            <div class="w-full py-10 md:w-2/5">
              <ul class="relative order-1 w-full rounded-lg shadow-xl">
                <div
                  class="absolute right-0 items-center order-1 w-8 h-8 mx-4 bg-purple-700 rounded-full shadow-xl top-3 md:hidden"
                >
                  <div
                    class="mx-auto text-lg font-semibold text-center text-white"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
                <ActivityCard
                  v-bind="{
                    id: activity.id,
                    activityName: activity.activityName,
                    activityTopic: activity.activityTopic,
                    startTime: activity.startTime,
                    endTime: activity.endTime,
                    className,
                  }"
                ></ActivityCard>
              </ul>
            </div>
            <!--line column-->
            <div class="justify-center hidden w-1/5 md:flex">
              <div
                class="relative flex items-center justify-center w-1 h-full bg-purple-600"
              >
                <div
                  class="absolute z-10 flex flex-col justify-center w-8 h-8 font-thin leading-none text-center bg-purple-600 rounded-full"
                >
                  <span class="mx-auto text-lg font-semibold text-white">
                    {{ index + 1 }}
                  </span>
                </div>
              </div>
            </div>
            <!--right column-->
            <div class="hidden w-2/5 px-2 py-10 md:block"></div>
          </div>
          <div class="flex w-full">
            <!-- left col -->

            <div class="w-2/5 py-10"></div>
            <!--line column-->
            <div class="flex justify-center w-1/5">
              <div
                class="relative flex items-center justify-center w-1 h-full bg-purple-600"
              >
                <div
                  class="absolute flex flex-col justify-center h-20 font-thin leading-none text-center bg-purple-600 rounded-full w-96"
                >
                  <span class="mx-auto text-lg font-semibold text-white">
                    You reached the end!
                  </span>
                </div>
              </div>
            </div>
            <!--right column-->
            <div class="w-2/5 px-2 py-10"></div>
          </div>
        </div>
      </div>
      <div
        class="fixed text-gray-400 rounded-full opacity-50 right-5 bottom-10 hover:text-black"
      >
        <a href="#top"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-20 h-20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clip-rule="evenodd"
            /></svg
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    className: {
      type: String,
      default: 'CS520-1L B43',
    },
  },
  computed: {
    ...mapGetters('activity', ['getActivitiesBySessionId']),
    getActivities() {
      return this.getActivitiesBySessionId(this.$route.params.id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
