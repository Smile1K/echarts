<template>
  <div class="hello">
    <toggle-bar>
      <bar-group :options='barOption1' slot='toggle-title'></bar-group>
      <bar-group :options='barOption2' slot='toggle-content'></bar-group>
    </toggle-bar>
    <toggle-bar>
      <bar-group :options='barOption11' slot='toggle-title'></bar-group>
      <bar-group :options='barOption2' slot='toggle-content'></bar-group>
    </toggle-bar>
    <toggle-bar>
      <bar-group :options='barOption1' slot='toggle-title'></bar-group>
      <bar-group :options='barOption2' slot='toggle-content'></bar-group>
    </toggle-bar>
    <!-- <bar-group :options='barOption'></bar-group> -->
  </div>
</template>

<script>
import BarItem from "@/components/hori-bar/bar-item";
import BarGroup from "@/components/hori-bar/bar-group";
import ToggleBar from "@/components/toggle-bar"
export default {
  name: "HelloWorld",
  components: {
    BarGroup,
    BarItem,
    ToggleBar
  },
  data() {
    return {
      barOption1: {
        xAxis: [
          "title1"
        ],
        max: 50000,
        showMargin: true,
        // showNumber: true,
        titleStyle: {
          color:"#F53335"
        },
        series: [
          {
            data: [
              {
                color: "#F53335",
                data: 3500
              },
              {
                color: "#D7A96D",
                data: 40000
              }
            ]
          }
        ]
      },
      barOption11: {
        xAxis: [
          "Creative Effectiveness"
        ],
        // max: 50000,
        showMargin: true,
        // showNumber: true,
        titleStyle: {
          color:"#F53335"
        },
        series: [
          {
            data: [
              {
                color: "#F53335",
                data: 45000
              },
              {
                color: "#D7A96D",
                data: 40000
              }
            ]
          }
        ]
      },
barOption2: {
        xAxis: [
          "title1", "title2"
        ],
        // max: 50000,
        // showMargin: true,
        showNumber: true,
        titleStyle: {
          color:"#bbb"
        },
        series: [
          {
            data: [
              {
                color: "#F53335",
                data: 35000
              },
              {
                color: "#D7A96D",
                data: 40000
              }
            ]
          },
          {
            data: [
              {
                color: "#F53335",
                data: 45000
              },
              {
                color: "#D7A96D",
                data: 40000
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
