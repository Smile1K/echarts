<template>
  <div class="list-wrapper">
     <div class="top">
        <div class="left-tab">
           <span class="time" :class="{'active':current=='Time'}" @click="current='Time'">Time</span>
           <span class="result" :class="{'active':current=='Result'}" @click="current='Result'">Result</span>
        </div>
        <div class="right-btn">
          <a @click="constrast" :class="{'active':checkedLength>0}">Contrast</a>
        </div>
     </div>
     <div class="list-content" :style="{'height' : listcontentHeight + 'px'}" ref="listContent">
        <ul ref="listUl">
          <li v-for="(item,idx) in list" :key="item.Category_name" :style="{'width':itemWidth + 'px' ,'height' : itemWidth + 'px'}" @click="check(item)">
            <span class="checker" :class="{'active':item.checked}"></span>
            <chart :contentWidth="charWidth" class="chart-wrapper" :lists="obj2arr(item)" :titleStyle="titleStyle"></chart>
          </li>
        </ul>
     </div>
     <div class="text" v-show="pullUp">{{pullUPtxt}}</div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getCampaignInfo } from "@/api/index";
import Chart from "@/components/charts/index";

export default {
  name: "list",
  components: {
    Chart
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "detail") {
      to.meta.isBack = true;
    }
    next();
  },
  data() {
    return {
      pullUp : false,
      current: "Time",
      constrastItems: [], //比较的数据
      list: [],
      isFirstEnter: false,
      titleStyle: {
        fontSize: 15,
        itemGap: 6,
        subFontSize: 12
      },
      pageNum:1,
      totalPage:5,
      timer : null
    };
  },
  computed: {
    listcontentHeight() {
      let H = document.documentElement.height || document.body.clientHeight;
      return H - 60 - 100;
    },
    itemWidth() {
      let W = document.documentElement.clientWidth || document.body.clientWidth;
      return (W - 50) / 2;
    },
    charWidth() {
      return this.itemWidth - 45;
    },
    // 选中的个数 最多2个
    checkedLength() {
      let sum = 0;
      this.list.map(u => {
        if (u.checked) {
          sum++;
        }
      });
      return sum;
    },
    pullUPtxt() {
      if(this.pageNum<=this.totalPage) {
        return '上拉加载更多'
      } else {
        return '无更多数据'
      }
    }
  },
  created() {
    this.isFirstEnter = true;
  },
  // keepAlive时的钩子函数
  activated() {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      this.loadData();
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  methods: {
    obj2arr(val) {
      return [val];
    },
    // 请求数据
    loadData() {
      //先请求数据
      let params = {
        category: "",
        keyWords: "",
        pageNum: this.pageNum,
        sortType: ""
      };
      this.$store.commit('showLoading',true);
      getCampaignInfo(params).then(res => {
        let _this = this;
        this.pullUp = false;
        this.pageNum++;
        res.info = res.info.map(u => {
          _this.$set(u, "checked", false);
          if (u.rank == -1) {
            _this.$set(u, "color", "#cc9769");
          } else if (u.rank == 1) {
            _this.$set(u, "color", "#e91224");
          } else {
            _this.$set(u, "color", "#6c6c6c");
          }
          return u;
        });
        let idx = 0;
        let flag = false;
        _this.timer = setInterval(() => {
          _this.list.push(res.info[idx]);
          idx++;
          if (idx == res.info.length) {
            clearInterval(_this.timer);
            flag = true;
          }
          if (flag) {
            this.$store.commit('showLoading',false);
            if(this.pageNum == 2) {
               _this.initScroll();
            } else {
               _this.pullingDownUp();
            }
          }
        }, 300);
      });
    },
    pullingDownUp () {
      this.listcontentScroll.finishPullDown()
      this.listcontentScroll.finishPullUp()
      this.listcontentScroll.refresh() //重新计算元素高度
    },
    initScroll() {
      
      this.listcontentScroll = new BScroll(this.$refs.listContent, {
        click: true,
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        },
      });
      this.listcontentScroll.on("pullingDown", () => {
        // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
        this.pageNum = 1;
        this.list = []; // 重置数据
        // this.searchCondition.pageNo = 1; // 重置分页数
        this.loadData(); //获取数据方法
      });
      // 上拉
      this.listcontentScroll.on("pullingUp", () => {
        this.pullUp = true;
        if (this.pageNum <= this.totalPage) {
          //判断是否继续上拉刷新
          this.loadData(); //获取数据方法
        }
      });
    },
    // 选中
    check(item) {
      if (!item.checked) {
        if (this.checkedLength == 2) {
          alert("最多选择两个");
          return;
        }
      }
      item.checked = !item.checked;
    },
    // 选中比较
    constrast() {
      this.constrastItems = [];
      this.list.map(u => {
        if (u.checked == true) {
          this.constrastItems.push(u);
        }
      });
      if (this.constrastItems.length == 0) return;
      this.$router.push({
        name: "detail",
        params: {
          constrastItems: this.constrastItems
        }
      });
    }
  },
  mounted() {
    
  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  background: #dedede;
  height: calc(100% - 60px);
  padding: 0 20px;
  .top {
    height: 70px;
    padding: 5px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-tab {
      display: flex;
      align-items: centet;
      height: 40px;
      justify-content: space-around;
      border: 2px solid #fff;
      border-radius: 25px;
      overflow: hidden;
      span {
        width: 70px;
        flex: 0 0 70px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #cc9769;
        font-weight: bold;
        &.active {
          background: #fff;
        }
      }
    }
    .right-btn {
      a {
        display: inline-block;
        height: 40px;
        border: 2px solid #fff;
        border-radius: 25px;
        line-height: 40px;
        text-align: center;
        color: #cc9769;
        padding: 0 20px;
        &.active {
          background: #fff;
        }
      }
    }
  }
  .list-content {
    overflow: hidden;
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      li {
        background: #fff;
        border-radius: 6px;
        margin-bottom: 10px;
        position: relative;
        .chart-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .checker {
          position: absolute;
          width: 22px;
          height: 22px;
          border: 2px solid #dedede;
          top: 8px;
          left: 8px;
          box-sizing: border-box;
          border-radius: 4px;
          &.active {
            background: url("../../../assets/checkbox-checked.png") center
              no-repeat;
            background-size: 22px 22px;
            border: none;
          }
        }
      }
    }
  }
  .text{
    text-align: center;
    @include fontpx(32);
    line-height: 30px;
  }
}
</style>


