<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>



  export default {
    data() {
      return {

      };
    },
    computed: {
      // 计算属性

    },
    mounted() {
      this.$router.push("login");
    },
    watch: {
    },
    methods: {

    }
  }
</script>
<style>
  #app{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(238, 241, 246);
  }
</style>
