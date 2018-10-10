<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="20"><el-input ref="newTaskEl" placeholder="New task" @change="setNewTask" ></el-input></el-col>
          <el-col :span="4"><el-button type="primary" @click="addTask">Add</el-button></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row v-for="task in tasks" :key="task.id">
          <el-col :span="2"><el-checkbox v-model="task.completed" @change="changeState(task)"></el-checkbox></el-col>
          <el-col :span="20" align="left">{{ task.title }}</el-col>
          <el-col :span="2"><el-button icon="el-icon-close" @click="removeTask(task)"></el-button></el-col>
        </el-row>
        <el-row v-if="!tasks.length">No tasks at this moment.</el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'VueTask',

  created () {
    this.$store.dispatch('loadTasks')
  },
  computed: {
    newTask () {
      return this.$store.getters.newTask
    },
    tasks () {
      return this.$store.getters.tasks
    }
  },
  methods: {
    changeState (task) {
      this.$store.dispatch('changeState', task)
    },
    addTask () {
      this.$store.dispatch('addTask')
      this.$store.dispatch('clearNewTask')
      this.$refs.newTaskEl.clear()
    },
    removeTask (task) {
      this.$store.dispatch('removeTask', task)
    },
    setNewTask (e) {
      this.$store.dispatch('setNewTask', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    padding: 0;
  }

  .el-main .el-row {
    background: white;
    line-height: 50px;
    border-bottom: 1px solid #B3C0D1;
  }
  .el-main .el-row:hover {
    background-color: #E9EEF3;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
