<template>
  <AuthForm
    :form-name="'login'"
    :inputs="inputs"
    :submit-handler="submitHandler"
    :is-signup="isSignup"
  >
    <template #header>
      <h2 class="mb-2 font-black">Log In</h2>
      <span>Connect to your account</span>
    </template>

    <template #submit="{ hasErrors }">
      <button
        type="submit"
        class="inline-flex items-center justify-center m-1 sign-up hover-darken focus:outline-none formulate-formbutton"
        :disabled="hasErrors"
      >
        <Spinner v-if="loading" />
        <span v-else>Login&nbsp;</span>
      </button>
    </template>

    <p
      class="text-sm italic text-gray-700 underline no-select"
      @click="forgetPasswordHandler()"
    >
      Forgot your password?
    </p>

    <div class="p-1 lg:hidden">
      <span>
        <nuxt-link
          to="/signup"
          class="text-sm italic text-gray-700 underline no-select"
        >
          Don't have an account?
        </nuxt-link>
      </span>
    </div>
  </AuthForm>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from '~/assets/svg/spinner.svg?inline'

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      inputs: [
        { name: 'email', rules: 'required:trim|email', placeholder: 'Email' },
        // {
        //   name: 'password',
        //   rules: 'required:trim',
        //   placeholder: 'Password',
        //   type: 'password',
        // },
      ],
      loading: false,
      isSignup: false,
    }
  },
  computed: {
    ...mapGetters('login', ['getAuthUser', 'getAuthCode']),
  },
  methods: {
    ...mapActions('login', ['getUser', 'forgetPassword']),
    async submitHandler(data) {
      // const getUserTrace = this.$fire.performance.trace('getUser')
      // getUserTrace.start()
      this.loading = true
      try {
        await this.getUser(data)

        // getUserTrace.stop()
        this.$formulate.reset('login')
        this.$toast.success('Successfully logged in!')

        if (this.getAuthUser.photoURL === 'teacher') {
          this.$nextTick(() => {
            this.$router.push({ name: 'home' })
          })
        } else if (this.getAuthUser.photoURL === 'student') {
          this.$nextTick(() => {
            this.$router.push({ name: 'student' })
          })
        }

        // this.$nextTick(() => {
        //   this.$router.push({ name: 'home' })
        // })
      } catch (error) {
        switch (error) {
          case 'auth/user-disabled':
            this.$toast.error(
              'Your account is currently disabled! Please contact the administrator for details.'
            )
            break
          case 'auth/user-not-found':
            this.$toast.error('User does not exist! Please check your email.')
            break
          case 'auth/wrong-password':
            this.$toast.error('Incorrect login credentials. Please try again!')
            break
          // case 'auth/not-teacher':
          //   this.$toast.error('Sorry! Only teachers can use this portal.')
          //   break
          case 'auth/not-verified':
            this.$toast.error(
              'Sorry! Please verify your account first before logging in.'
            )
            break
        }
      }
      this.loading = false
    },

    forgetPasswordHandler() {
      const email = this.$formulate.registry
        .get('login')
        .$children[1].proxy.trim()
      console.log(email)
      if (email && this.ValidateEmail(email)) {
        try {
          this.forgetPassword(email)
          this.$toast.info(
            "We've sent a password reset email to that account if it exists!"
          )
        } catch (error) {
          this.$toast.error('Something went wrong! ' + error)
        }
      } else {
        this.$toast.error('Check your email if you have inputted it correctly.')
      }
    },

    ValidateEmail(email) {
      // eslint-disable-next-line
      const mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      return email.match(mailformat)
    },
  },
}
</script>

<style lang="scss" scoped>
.formulate-formbutton::v-deep {
  @apply px-12 py-3 text-xs font-bold tracking-widest uppercase rounded-full bg-purple-500 text-white;

  &:disabled {
    @apply font-bold text-white bg-gray-400 opacity-50 pointer-events-none select-none;
  }
}
</style>
