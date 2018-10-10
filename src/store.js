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
    REMOVE_TASK (state, task) {
      state.tasks = state.tasks.filter(function (item) {
        return task.id !== item.id
      })
    },
    CLEAR_NEW_TASK (state) {
      state.newTask = ''
    }
  },
  actions: {
    loadTasks ({ commit }) {
      axios
        .get('http://localhost:3005/tasks')
        .then(r => r.data)
        .then(tasks => {
          commit('SET_TASKS', tasks)
        })
    },
    addTask ({ commit, state }) {
      if (!state.newTask) {
        // do not add empty tasks
        return
      }
      const task = {
        title: state.newTask,
        completed: false,
        id: randomId()
      }
      axios.post('http://localhost:3005/tasks', task).then(_ => {
        commit('ADD_TASK', task)
      })
    },
    removeTask ({ commit }, task) {
      axios.delete('http://localhost:3005/tasks/' + task.id, task).then(_ => {
        commit('REMOVE_TASK', task)
      })
    },
    changeState ({ commit }, task) {
      axios.put('http://localhost:3005/tasks/' + task.id, task)
    },
    clearNewTask ({ commit }) {
      commit('CLEAR_NEW_TASK')
    },
    setNewTask ({ commit }, task) {
      commit('SET_NEW_TASK', task)
    }
  }
})
