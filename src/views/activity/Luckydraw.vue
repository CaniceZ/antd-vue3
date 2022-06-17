<template>
  <div id="wheel">
    <div class="big-wheel-box">
      <wheel
        ref="childWheel"
        width="30rem"
        height="30rem"
        :prize-list="dataSource"
        @over="openNotification"
      >
        <template #item="{ item }">
          <div class="prize-name">{{ item.name }}</div>
          <img
            class="prize-img"
            :src="item.url ? item.url : initData.imgUrl"
            style="border-radius: 5px"
          />
        </template>
      </wheel>
      <img class="btn-go" :src="initData.goIconUrl" @click="go" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, h, Ref } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import Wheel from '../../components/wheel'
import imgUrl from '@/assets/img/lucky-whell/bean_one.png'
import goIconUrl from '@/assets/img/lucky-whell/go.png'
import { notification } from 'ant-design-vue'
const initData = reactive({
  imgUrl,
  goIconUrl,
  isRunning: false
})
const dataSource = ref([
  {
    key: 'LD00',
    name: '特等奖',
    subtitle: 'Spark ticket',
    remark: 'reserve',
    url: '',
    isShow: false
  },
  {
    key: 'LD01',
    name: '一等奖',
    subtitle: 'Model x',
    remark: '',
    url: '',
    isShow: false
  },
  {
    key: 'LD02',
    name: '二等奖',
    subtitle: 'Model s',
    remark: 'Rose Wang',
    url: '',
    isShow: false
  },
  {
    key: 'LD03',
    name: '三等奖',
    subtitle: 'Model y',
    remark: '',
    url: '',
    isShow: false
  },
  {
    key: 'LD04',
    name: '再来一次',
    subtitle: '',
    remark: '',
    url: '',
    isShow: false
  },
  {
    key: 'LD05',
    name: '抽了个寂寞',
    subtitle: '',
    remark: 'O(∩_∩)O哈哈~',
    url: '',
    isShow: false
  }
] as memberType[])
const childWheel: Ref<any> = ref(null)
const go = () => {
  if (initData.isRunning) {
    return
  } else {
    initData.isRunning = true
  }
  // 模拟随机数
  const index = Math.floor(Math.random() * dataSource.value.length)
  // 转动转盘
  childWheel.value.rotate(index)
}
const openNotification = (prizeInfo: any) => {
  notification.open({
    duration: null,
    message: prizeInfo.name,
    description: prizeInfo.subtitle,
    icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
    placement: 'topLeft'
  })
  initData.isRunning = false
}
</script>
<style lang="less" scope>
#wheel {
  position: relative;
  overflow: hidden;
  min-height: 200vh;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%;
  .big-wheel-box {
    position: absolute;
    top: 1.7rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0;
    background-image: url('../../assets/img/lucky-whell/disk_bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 3.5rem;
    .prize-name {
      position: relative;
      //display: block;
      left: 0.13rem;
      right: 0.13rem;
      top: 2rem;
      //width: 0.1rem;
      //word-wrap:break-word;
      //word-break:normal;
      font-size: 1.5rem;
      font-weight: bolder;
      text-align: center;
      color: orange;
    }
    .prize-img {
      position: absolute;
      top: 5rem;
      left: 50%;
      transform: translateX(-50%);
      max-width: 5rem;
      max-height: 5rem;
    }
    .btn-go {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
      width: 20%;
    }
  }
}
</style>
