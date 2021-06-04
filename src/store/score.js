function groupByFieldsMaxScore(dataArray, groupPropertyArray) {
  const groups = {}
  dataArray.forEach((item) => {
    const group = JSON.stringify(groupPropertyArray(item))
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group].reduce((max, obj) =>
      max.score > obj.score ? max : obj
    )
  })
}

function groupByFields(dataArray, groupPropertyArray) {
  const groups = {}
  dataArray.forEach((item) => {
    const group = JSON.stringify(groupPropertyArray(item))
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
}

function countAttempts(groupedData) {
  const counts = []
  const original = groupByFields(groupedData, function (item) {
    return [item.activityID, item.studentID]
  })

  for (let i = 0; i < original.length; i++) {
    const count = {
      activityID: original[i][0].activityID,
      studentID: original[i][0].studentID,
      attempts: original[i].length,
    }

    counts.push(count)
  }

  return counts
}

const initialState = () => ({
  scores: [],
})

export const state = () => initialState()

export const getters = {
  getScores: (state) => state.scores,
  getScoresByActivityId: (state) => (activityId) =>
    state.scores.filter((score) => score[activityId] >= 0),
  getScoresIds: (state) => state.scores.map(({ id }) => id),
  getScoresGrouped: (state) =>
    groupByFieldsMaxScore(state.scores, function (item) {
      return [item.activityID, item.studentID]
    }),
  getAttempts: (state) => (activityId, studentId) => {
    const obj = countAttempts(state.scores).find(
      (attempt) =>
        attempt.activityID === activityId && attempt.studentID === studentId
    )

    if (Object.prototype.hasOwnProperty.call(obj, 'attempts')) {
      return obj.attempts
    }
    return 0
  },
}

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_SCORE: (state, score) => {
    state.scores = [...state.scores, ...[score]].filter(
      ((set) => (o) => (set.has(o.id) ? false : set.add(o.id)))(new Set())
    )
  },

  REMOVE_SCORE: (state, scoreId) => {
    state.scores = state.scores.filter((score) => score.id !== scoreId)
  },
}

export const actions = {
  async fetchScores({ commit, getters }, { activityId }) {
    return await this.$fire.firestore
      .collection('grades')
      .where('activityID', '==', activityId)
      .onSnapshot(async (querySnapshot) => {
        const snapshotScores = querySnapshot.docs
        const stateScores = getters.getScores

        // // filter ids from stateScores that are not in snapshotScores
        // const difference = stateScores.filter(
        //   ({ id }) => !snapshotScores.map(({ id }) => id).includes(id)
        // )

        // // remove items from stateScores using the difference above
        // difference.length &&
        //   difference.forEach(({ id }) => {
        //     commit('REMOVE_SCORE', id)
        //   })

        const TO_BE_COMMITED = snapshotScores.filter((score) => {
          if (stateScores.length)
            return !getters.getScoresIds.includes(score.id)
          return true
        })

        // Parallel asynchronous
        await Promise.all(
          TO_BE_COMMITED.map(async (score) => {
            if (score.exists) {
              const { submittedAt, ...rest } = await score.data()
              commit('SET_SCORE', {
                id: score.id,
                submittedAt: submittedAt.toDate(),
                ...rest,
              })
            }
          })
        )
      })
  },
}
