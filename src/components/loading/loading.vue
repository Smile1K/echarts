<template>
  <div class="loading-wrapper">
      <h4>加载中...</h4>
      <img src="./loading.gif" alt="">
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>


<style lang="scss" scoped>
.loading-wrapper{
    width: 120px;
    height: 120px;
    position: fixed;
    background: rgba(0,0,0,.5);
    top: 50%;
    left: 50%;
    transform: translate(-50%,-80%);
    text-align: center;
    padding: 40px 0 10px 0;
    box-sizing: border-box;
    color:#fff;
    border-radius: 5px;
    h4{
        margin-bottom: 10px;
        letter-spacing: 2px;
    }
    img{
        width: 40px;
        height: auto;
    }
}
</style>


