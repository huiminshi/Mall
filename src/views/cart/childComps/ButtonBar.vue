<template>
  <div class="bottom-menu">
    <check-button class="check-bottom"
                  :is-checked="isSelectAll"
                  @click.native="checkClick"/>
    <span class="select-all">全选</span>
    <span class="total-price">合计：¥{{totalPrice}}</span>
    <span class="calculate" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import {mapGetters} from 'vuex';
  export default {
    name: "ButtonBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['getCartList']),
      totalPrice() {
        const cartList = this.getCartList;
        return cartList.filter(item => {
          return item.isChecked;
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count;
        },0).toFixed(2)
      },
      checkLength() {
        return this.getCartList.filter(item => item.isChecked).length;
      },
      isSelectAll() {
        if(this.getCartList.length === 0) return false;
        return !this.getCartList.find(item => !item.isChecked);
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll){
          this.getCartList.forEach(item => item.isChecked = false)
        } else{
          this.getCartList.forEach(item => item.isChecked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    background-color: #eee;
    height: 40px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    display: flex;
    font-size: 14px;
    color: #888;
    align-items: center;
  }

  .bottom-menu .check-bottom {
    width: 22px;
    height: 22px;
    margin-left: 12px;

  }

  .bottom-menu .select-all {
    margin-left: 5px;
    flex:1;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
    flex:1;
  }

  .bottom-menu .calculate {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }



</style>
