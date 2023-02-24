<template>
  <div class="welcome">
    <div class="welcome_text">WELCOME</div>
    <div class="title">欢迎进入管理系统</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Welcome',
  components: {},
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.welcome {
  width: 100%;
  height: 100%;
  background: url('https://qiniu-fe.yigongpin.com/ygp_img_welcome.png')
    no-repeat center #fff;
  overflow: hidden;

  .welcome_text {
    font-size: 88px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #f0f1f4;
    margin-top: 40px;
    text-align: center;
  }

  .title {
    font-size: 34px;
    font-family: PingFangSC-Bold, PingFang SC;
    font-weight: bold;
    color: #323233;
    text-align: center;
    margin-top: -46px;
  }
}
</style>
