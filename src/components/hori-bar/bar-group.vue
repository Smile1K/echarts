/**
{
    xAxis:['title1', 'title2'],
    showMargin: 是否显示左边的差值 false,
    showNumber: bar上是否显示数字 true,
    titleStyle: Object, 左边的style
    marginColor: { 差值颜色
        pos:red, +
        neg: ''  -
    },
    max: {
        type: Number,
        default: series里面最大的
    },
    series: [{  一条对应一组bar title
        data: [{ 一条bar
          color: red,
          data: Number,
          height: Number
        }]
    }, {

    }]
} */

<template>
  <div>
    <bar-item v-for='(option, idx) in groupOptions' :key='idx' :options='option'></bar-item>
  </div>
</template>
<script>
import { extend } from "@/utils/tools.js";
import BarItem from "./bar-item";
export default {
  props: ["options"],
  components: {
    BarItem
  },
  data() {
    return {};
  },
  computed: {
    groupOptions() {
      let groupOptions = this.options.series.map((serie, idx) => {
        let obj = extend(true, {}, this.options, serie);
        obj.title = this.options.xAxis[idx];
        // debugger
        obj.data = serie.data
        //  delete obj.series
        let max = serie.data[0].max && parseFloat(serie.data[0].max);
        if (Number.isNaN(max)) {
          max = 0;
          this.options.series.forEach(obj => {
              obj.data.forEach(dat => {
            if (dat.value > max) {
              max = dat.value;
            }
              })

          });
        }
        obj.max = max;

        return obj;
      });
      return groupOptions;
    }
  }
};
</script>
