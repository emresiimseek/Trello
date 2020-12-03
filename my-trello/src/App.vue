<template>
  <div id="app">
    <nav-bar :user="this.sendUser()"> </nav-bar>
    <router-view />
  </div>
</template>
<script lang="ts">
import NavBar from "./components/NavBar.vue";
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
@Component({ components: { NavBar } })
export default class App extends Vue {
  sendUser() {
    return JSON.parse(sessionStorage.getItem("currentUser")) ?? { id: 0 };
  }
  render() {
    this.$forceUpdate();
  }
}
</script>

<style>
/* Modal Css */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
