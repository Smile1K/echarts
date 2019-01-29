<template>
  <div class="toggle-bar-wrapper">
      <div class="toggle-title" @click='toggleContent'>
          <slot name='toggle-title'></slot>
      </div>
      <collapse-transition>
        <div class="toggle-content" ref='toggleContent' v-show='displayContent'>
            <slot name="toggle-content"></slot>
        </div>
      </collapse-transition>
      <div v-if='hasToggleContent' class="toggle-icon" :class='{"arrow-down": !displayContent, "arrow-up": displayContent}' @click='toggleContent'></div>
  </div>
</template>
<script>
import CollapseTransition from "@/components/collapse-transition/index.js";
import Vue from "vue";
Vue.component("collapse-transition", CollapseTransition);
export default {
  components: {
    // CollapseTransition
  },
  data() {
    return {
      displayContent: true
    };
  },
  mounted() {
    this.displayContent = false;
    
  },
  computed: {
    hasToggleContent() {
      let toggleContent = this.$slots["toggle-content"]
      if (toggleContent) {
        return true
      }
      return false
    }
  },
  methods: {
    toggleContent() {
      if (!this.hasToggleContent) return
      this.displayContent = !this.displayContent;
    }
  }
};
</script>
<style lang="scss" scoped>
$icon-size: 10px;
.toggle-bar-wrapper {
  position: relative;
  //   padding:0 10px;
  //   background-color: #fff;
  .toggle-title {
    min-height: 50px;
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
  }
  &:not(:first-child) {
    .toggle-title {
      border-top: 1px dashed #ccc;
    }
  }
  .toggle-content {
    background: transparent;
    transition: all 0.3s;
    padding-bottom: 10px;
  }
  .toggle-icon {
    position: absolute;
    bottom: 0;
    height: 0;
    width: 0;
    left: 50%;
    transform: translateX(-50%);
    &.arrow-up {
      border-bottom: $icon-size solid #ccc;
      border-left: $icon-size solid transparent;
      border-right: $icon-size solid transparent;
    }
    &.arrow-down {
      border-top: $icon-size solid #ccc;
      border-left: $icon-size solid transparent;
      border-right: $icon-size solid transparent;
    }
  }
}
</style>
