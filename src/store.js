import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

function randomId () {
  return Math.random()
    .toString()
    .substr(2, 10)
}

export default new Vuex.Store({
  state: {
    tasks: [],
    newTask: ''
  },
  getters: {
    newTask: state => state.newTask,
    tasks: state => state.tasks
  },
  mutations: {
    SET_TASKS (state, tasks) {
      state.tasks = tasks
    },
    SET_NEW_TASK (state, task) {
      state.newTask = task
    },
    ADD_TASK (state, taskObject) {
      state.tasks.push(taskObject)
    },
    CLEAR_NEW_TASK (state) {
      state.newTask = ''
    }
  },
  actions: {
    loadTasks ({ commit }) {
      axios
        .get('http://localhost:3000/tasks')
        .then(r => r.data)
        .then(tasks => {
          commit('SET_TASKS', tasks)
        })
    },
    addTask ({ commit, state }) {
      console.log(commit, state);
      if (!state.newTask) {
        // do not add empty tasks
        return
      }
      const task = {
        title: state.newTask,
        completed: false,
        id: randomId()
      }
      axios.post('http://localhost:3000/tasks', task).then(_ => {
        commit('ADD_TASK', task)
      })
    },
    clearNewTask ({ commit }) {
      commit('CLEAR_NEW_TASK')
    },
    setNewTask({ commit }, task) {
      commit('SET_NEW_TASK', task)
    }
  }
})
