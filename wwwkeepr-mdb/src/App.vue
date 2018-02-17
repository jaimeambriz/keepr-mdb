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
      this.$store.dispatch('authenticate')
      window.addEventListener('resize', this.getWindowWidth);
      // window.addEventListener('resize', this.getWindowHeight);
    },
    destroyed() {
      window.removeEventListener('resize', this.getWindowWidth);
      // window.removeEventListener('resize', this.getWindowHeight);
    },
    mounted() {
      this.getWindowWidth(event)
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
        console.log("windowWidth", this.windowWidth)
        this.$store.dispatch("windowWidth", this.windowWidth)
        // var x = window.matchMedia("(max-width: 450px)")
        if (this.windowWidth <= 575) { // If media query matches
          $('.vault-image').removeClass("col-xs-3").addClass("col-xs-5")
          $('.vault-caption').removeClass("col-xs-6").addClass("col-xs-4")
        }
        if (this.windowWidth >= 576){
          $('.vault-image').removeClass("col-xs-5").addClass("col-xs-3")
          $('.vault-caption').removeClass("col-xs-4").addClass("col-xs-6")
        }
        if (this.windowWidth <= 400){
          $('.vault-trash').removeClass("fa-3x")
          $('.vault-arrow').removeClass("fa-4x")
        }
      },
      // getWindowHeight(event) {
      //   this.windowHeight = document.documentElement.clientHeight;
      // }
    }
  }
</script>

<style>
  /* ********* ALERT STYLES ******** */

  .swal2-popup {
    background-color: #000000e3;
  }

  .swal2-popup .swal2-title,
  .swal2-popup .swal2-content {
    color: white;
  }

  /* .swal2-icon.swal2-success .swal2-success-ring{
      border: 4px solid rgba(130, 224, 93, 0.247)
    } */

  #app {
    background: url("https://png.pngtree.com/thumb_back/fw800/back_pic/03/83/12/2057c84e41d6b16.jpg") repeat center;
    /* background: rgb(206, 39, 39); */
    min-height: 100vh;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* margin-top: 60px; */
  }
</style>