<template>
  <div id="app">
     <transition :name="transitionName"> 
　　　　　<router-view class="Router"></router-view>
　　　</transition>
     <!-- <div class="w-icon w-icon-back-icon"></div> -->
  </div>
</template>

<script>
import Loading from '@/components/loading/loading';

export default {
  name: "App",
  components: {
    Loading
  },
  data() {
    return {
      transitionName: "slide-right" // 默认动态路由变化为slide-right
    };
  },
  computed: {
    showLoading() {
      return this.$store.state.showLoading
    }
  },
  mounted() {},
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>

<style lang="scss">
@font-face {
    font-family: PingFang;
    src: url('./assets/PingFangMedium.ttf'),url('./assets/PingFangMedium.ttf'); /* IE9+ */
}

#app {
  font-family: "PingFang";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow-x: hidden;
}
.Router {
  position: absolute;
  width: 100%;
  transition: all 0.8s ease;
  top: 0;
  &.slide-left-enter,
  &.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  &.slide-left-leave-active,
  &.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
}
</style>
