<template>
  <transition name="fade">
      <div class="toast-wrapper">
         <h4 v-if="text.title">{{text.title}}</h4>
         <p>{{text.tip}}</p>
      </div>
  </transition> 
</template>

<script>
export default {
  name: 'toast',
  props:{
      time:{
          type: Number,
          default: 1500
      },
      text:{
          type:Object,
          default(){
              return{
                  tip: '最多选择两个'
              }
          }
      }
  },
  mounted () {
      setTimeout(() => {
        this.$emit('closeToast');
      },this.time)
  }
}
</script>


<style lang="scss" scoped>
.toast-wrapper{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 15px 30px;
    border-radius: 10px;
    transform: translate(-50%,-120%);
    background: rgba(0, 0, 0, .5);
    opacity: 1;
    z-index: 21;
    text-align: center;
    color: #fff;
    h4{
        color: red;
        margin-bottom: 15px;
    }
    &.fade-enter-to,
    &.fade-leave-to {
        transition: opacity 0.3s;
    }
    &.fade-enter,
    &.fade-leave-to {
        opacity: 0;
    }
}
</style>


