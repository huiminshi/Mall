<template>
  <div>
    <div class="icon-selector" :class="{'check':isChecked}">
      <img src="~assets/img/cart/tick.svg" alt=""/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    data() {
      return {
      }
    },
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

  .icon-selector {
    width: 18px;
    height: 18px;
    border: 1px solid #a3a3a5;
    border-radius: 50%;
  }

  .check {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
