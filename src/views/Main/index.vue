<template>
  <div class="content-wrapper">
      <m-header :title="header" @clickNav="showNav" @search="doSearch"></m-header>
      <sidebar v-show="showMenu" ref="sidebar" @closeMenu="closeNav"></sidebar>
      <transition name="opacity"> 
         <keep-alive>
           <router-view v-if="$route.meta.keepAlive" class="Router2" ref="route"></router-view>
         </keep-alive>
　　　 </transition>
       <transition name="opacity">
           <router-view class="Router2" v-if="!$route.meta.keepAlive" ref="route"></router-view>
       </transition>
       <Loading v-if="showLoading"></Loading>
       <div class="mask" @click="onlycloseNav" v-show="showMenu"></div>
  </div>
</template>

<script>
import Loading from "@/components/loading/loading";
import mHeader from "@/components/header";
import sidebar from "@/components/sidebar/index";

export default {
  name: "wrapper",
  components: {
    mHeader,
    sidebar,
    Loading
  },
  data() {
    return {
      header: "",
      showMenu: false,
      transitionName: "slide-right",
      category : "",
      keyword : ""
    };
  },
  created() {
    if (this.$route.params.key && this.$route.params.key.desc) {
      sessionStorage.setItem("header", this.$route.params.key.desc);
    }
    if(this.$route.params.key && this.$route.params.key.desc) {
      this.header = this.$route.params.key.desc
    } else {
      this.header = sessionStorage.getItem('header');
    }
  },
  computed: {
    showLoading() {
      return this.$store.state.showLoading;
    }
  },
  methods: {
    showNav() {
      this.showMenu = true;
      this.$refs.sidebar.initScroll();
    },
    onlycloseNav() {
      this.showMenu = false;
    },
    closeNav(category) {
      this.showMenu = false;
      this.category = category;
     
      if(this.$route.name == 'detail') {
         this.$router.push({
           name:'list',
           params:{
             "category" : category,
             "keyword":this.keyword
           }
        });
       }  else {
          this.$refs.route.filterDataBySide(category);
       }      
    },
    // 搜索
    doSearch(keyword) {
       this.keyword = keyword
       if(this.$route.name == 'detail') {
         this.$router.push({
           name:'list',
           params:{
             "category" :this.category,
             "keyword":keyword
           }
        });
       }  else {
         this.$refs.route.filterData(keyword)
       }      
    }
  }
};
</script>


<style lang="scss" scoped>
.content-wrapper {
  height: 100%;
  box-sizing: border-box;
  .mask{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(0,0,0,0);
      z-index: 999;
  }
}
.Router2 {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.8s ease;
  top: 60px;
  left: 0;
  &.opacity-enter,
  &.opacity-leave-active {
    opacity: 1;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }

  &.opacity-leave-active,
  &.opacity-enter {
    opacity: 0;
    -webkit-transform: translate(0, 0);
    transform: translate(0 0);
  }
}
</style>


