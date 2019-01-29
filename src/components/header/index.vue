<template>
  <div class="header-wrapper">  
    <i class="back-icon" @click='goBack'/>
    <div class="title" :class='{"hide-title": showSearchBar}'>{{title}}</div>
    <div class="search-container">
      <input class="search-bar" ref='searchBar' @transitionend='inputTranstionEnd' v-model='queryWord' :class='{"show-bar": showSearchBar}' type="text" @keyup="get($event)">
      <div class="search-list" v-show='showQueryList' ref='searchList'>
          <div>
          <div class="search-item" @click='searchWord(item)' v-for='(item, idx) in searchData' :key='idx'>{{item}}</div>
          </div>
      </div>
      <i class="search-icon" @click='clickSearch' :class='{"bar-showed": rectSearchIcon}'/>
      <i class="nav-icon" @click='clickNav'/>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: ["title"],
  data() {
    return {
      showSearchBar: false,
      rectSearchIcon: false,
      searchData: [],
      queryWord: "",
      showQueryList: false,
      scroll: null
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.$router.isBack = true;
    },
    clickSearch() {
      this.showSearchBar = !this.showSearchBar;
      this.rectSearchIcon = true;
      this.$refs.searchBar.focus();
      if(this.queryWord) {
        this.$emit("search", this.queryWord);
      }
    },
    clickNav() {
      this.$emit("clickNav");
    },
    inputTranstionEnd() {
      if (!this.showSearchBar) {
        this.rectSearchIcon = false;
      }
    },
    queryChanged(wd) {
      if (wd) {
        // this.showQueryList = true
        this.$http
          .jsonp(
            "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            { wd },
            {
              jsonp: "cb"
            }
          )
          .then(
            function(res) {
              this.searchData = res.data.s;
              if (!this.scroll) {
                let el = this.$refs.searchList;
                  this.scroll = new BScroll(el, { click: true });
              }
            },
            function() {}
          );
      }
    },
    searchWord(val) {
      this.queryWord = val;
      this.showQueryList = false;
      this.$emit("search", val);
      
    },
    get(ev){
       if(ev.keyCode==13) {
         this.showQueryList = false;
        //  alert(this.queryWord);
         this.$emit("search", this.queryWord);
       }
    },
    focusSearBar() {
      if (this.queryWord) {
        this.showQueryList = false;
      }
    }
  },
  watch: {
    $route (val) {
      this.showSearchBar =false
      this.rectSearchIcon = false
    },
    // queryWord(val, old) {
    //   if (!old && val) {
    //     this.showQueryList = true;
    //   }
    //   if (!val) {
    //       this.showQueryList = false
    //   }
    //   this.queryChanged(val);
    // },
    showSearchBar(val) {
      this.queryWord = "";
      if (!val) {
        this.showQueryList = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$bud-yellow: rgb(194, 140, 93);
.header-wrapper {
  height: 60px;
  background-color: #fff;
  color: $bud-yellow;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  position: relative;
  .back-icon {
    height: 35px;
    width: 35px;
    display: inline-block;
    background-image: url("../../assets/back-icon.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .title {
    margin: 0 auto;
    @include fontpx(36);
    max-width: calc(100% - 180px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
    &.hide-title {
        opacity: 0;
    }
  }
  .search-container {
    display: flex;
    position: relative;
    .search-bar {
      width: 0;
      height: 35px;
      padding: 0;
      border: none;
      background-color: $bud-yellow;
      transition: all 0.3s;
      border-radius: 35px 0 0 35px;
      outline: none;
      text-indent: 2em;
      text-align: left;
      color: #fff; 
      &.show-bar {
        width: 220px;
        padding-right:5px;
      }
    }
    .search-icon {
      height: 35px;
      width: 35px;
      border-radius: 35px;
      display: inline-block;
      background-image: url("../../assets/search-p.png");
      background-repeat: no-repeat;
      background-color: $bud-yellow;
      background-size: 20px;
      background-position: 8px;
      &.bar-showed {
        //   transition: all 0.1s;
        border-radius: 0 35px 35px 0;
      }
    }
    .nav-icon {
      margin-left: 5px;
      height: 35px;
      width: 35px;
      display: inline-block;
      background-image: url("../../assets/nav-icon.png");
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .search-list {
      max-height: 150px;
      width: 255px;
      border: 1px solid #eee;
      position: absolute;
      top: 35px;
      left: 0;
      padding: 8px 5px;
      box-sizing: border-box;
      background: #fff;
      overflow: hidden;
      z-index:100;
      .search-item{
        text-indent: 6px;
        @include fontpx(28);
      }
      .search-item:not(:last-child){
        margin-bottom:3px;
      }
    }
  }
}
</style>

