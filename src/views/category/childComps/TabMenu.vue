<template>

  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item,index) in categories"
           :key="index"
           :class="{active: currentIndex === index}"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>

</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "TabMenu",
    components: {
      Scroll
    },
    props: {
      categories: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('selectItem',index)
      }
    }
  }
</script>

<style scoped>
  #tab-menu {
    width: 20%;
    height: 100%;
    background-color: #f6f6f6;
    box-sizing: border-box;
    overflow: hidden;
  }
  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    /*border: 1px solid blue;*/
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
