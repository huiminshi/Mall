<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="getImg" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      getImg() {
        return  this.item.image || this.item.show.img;
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad');
        // console.log('itemImageLoad')
      },
      itemClick() {
        this.$router.push('/detail/'+this.item.iid);
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-list-item img {
    width: 100%;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    text-align: center;
    overflow: hidden;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
