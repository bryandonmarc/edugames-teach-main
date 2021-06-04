// const initialState = () => ({
//   username: '',
// })

// export const state = () => initialState()

// export const mutations = {
//   SET_USERNAME: (state, value) => {
//     state.username = value
//   },
//   RESET_STORE: (state) => {
//     Object.assign(state, initialState())
//   },
// }

export const actions = {
  async registerTeacher({ commit }, { username, email, password }) {
    return await this.$fire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        return (
          (await user.updateProfile({
            displayName: username,
            photoURL: 'teacher',
          })) ?? user
        )
      })
      .then(async (user) => {
        return (await user.sendEmailVerification()) ?? user
      })
      .then(async ({ email, displayName }) => {
        await this.$fire.firestore.collection('teachers').doc(email).set({
          displayName,
        })
      })
      .then(async () => {
        await commit('login/RESET_STORE', null, { root: true })
      })
      .catch(({ message }) => {
        throw message
      })
  },

  async registerStudent({ commit }, { username, email, password }) {
    const sessionDocument = this.$fire.firestore
      .collection('sessions')
      .doc('sweet-snow-5368')

    return await this.$fire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        return (
          (await user.updateProfile({
            displayName: username,
            photoURL: 'student',
          })) ?? user
        )
      })
      .then(async (user) => {
        return (await user.sendEmailVerification()) ?? user
      })
      .then(async ({ email, displayName }) => {
        await this.$fire.firestore
          .collection('students')
          .doc(email)
          .set({
            'display-name': displayName,
            sessions: this.$fireModule.firestore.FieldValue.arrayUnion(
              sessionDocument
            ),
          })
      })
      .then(() => {
        commit('login/RESET_STORE', null, { root: true })
      })
      .catch(({ message }) => {
        throw message
      })
  },
}
