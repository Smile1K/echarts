<template>
  <div class="home-wrapper">
      <header>
          <h4>YUMCHINA Transparent OMNI Campaign System</h4>
      </header>
     <div class="list-wrapper">
         <div class="list-content" ref="listContent" :style="{'height' : listwrapperHeight - 40 + 'px'}">
             <div>
                <tabitem v-for="item in tablists" :key="item.privname" :tabItem="item" @click.native="gotoList(item,item.privname,item.privname)" :itemheight="itemHeight" v-if="item.privvalue == '1'"></tabitem>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import {getBrands} from '@/api/index';
import tabitem from '@/components/tab/tab';
import {getParams} from '@/utils/tools.js';

export default {
  name: 'Home',
  components: {
      tabitem
  },
  computed: {
    listwrapperHeight() {
        let H = document.documentElement.height || document.body.clientHeight;
        return H - 60;
    },
    itemHeight() {
        let H = document.documentElement.height || document.body.clientHeight;
        return (H-60-40-20) /3;
    }  
  },
  data() {
    return{
        tablists:[] //权限列表
    }
  },
  created () {
    //  if(this.$route.params.homelists) {
    //      sessionStorage.setItem('homelists',JSON.stringify(this.$route.params.homelists))
    //  }
    //  this.tablists = this.$route.params.homelists ||  JSON.parse(sessionStorage.getItem('homelists'));
    let params = getParams();
    let param = {
        psId: params.psid
    }
    
    getBrands(param).then(res=>{      
        if(!res.result){
            this.$router.push({'path':'/error'})
        }
        this.tablists = res.info.privileges
    })
  },
  methods: {
    initScroll() {
        this.listScroll = new BScroll(this.$refs.listContent,{
            click : true
        })
    } ,
    goBack() {
        this.$router.push({
            name: "Imgconfig",
            // name: "list",
            // params: {
            //    key :{
            //        desc : "",
            //        name : "KFC"
            //    }
            // }
        });
    },
    gotoList(item,desc,name) {
        if(item.brandType == "2"){
            this.$router.push({
                path: "/imgconfig",
            });
            
        } else {
            this.$router.push({
                name: "list",
                params: {
                    key :{
                        desc : desc,
                        name : name
                    }
                }
            });
        }
    } 
  },
  mounted () {
      this.$nextTick(() => {
           this.initScroll();
      })
  }
}
</script>

<style lang="scss" scoped>
.home-wrapper{
    height: 100%;
    header{
        height: 60px;
        background: #fff;
        h4{
            line-height: 60px;
            @include fontpx(28);
            color: #C28C5D;
            text-align: center;
        }
    }
    .list-wrapper{
        background: #DEDFDF;
        height: calc(100% - 60px);
        padding:20px 10px;
        box-sizing: border-box;
        .list-content{
            overflow: hidden;
        }
    }
}
</style>


