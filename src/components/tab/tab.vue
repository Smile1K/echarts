<template>
  <div class="tab-wrapper" :style="{'height' : itemheight+'px'}">
     <div class="title">
        <slot name="content">
            <h4>{{tabItem.brandDes}}</h4>
        </slot>    
     </div>
     <img :src="imgUrl" alt="" :style="{'height' : itemheight -30 + 'px', 'width' : itemheight -30 + 'px' }">
  </div>
</template>

<script>
export default {
  name: 'tab',
  data(){
      return{

      }
  },
  props:{
      itemheight:{
          type: Number,
      },
      tabItem:{
          type : Object,
          default(){
              return{
                  name: 'KFC Campaign',
                  imgUrl: 'http://ourrovucw.bkt.clouddn.com/kfc/kfcicon03.png'
              }
          }
      }
  },
  computed: {
      imgUrl() {
        //   return "../../../static/" + this.tabItem.privname + '.png';
         return "/datahub/static/" + this.tabItem.privname + '.png'
      }
  }
}
</script>

<style lang="scss" scoped>
.tab-wrapper{
    width: 100%;
    padding: 40px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .title{
        color: #C28C5D;
        h4{
            font-weight: bold;
        }
    }
    // img{
    //     flex: 0 0 130px;
    //     width: 130px;
    //     height: auto;
    // }
}
</style>


