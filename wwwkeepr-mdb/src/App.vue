<template>
  <div id="app">
    <navbar></navbar>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  export default {
    data() {
      return {
        windowWidth: 0,
        windowHeight: 0,
      }
    },
    name: 'app',
    components: {
      Navbar
    },
    // ********** THIS IS TO CHECK THE WINDOW WIDTH **********
    created() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
    },
    destroyed() {
      window.removeEventListener('resize', this.getWindowWidth);
      window.removeEventListener('resize', this.getWindowHeight);
    },
    mounted() {
      this.$store.dispatch('authenticate')
      this.getWindowWidth(event)
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
        console.log("windowWidth", this.windowWidth)
        this.$store.dispatch("windowWidth", this.windowWidth)
      },
      getWindowHeight(event) {
        this.windowHeight = document.documentElement.clientHeight;
      }
    }
  }
</script>

<style>
  #app {
    background: url("assets/gray-woodgrain.jpg") no-repeat fixed center;
    /* background: rgb(206, 39, 39); */
    min-height: 100vh;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* margin-top: 60px; */
  }
</style>