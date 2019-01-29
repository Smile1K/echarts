<template>
    <div class="error-wrapper">
       <div class="error-content">
           <h4>页面出错啦~</h4>
           <p>{{msg}}</p>
       </div>
    </div>
</template>


<script>
import {getParams} from '@/utils/tools.js';

export default {
    data(){
        return{
            msg:'暂时未查询到用户权限信息'
        }
    },
    created () {
        
    }
}
</script>


<style lang="scss" scoped>
.error-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FC7572;
    .error-content{
        width: 80%;
        height: auto;
        min-height: 500px;
        margin: 60px auto;
        border-radius: 5px;
        background: url('../../../static/error.png') #fff center 40px no-repeat;
        background-size: 220px 220px;
        h4{
            font-size: 24px;
            color: #666;
            text-align: center;
            padding-top: 300px;
            margin-bottom: 8px;
        }
        p{
            font-size: 18px;
            color: #666;
            text-align: center;
            line-height: 22px;
        }
    }
}
</style>
