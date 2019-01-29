<template>
    <div class="charts-wrapper" ref="chartswrapper" :style="{'width':contentWidth+'px','height': contentWidth+'px'}">
        <div id="chartPie" ref="chartPie" :style="{'width':contentWidth+'px','height': contentWidth+'px'}"></div>
    </div>
</template>

<script>
import echarts from "echarts";

export default {
  name : 'charts',
  props:{
      contentWidth:Number,
      lists:Array,
      titleStyle:Object,
      delay:{
          type:Number,
          default: 0
      },
      width:{
          type:Number,
          default:8
      },
      titleTop:{
          type:String,
          default : 'center'
      }
  },
  data() {
      return{
        marginTop : "0",
      }
  },
  computed: {
      charTitle() {
        if(this.lists.length==1) {
            return this.lists[0].campaign_name.replace(/\\n/g,'\n');
        } else {
            if(this.lists[0].targetValue - this.lists[1].targetValue>=0) {
                return `+${(this.lists[0].targetValue - this.lists[1].targetValue)}`
            } else {
                return (this.lists[0].targetValue - this.lists[1].targetValue)
            }
            
        }
      },
      titleColor() {
        if(this.lists.length==1) {
            return "#F53335"
        } else {
            return this.charTitle >= 0 ? "#F53335" : "#cc9769"
        }
      },
      charSubtext() {
        //   return this.lists[0].campaign_name
        let str ="";
        if(this.lists.length==1) {
            str =  `${this.lists[0].timing}/${this.lists[0].duration}`
        } else {
            str = this.lists[0].campaign_name.replace(/\\n/g,'\n')
        }
        return str;
      },
      series() {
          let seriesItems = [];
          let length = this.lists.length;
          let width = this.width;
        //   let width = 15;
        //   if(length<=3) width = 20;
          this.lists.map((u,idx) => {
            let seriesItem = {
                center:['50%','50%'], //改变圆心位置
                name: u.Category_name,
                type: "pie",
                clockWise: false,
                radius: [ this.contentWidth/2 - width*(idx+1), this.contentWidth/2 - (idx)*width],
                hoverAnimation: false,
                itemStyle: {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: u.color // 0% 处的颜色
                            }, {
                                offset: 1, color: u.color, // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        
                    },
                },
                label: {show:false},
                labelLine: {show:false},
                data: [
                    {
                        value: u.targetValue*u.viewPrecent/u.max*100,
                        name: u.Category_name
                    },
                    {
                        value: 100-(u.targetValue*u.viewPrecent/u.max*100),
                        name: "invisible",
                        itemStyle: {
                        normal : {
                            color: '#e5e5e5',
                            label: {show:false},
                            labelLine: {show:false},
                        }
                        },
                        tooltip :{
                            show : false
                        }
                    }
                ]
            }
            seriesItems.push(seriesItem);
          })
          return seriesItems;
      }
  },
  methods: {
    calculateMargin() {
          let H = this.$refs.chartswrapper.offsetHeight;
          this.marginTop = (H - 300) / 2 + 'px';  
    },
    drawChart() {
      let _this = this;
      _this.chartPie = echarts.init(_this.$refs.chartPie);
      _this.chartPie.setOption({
        title: {
          text: _this.charTitle,
          subtext: _this.charSubtext,
          left : "center",
          top: _this.titleTop,
          itemGap: _this.titleStyle.itemGap,
          textStyle: {
            color: _this.titleColor,
            fontFamily: "PingFang",
            fontSize: _this.titleStyle.fontSize
          },
          subtextStyle:{
            color: "#CC484A",
            fontFamily: "PingFang",
            fontSize: _this.titleStyle.subFontSize
          }
        },
        grid: {
            show:false,
            left:"0",
            right:"0",
            top:"0",
            bottom:"0"
        },
        tooltip: {
            show:false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: ({d}%)"
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        animationDuration: 300,
        animationDelay : _this.delay*200,
        series : this.series
      });
    }
  },
  mounted () {
      this.calculateMargin();
      this.drawChart(); 
  }
}
</script>

<style lang="scss">
.charts-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
}

.config{
    @include border-1px(#000);
}


.charts-wrapper .legrend ul li{
    list-style: none;
    display: flex;
    align-items: flex-start;
    margin-bottom: 6px;
}

.charts-wrapper .legrend ul li span{
    width: 100px;
    height: 20px;
    justify-content: space-between;
    background: #000;
    border-radius: 5px;
    margin-right: 4px;
}

.charts-wrapper .legrend ul li div h4{
    margin:2px 0 0 0;
    text-align: left;
}

.charts-wrapper .legrend ul li div p {
    @include fontpx(26);
    text-align : left;
}
</style>


