<template>
  <div id="list">
    <div v-for="(item,index) in listData" :key="index" class="item">
      <img :src="item.icon" class="icon">
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    props: {
      listData: {
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }
  .item {
    padding-left: 10px;
    height: 44px;
    line-height: 44px;
    position: relative;
  }
  .item img {
    width: 20px;
    height: 20px;
    margin-top: 20px;
    position: absolute;
    left: 16px;
    top: -7px;
  }
  .info {
    padding-left: 5px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    margin-left: 40px;
    margin-right: 20px;
  }
  .item:last-of-type .info {
    border-bottom: none;
  }
</style>
