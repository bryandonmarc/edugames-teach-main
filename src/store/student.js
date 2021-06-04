const initialState = () => ({
  students: [],
})

export const state = () => initialState()

export const getters = {
  getStudents: (state) => state.students,
  getStudentById: (state) => (id) =>
    state.students.find((student) => student.id === id),
  getStudentsIds: (state) => state.students.map(({ id }) => id),
}

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_STUDENT: (state, student) => {
    state.students = [...state.students, ...[student]].filter(
      ((set) => (o) => (set.has(o.id) ? false : set.add(o.id)))(new Set())
    )
  },

  REMOVE_STUDENT: (state, studentId) => {
    state.students = state.students.filter(
      (student) => student.id !== studentId
    )
  },
}

export const actions = {
  async fetchStudents({ commit, getters }) {
    return await this.$fire.firestore
      .collection('students')
      .where('display-name', '!=', '""')
      .onSnapshot(async (querySnapshot) => {
        const snapshotStudents = querySnapshot.docs
        const stateStudents = getters.getStudents

        // // filter ids from stateStudents that are not in snapshotStudents
        // const difference = stateStudents.filter(
        //   ({ id }) => !snapshotStudents.map(({ id }) => id).includes(id)
        // )

        // // remove items from stateStudents using the difference above
        // difference.length &&
        //   difference.forEach(({ id }) => {
        //     commit('REMOVE_STUDENT', id)
        //   })

        const TO_BE_COMMITED = snapshotStudents.filter((student) => {
          if (stateStudents.length)
            return !getters.getStudentsIds.includes(student.id)
          return true
        })

        // Parallel asynchronous
        await Promise.all(
          TO_BE_COMMITED.map(async (student) => {
            if (student.exists) {
              commit('SET_STUDENT', {
                id: student.id,
                ...(await student.data()),
              })
            }
          })
        )
      })
  },

  async fetchStudent({ rootState: { login }, commit, dispatch, rootGetters }) {
    await this.$fire.firestore
      .collection('students')
      .doc(login.authUser.email)
      .onSnapshot(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { sessions, ...rest } = await documentSnapshot.data()
          const activitiesList = []
          const questionsList = []

          commit('SET_STUDENT', {
            id: documentSnapshot.id,
            ...rest,
          })

          await Promise.all(
            sessions.map(async (session) => {
              const sessionSnapshot = await session.get()
              if (sessionSnapshot.exists) {
                const {
                  createdAt,
                  activities,
                  ...rest
                } = await sessionSnapshot.data()
                activitiesList.push(...activities)
                commit(
                  'session/SET_SESSION',
                  {
                    id: sessionSnapshot.id,
                    createdAt: createdAt.toDate(),
                    ...rest,
                  },
                  { root: true }
                )
                console.log('done')
              }
            })
          )

          await Promise.all(
            activitiesList.map(async (activity) => {
              const activitySnapshot = await activity.get()
              if (activitySnapshot.exists) {
                const {
                  createdAt,
                  startTime,
                  endTime,
                  questions,
                  ...rest
                } = await activitySnapshot.data()
                questionsList.push(...questions)
                commit(
                  'activity/SET_ACTIVITY',
                  {
                    id: activitySnapshot.id,
                    questions: new Array(questions.length),
                    createdAt: createdAt.toDate(),
                    startTime: startTime.toDate(),
                    endTime: endTime.toDate(),
                    ...rest,
                  },
                  { root: true }
                )
                console.log('done')
              }
            })
          )

          await Promise.all(
            questionsList.map(async (question) => {
              const questionSnapshot = await question.get()
              if (questionSnapshot.exists) {
                commit(
                  'question/SET_QUESTION',
                  {
                    id: questionSnapshot.id,
                    ...(await questionSnapshot.data()),
                  },
                  { root: true }
                )
                console.log('done')
              }
            })
          )

          await Promise.all(
            rootGetters['activity/getActivitiesIds'].map(async (activityId) => {
              await dispatch(
                'score/fetchScores',
                { activityId },
                { root: true }
              )
            })
          )
        }
      })
  },
}
