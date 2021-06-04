const initialState = () => ({
  authUser: null,
  // code: '',
  // status: false,
})

export const state = () => initialState()

export const getters = {
  getAuthUser: (state) => state.authUser,
  getAuthCode: (state) => state.code,
}

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  // SET_CODE(state, value) {
  //   state.code = value
  // },

  // SET_STATUS(state, value) {
  //   state.status = value
  // },

  SET_AUTH_USER: (state, authUser) => {
    const { uid, email, displayName, photoURL } = authUser
    state.authUser = Object.assign({}, { uid, email, displayName, photoURL })
  },

  // SET_AUTH_DISPLAYNAME: (state, displayName) => {
  //   state.authUser.displayName = displayName
  // },

  // SET_AUTH_ERROR: (state) => {
  //   state.code = 'auth/not-verified'
  // },
}

export const actions = {
  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        // eslint-disable-next-line no-console
        console.info('idToken', idToken)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      commit('SET_AUTH_USER', authUser)
    }
  },

  // async findUser({ commit }, { email }) {
  //   return await this.$fire.auth
  //     .getUserByEmail(email)
  //     .then(() => {
  //       return true
  //     })
  //     .catch(({ code }) => {
  //       commit('SET_CODE', code)
  //       commit('SET_STATUS', false)
  //       return false
  //     })
  // },

  async forgetPassword(_, email) {
    return await this.$fire.auth
      .sendPasswordResetEmail(email)
      .catch((error) => {
        throw new Error(error)
      })
  },

  async getUser({ state, commit }, { email, password }) {
    return await this.$fire.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // if (user.photoURL !== 'teacher') {
        //   throw new Error('auth/not-teacher')
        // }
        if (!user.emailVerified) {
          const error = new Error()
          error.code = 'auth/not-verified'
          error.message =
            'Sorry! Please verify your account first before logging in.'
          throw error
        } else {
          commit('SET_AUTH_USER', user)
        }
      })
      .catch(({ code }) => {
        commit('RESET_STORE')
        throw code
      })
  },

  async logOut({ commit }) {
    return await this.$fire.auth
      .signOut()
      .then(() => {
        commit('activity/RESET_STORE', null, { root: true })
        commit('question/RESET_STORE', null, { root: true })
        commit('session/RESET_STORE', null, { root: true })
        commit('score/RESET_STORE', null, { root: true })
        commit('student/RESET_STORE', null, { root: true })
        commit('RESET_STORE')
        this.$toast.info('Successfully logged out!')
      })
      .catch(({ message }) => {
        this.$toast.error('An error occured. ' + message)
      })
  },
}
