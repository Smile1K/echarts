<template>
  <div class="list-wrapper">
     <div class="top">
        <div class="left-tab">
           <span class="time" :class="{'active':current=='1'}" @click="getData(1)">Time</span>
           <span class="result" :class="{'active':current=='2'}" @click="getData(2)">Result</span>
        </div>
        <div class="right-btn">
          <a @click="constrast" :class="{'active':checkedLength>0}">Contrast</a>
        </div>
     </div>
     <div class="list-content" :style="{'height' : listcontentHeight + 'px'}" ref="listContent">
        <ul ref="listUl">
          <li v-for="(item,idx) in list" :key="idx" :style="{'width':itemWidth + 'px' ,'height' : itemWidth + 'px'}" @click.stop="check(item)">
            <span class="checker" :class="{'active':item.checked}"></span>
            <chart :contentWidth="charWidth" class="chart-wrapper" :lists="obj2arr(item)" :titleStyle="titleStyle" :delay="idx" :width="width" :titleTop="titleTop"></chart>
          </li>
        </ul>
     </div>
     <toast @closeToast="close" v-if="showToast" :text="tips"></toast>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getCampaignInfo } from "@/api/index";
import Chart from "@/components/charts/index";
import Toast from '@/components/toast/toast';

export default {
  name:'list_new',
  components: {
      Chart,
      Toast
  },
   beforeRouteEnter(to, from, next) {
    
    if (from.name == "detail") {
      to.meta.isBack = true;

    }
    next(vm=>{
      vm.allList.map(u => {
         u.checked = false;
      })
    });
  },
  data() {
    return {
      pullUp : false,
      current: 1,
      constrastItems: [], //比较的数据
      list: [],
      allList:[],
      avalist:[],
      averageItem:{}, //平均值
      isFirstEnter: false,
      titleStyle: {
        fontSize: 14,
        itemGap: 4,
        subFontSize: 9
      },
      showToast: false,
      width:6,
      titleTop: '40%',
      brandName:'',
      tips:{
        tip:''
      }
    };
  },
  computed: {
    listcontentHeight() {
      let H = document.documentElement.height || document.body.clientHeight;
      return H - 60 - 70;
    },
    itemWidth() {
      let W = document.documentElement.clientWidth || document.body.clientWidth;
      return (W - 30) / 2;
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
    }
  },
  created() {  
    this.isFirstEnter = true;
  },
  // keepAlive时的钩子函数
  activated() {
    
    if(this.$route.params.key && this.$route.params.key.name){
        sessionStorage.setItem('brandName',this.$route.params.key.name);
    } 
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 刷新 判断是否带keyword
      let category = this.$route.params.category ? this.$route.params.category : ""
      let keyword = this.$route.params.keyword ? this.$route.params.keyword : ""
      this.brandName = this.$route.params.key ? this.$route.params.key.name : sessionStorage.getItem('brandName')
      this.loadData();
    } else if(this.$route.params.keyword != undefined) {
      // 不刷新情况下带keyword
      this.filterDataBySide(this.$route.params.category);
      this.filterData(this.$route.params.keyword);
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  methods: {
    // 关闭toast
    close(){
        this.showToast = false;
    },
    obj2arr(val) {
      return [val];
    },
    getData(val){
       this.current = val;
       this.loadData()
    },
    // 请求数据
    loadData() {
      //先请求数据
       this.list = this.allList = [];
      let params = {
        brandName: this.brandName,
        sorttype: this.current
      };  
      this.$store.commit('showLoading',true);
      getCampaignInfo(params).then(res => {
        
        let _this = this;
        res.info.TargetInfoList = res.info.TargetInfoList.map(u => {
          _this.$set(u, "checked", false);
          if (u.topNo == -1) {
            _this.$set(u, "color", "#cc9769");
          } else if (u.topNo == 1) {
            _this.$set(u, "color", "#e91224");
          } else {
            _this.$set(u, "color", "#6c6c6c");
          }
          return u;
        });
        _this.list = _this.allList =  res.info.TargetInfoList.slice(0) ; 
        _this.avalist = res.info.AvgList;
        // _this.averageItem = res.info[0];
        _this.$store.commit('showLoading',false);
        _this.$nextTick(()=> {
            _this.initScroll();
            _this.listcontentScroll.scrollTo(0,0,0);
        })
      });
    },
    // 前端过滤
    filterData(keyword) {
      this.list = [];
      this.allList.map(u => {
         u.checked = false;
      })
      this.$nextTick(()=>{
          this.list = this.allList.filter(item => {
            return item.campaign_name.toUpperCase().indexOf(keyword.toUpperCase()) > -1
          })
      })
    },
    filterDataBySide(category) {
      
      this.list = [];
      this.allList.map(u => {
         u.checked = false;
      })
      this.$nextTick(()=>{
          if(category == 'All') {
             this.list = this.allList.slice(0)
          } else {
             this.list = this.allList.filter(item => {
             return item.category_name.toUpperCase().indexOf(category.toUpperCase()) > -1
          })
          }
         
      })
    },
    initScroll() {
      if(this.listcontentScroll ) return;
      this.listcontentScroll = new BScroll(this.$refs.listContent, {
        click: true,
      });
    },
    // 选中
    check(item) {
      if (!item.checked) {
        if (this.checkedLength == 2) {
          this.showToast = true;
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
      // 如果只选择了一个
      if(this.constrastItems.length == 1) {
        // 默认list的第一个是平均值
        let year = this.constrastItems[0].targetYear;
        let item = this.avalist.filter(item => {
          return item.targetYear == year
        })
        if(item.length == 1){
          this.constrastItems.push(item[0])
        }
      }
      // debugger
      if(this.constrastItems.length == 1){
         let year = this.constrastItems[0].targetYear;
         this.showToast = true;
         this.tips.tip = `${year}年度平均值未录入。`
         return;
      }
      this.constrastItems[0].color = "#e91224";
      this.constrastItems[1].color = "#cc9769";
      this.$router.push({
        name: "detail",
        params: {
          constrastItems: this.constrastItems
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  background: #dedede;
  height: calc(100% - 60px);
  padding: 0 10px;
  .top {
    height: 50px;
    padding: 5px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-tab {
      display: flex;
      align-items: centet;
      // height: 40px;
      justify-content: space-around;
      border: 2px solid #fff;
      border-radius: 25px;
      overflow: hidden;
      // box-sizing: border-box;
      span {
        width: 70px;
        flex: 0 0 70px;
        // height: 40px;
        line-height: 31px;
        text-align: center;
        color: #cc9769;
        font-weight: bold;
        box-sizing: border-box;
        &.time{
          border-radius: 25px 0 0 25px;
        }
        &.result{
          border-radius: 0 25px 25px 0;
        }
        &.active {
          background: #F9F9F5;
        }
      }
    }
    .right-btn {
      a {
        display: inline-block;
        height: 31px;
        border: 2px solid #fff;
        border-radius: 25px;
        line-height: 31px;
        text-align: center;
        color: #cc9769;
        padding: 0 10px;
        &.active {
          background: #F9F9F5;
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


