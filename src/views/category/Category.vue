<template>
  <div class="wrapper">
    <div class="content">
      <ul>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>jjj</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>
        <li>aaaa</li>

      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{

      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    overflow: hidden;
  }
</style>
