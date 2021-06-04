<template>
  <div class="flex flex-col items-center mt-12">
    <EmptySession style="max-height: 523px" class="w-full px-10" />

    <span class="mt-8 font-bold">Your class list is empty</span>

    <span class="text-purple-500"> Make your first class! </span>

    <nuxt-link
      :event="$fire.auth.currentUser.emailVerified ? 'click' : 'disabled'"
      to="/session/create"
      class="px-4 py-2 my-4 text-white bg-purple-800 rounded-lg"
      @click.native="checkVerifiedStatus"
    >
      Create Session
    </nuxt-link>
  </div>
</template>

<script>
import EmptySession from '~/assets/svg/empty_session.svg?inline'
export default {
  components: {
    EmptySession,
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
  },
}
</script>
