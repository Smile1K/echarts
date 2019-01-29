<template>
    <transition name="side">
        <div class="sidebar-wrapper" ref="sidebarWrapper">
            <div class="sidebarContent" :style="{'height':sidebarHeight-80 +'px'}" ref="sidebarContent">
                <ul>
                    <li v-for="(item,idx) in lists" :key="item.category_name" @click.stop = "doSearch(item.category_name,idx)" :class="{'active' : currentIdx == idx}">
                        <h4>{{item.category_name}}</h4>
                        <span v-if="item.tip">{{item.tip}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll';
import { getCamCategory } from '@/api/index';

export default {
  name: 'sidebar',
  computed: {
      sidebarHeight() {
          let H = document.documentElement.height || document.body.clientHeight;
          return H - 40;
      }
  },
  data() {
      return{
         currentIdx : 0,
         lists:[] 
      }
  },
  created () {
     this.loadData();
  },
  methods: {
      loadData(val,idx) {
          getCamCategory().then((res) => {
              res.info.unshift({
                  "category_name":"All"
              })
              this.lists = res.info;
          })
      },
      doSearch(val,idx){
        this.currentIdx = idx;
        this.$emit('closeMenu',val);
      },
      initScroll() {
        // if(this.menuScroll) return;
        setTimeout(() => {
            if(this.menuScroll) return;
            this.menuScroll = new BScroll(this.$refs.sidebarContent,{
              click : true
            })
        },300)       
      },
      closeNav() {
          this.$emit('close');
      }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper{
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 20px;
    bottom: 20px;
    right: 10px;
    border-radius: 25px;
    padding-top: 40px; 
    width: 120px;
    z-index: 9999;
    .sidebarContent{
        overflow: hidden;
        ul{
            li{
                margin: 0 6px;
                padding: 15px 0;
                color: #fff;
                border-bottom: 1px dashed #fff;
                h4{
                    word-wrap: break-word;
                }
                &.active{
                    color: lightcoral;
                }
            }
        }
    }
    &.side-enter-to,
    &.side-leave-to {
        transition: transform 0.3s
    }
    &.side-enter,
    &.side-leave-to {
        transform: translate3d(256px, 0, 0)
    }
}
</style>


