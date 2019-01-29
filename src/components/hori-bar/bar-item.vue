/**
option: {
    showMargin: 是否显示左边的差值 false,
    showNumber: bar上是否显示数字 true,
    title: String,
    titleStyle: Object,
    marginColor: {
        pos:red,
        neg: ''
    },
    max: {
        type: Number,
        default: series里面最大的
    },
    data: [{ 一条对应一个bar
        color: red,
        data: Number，
        height: Number
    }]
}
 */
<template>
  <div class="bar-item-wrapper">
    <div class="bar-item-title" :style='option.titleStyle'>{{option.title}}</div>
    <div class="bar-item-bars">
        <div class="bar-item-margin" v-if='showMargin' :style='{"background-color": marginColor}'><span>{{marginSign}}{{calculateMargin()}}</span></div>
        <div class="bar-item-group" ref='barItemContainer' >
            <div v-if='domReady' class="bar-item" v-for="(serie, idx) in option.data" :key='idx' :style='{width: calculateBarWidth(serie), height: calHeight(serie), "background-color":serie.color}'>
                <span v-if='showNumber'>{{fotmatVal(serie.value,option.title)}}</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { extend, accSub } from "@/utils/tools.js";
export default {
  name: "bar-item",
  props: ["options"],
  data() {
    return {
      max: 0,
      domReady: false,
      serieHeight: 20,
      marginSign: "+",
      //default
      option: {
        marginColor: {
          pos: "#F53335",
          neg: "#D7A96D"
        },
        barColor: ["#F53335", "#D7A96D"]
      }
    };
  },
  created() {
    this.option = extend(true, this.option, this.options);
    this.option.data = this.options.data;
    let max = parseFloat(this.option.max);
    if (Number.isNaN(max)) {
      max = 0;
      this.option.data.forEach(obj => {
        if (obj.value > max) {
          max = obj.value;
        }
      });
    }
    this.max = max;
    this.option.data.forEach((dat, idx) => {
      if (!dat.color) {
        dat.color =
          idx % 2 === 0 ? this.option.barColor[0] : this.option.barColor[1];
      }
    });
  },
  mounted() {
    this.domReady = true;
  },
  computed: {
    showMargin() {
      return this.option.showMargin;
    },
    showNumber() {
      return this.option.showNumber;
    },
    marginColor() {
      return this.marginSign === "+"
        ? this.option.marginColor.pos
        : this.option.marginColor.neg;
    }
  },
  filters: {
    insertComma(val) {
      // debugger
      let str = val + "";
      if (str.length < 4) {
        return str;
      }
      let a = str.split("");
      a.reverse();
      let newA = [];
      a.forEach((n, idx) => {
        newA.push(n);
        if ((idx + 1) % 3 === 0 && idx < a.length - 1) {
          newA.push(",");
        }
      });
      newA.reverse();
      return newA.join("");
    }
  },
  methods: {
    fotmatVal(val, title) {
      var nameArry = [
        "Traditional",
        "1+Reach",
        "PSR",
        "Taste (T1B)",
        "Taste (T2B)",
        "PI (T1B)",
        "PI (T2B)",
        "VFM (T1B)",
        "VFM (T2B)",
        "OTV",
        "Display",
        "Social",
        "Awareness"
      ];
      let str = this.formatName(val);
      if (nameArry.includes(title) && str!= 'NA') {
        return str + "%";
      } else {
        return str;
      }
    },
    formatName(val) {
      let str = val + "";
      if (str.length < 4) {
        return str;
      }
      let a = str.split("");
      a.reverse();
      let newA = [];
      a.forEach((n, idx) => {
        newA.push(n);
        if ((idx + 1) % 3 === 0 && idx < a.length - 1) {
          newA.push(",");
        }
      });
      newA.reverse();
      return newA.join("");
    },
    calculateMargin() {
      let base = this.option.data[0].value;
      let opo = this.option.data[1].value;
      let margin = accSub(opo, base);
      this.marginSign = margin >= 0 ? "+" : "-";
      return Math.abs(margin);
    },
    calHeight(serie) {
      if (typeof serie.height === "number") {
        return serie.height + "px";
      }
      return this.height + "px";
    },
    calculateBarWidth(serie) {
      let parent = this.$refs.barItemContainer;
      if (!parent) {
        return;
      }
      let rect = parent.getBoundingClientRect();

      let pWidth = rect.width;

      let data = parseFloat(serie.value);
      if(Number.isNaN(data)){
        data = 0
      }
      let cWidth = pWidth * (data / this.max);

      return cWidth + "px";
    }
  }
};
</script>
<style lang="scss">
.bar-item-wrapper {
  padding: 10px;
  //   width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .bar-item-title {
    color: #666;
    margin-right: 10px;
    width: 30%;
    text-align: right;
    @include fontpx(28);
    word-wrap: break-word;
  }
  .bar-item-bars {
    flex-grow: 1;
    display: flex;
    .bar-item-margin {
      min-width: 40px;
      text-align: right;
      color: #fff;
      margin-right: 3px;
      @include fontpx(28);
      padding: 0 4px;
      display: flex;
      align-items: center;
    }
    .bar-item-group {
      flex-grow: 1;
      .bar-item {
        text-align: left;
        color: #666;
        min-height: 12px;
        line-height: 12px;
        @include fontpx(20);
        text-indent: 4px;
      }
    }
  }
}
</style>

