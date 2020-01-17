<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <div class="privateImage left">
        <slot name="user-icon">
          <img src="~assets/img/icon/login.png">
        </slot>
      </div>

      <div class="login-info left">
        <div>
          <slot name="user-nickname">登录/注册</slot>
        </div>

        <div class="phone">
          <img src="~assets/img/icon/phone.png">
          <div><slot name="user-phone">暂无绑定手机号</slot></div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }
  .clear-fix {
  }
  #user-info .privateImage{
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
  }
  #user-info .privateImage img {
    width: 80px;
    height: 80px;
    position: absolute;
    top: -8px;
    left: -10px;
  }
  .left {
    float: left;
  }
  .login-info {
    padding: 10px 5px;
    color: #fff;
  }
  .phone {
    line-height: 20px;
    display: flex;
    margin-top: 5px;
  }
  .phone img{
    width: 20px;
    height: 20px;
  }
</style>
