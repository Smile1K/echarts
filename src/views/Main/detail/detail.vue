<template>
  <div class="detail-wrapper">
    <div class="chart-wrapper">
      <Chart :contentWidth='contentWidth' :lists="lists" :titleStyle="titleStyle"></Chart>
      <div class="legend">
            <ul>
                <li v-for="(item,idx) in lists" :key="idx">
                    <span :style="{background:item.color}"></span>
                    <div :style="{color:item.color}">
                        <h4>{{item.campaign_name | formatName}}</h4>
                        <p>{{item.campaign_des}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="horibar-wrapper">
      <toggle-bar v-for='(item, idx) in barLists' :key='idx'>
        <bar-group :options='item.target' slot='toggle-title'></bar-group>
        <bar-group v-if="item.subTarget" :options='item.subTarget' slot='toggle-content'></bar-group>
      </toggle-bar>
    </div>
  </div>
</template>

<script>
import BarItem from "@/components/hori-bar/bar-item";
import BarGroup from "@/components/hori-bar/bar-group";
import ToggleBar from "@/components/toggle-bar";
import Chart from "@/components/charts";
export default {
  name: "detail",
  components: {
    BarGroup,
    BarItem,
    ToggleBar,
    Chart
  },
  data() {
    return {
      lists: [],
      titleStyle: {
        fontSize: 36,
        itemGap: -2,
        subFontSize: 12
      },
      barLists: []
    };
  },
  filters:{
     formatName(val){
       return val.replace(/\\n/g,'')
     }
  },
  created() {
    if (this.$route.params.constrastItems) {
      sessionStorage.setItem(
        "constrastItems",
        JSON.stringify(this.$route.params.constrastItems)
      );
    }
    this.lists =
      this.$route.params.constrastItems ||
      JSON.parse(sessionStorage.getItem("constrastItems"));
    if (this.lists.length == 1) {
      this.titleStyle.fontSize = 15;
      this.titleStyle.itemGap = 6;
      this.titleStyle.subFontSize = 12;
    } else {
      this.titleStyle.fontSize = 36;
      this.titleStyle.itemGap = -2;
      this.titleStyle.subFontSize = 12;
    }
    let targetList = [];
    let allTargets = this.lists[0].target; // 一共几个条

    allTargets.map(target => {
      let targetKey = target.key;
      let subTarget = target.subTarget;

      let obj = {
        target: {
          xAxis: [target.name],
          series: [{ data: [] }],
          showMargin: false,
          showNumber: true,
          titleStyle: {
            color: "#F53335"
          }
          // max: target.max// this.lists[0] && this.lists[0].max
        }
        // subTarget: {
        //   series: [],
        //   xAxis: subTarget.map(val => val.title),
        //   showNumber: true,
        //   // max: this.lists[0] && this.lists[0].max
        // }
      };
      let subTargetKeys;
      if (subTarget) {
        obj.subTarget = {
          series: [],
          xAxis: subTarget.map(val => val.title),
          showNumber: true,
          titleStyle:{
            fontSize: '12px'
          }
          // max: this.lists[0] && this.lists[0].max
        };
        subTargetKeys = subTarget.map(val => val.key);
      }
      
      this.lists.forEach(data => {
        data.target.some(tgt => {
          if (tgt.key === targetKey) {
            tgt.color = data.color;
            obj.target.series[0].data.push(tgt);
            if (subTarget) {
              let subTgt = tgt.subTarget;
              subTargetKeys.forEach((subKey, subIdx) => {
                if (typeof obj.subTarget.series[subIdx] == "undefined") {
                  obj.subTarget.series[subIdx] = { data: [] };
                }
                subTgt.some(sub => {
                  if (sub.key === subKey) {
                    sub.color = data.color;
                    obj.subTarget.series[subIdx].data.push(sub);
                  }
                });
              });
            }

            return true;
          }
        });
      });

      targetList.push(obj);
    });
    
    this.barLists = targetList;
  },
  computed: {
    contentWidth() {
      let width =
        document.documentElement.clientWidth || document.body.clientWidth;
      return width / 2 - 30;
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-wrapper {
  background: #eee;
  height: calc(100% - 60px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 5px;
}
.chart-wrapper {
  display: flex;
  padding: 15px 10px;
  .charts-wrapper {
    margin-right: 20px;
  }
}
.chart-wrapper .legend ul li {
  list-style: none;
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.chart-wrapper .legend ul li span {
  width: 32px;
  height: 20px;
  flex: 0 0 32px;
  justify-content: space-between;
  background: #000;
  border-radius: 5px;
  margin-right: 4px;
}

.chart-wrapper .legend ul li div h4 {
  // height: 20px;
  // line-height: 24px;
  margin-bottom: 5px;
  text-align: left;
  word-wrap: break-word;
}

.chart-wrapper .legend ul li div p {
  @include fontpx(26);
  text-align: left;
}
</style>
<style lang="scss">

</style>
