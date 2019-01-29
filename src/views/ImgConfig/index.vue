<template>
    <div class="img-wrapper">
        <header>
            <h4>YUMCHINA Transparent OMNI Campaign System</h4>
        </header>
        <div class="img-list-wrapper">
            <img class="previewer-demo-img" v-for="(item, index) in list" :key="index" :src="item.src" @click="show(index)">
            <div v-transfer-dom>
            <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
            </div>
        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom  } from 'vux'
import { getImglist } from '@/api/index';

export default {
    directives: {
        TransferDom
    },
    data(){
        return {
            list:[{
                src: 'https://placekitten.com/800/400',
                w: 600,
                h: 400
                },
                {
                src: 'https://placekitten.com/1200/900',
                w: 1200,
                h: 900
            }],
              options: {
                getThumbBoundsFn (index) {
                // find thumbnail element
                let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                // get window scroll Y
                let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                // optionally get horizontal scroll
                // get position of element relative to viewport
                let rect = thumbnail.getBoundingClientRect()
                // w = width
                return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                // Good guide on how to get element coordinates:
                // http://javascript.info/tutorial/coordinates
                }
            }
        }
    },
    components: {
        Previewer
    },
    created () {
        this.fetchData()
    },
     methods: {
        logIndexChange (arg) {
            console.log(arg)
        },
        show (index) {
           this.$refs.previewer.show(index)
        },
        fetchData() {
            getImglist().then(res => {
                this.list = res.info;
                this.list = this.list.map(u => {
                    // u.imageurl = "http://mallui.pizzahut.com.cn/phdimall-service/phdimall/ui/product/image/couponimage/PHDITM92004_normal.jpg";
                    this.$set(u,'src',u.imageurl);
                    // u.w = 600;
                    // u.h = 200;
                    return u;
                })
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.img-wrapper{
    header{
        height: 60px;
        background: #fff;
        h4{
            line-height: 60px;
            @include fontpx(28);
            color: #C28C5D;
            text-align: center;
        }
        border-bottom: 1px solid #eee;
    }
    .img-list-wrapper{
        height: calc(100% - 60px);
        padding:10px 5px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
           display: none;
        }
    }
    img{
        width: 100%;
        height: auto;
        margin-bottom: 0.1333rem;
        border-radius: 5px;
        border: 1px solid #eee;
    }
}
</style>


