<template>
  <a-alert
    message="提示"
    description="选项不足"
    type="info"
    show-icon
    closable
    @close="obj.isShowAlert = false"
    v-show="obj.isShowAlert"
  />
  <div class="content">
    <img :src="obj.randomMember.url || obj.imgUrl" style="border-radius: 5px">
    <h2>{{ obj.randomMember.name || '请点击\'抽奖\'按钮'}}</h2>
  </div>
  <div class="action">
    <a-button
        type="primary"
        shape="round"
        size="large"
        style="background: #52C41A; border-color: lightgray"
        :loading="obj.isRunning"
        :disabled="obj.isActive"
        @click="go(false)"
    >
      自动
    </a-button>
    <br/>
    <a-button
        type=""
        shape="round"
        size="large"
        v-bind:class="{active: obj.isActive, normal: !obj.isActive}"
        :disabled="obj.isRunning"
        @click="start"
    >
      <template #icon>
        <DashboardOutlined />
      </template>
      {{ obj.isActive ? "停止" : "开始" }}
    </a-button>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, h, ref } from 'vue'
  import { notification, message } from 'ant-design-vue';
  import { SmileOutlined, DashboardOutlined } from '@ant-design/icons-vue';
  import imgUrl from '@/assets/img/logo.png'
  interface memberType {
    key: string;
    name: string;
    subtitle: string;
    remark: string;
    url: string;
    isShow: boolean;
  }
  type ReactiveType = {
    luckMember: Array<memberType>
    [key:string]:any
  }
  const obj = reactive<ReactiveType>({
    imgUrl,
    dataSource: [
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
      },
    ],
    isShowAlert: false,
    isRunning: false,
    visible: false,
    isActive: false,
    randomMember:{},
    luckMember: []
  })
  const random2 = ()=> {
    let min = 0
    let max = obj.dataSource.length - 1
    return min + Math.round(Math.random() * max)
  }
  const start = ()=> {
    obj.isActive = !obj.isActive
    if (obj.isActive) {
      go(true)
    }
  }
  const go = (isBreak:boolean)=> {
      let lenght = obj.dataSource.length
      if (lenght === 0) {
        message.warning("没有选项了!")
        obj.visible = true
        obj.randomMember = {}
        return
      } else if (lenght == 1) {
        message.warning("只剩最后一个选项了!")
        obj.visible = true
        return
      } else if (lenght == 2) {
        obj.isShowAlert = true
      }
      let count = 0
      let interval = setInterval(() => {
        count++
        let random = random2()
        let member:memberType = obj.dataSource[random]
        obj.randomMember = member
        if (isBreak) {
          if (!obj.isActive) {
            clearInterval(interval)
            obj.isRunning = false
            obj.dataSource.splice(random, 1)
            obj.luckMember.push(member)
            openNotification(member)
            return
          }
        } else {
          obj.isRunning = true
          if (count >= lenght * 4) {
            clearInterval(interval)
            obj.isRunning = false
            obj.dataSource.splice(random, 1)
            obj.luckMember.push(member)
            openNotification(member)
            return
          }
        }
      }, 77)
    }
    const openNotification = (member:any)=> {
      notification.open({
        duration: null,
        message: member.name,
        description: member.subtitle,
        icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
        placement: 'topLeft'
      });
    }
</script>
<style lang="less" scoped>
.content {
  top: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
  }

  h2 {
    color: #A7AFBA;
    font-size: 22px;
    padding-top: 20px;
  }
}

.active {
  width: 100px;
  color: white;
  margin-top: 20px;
  background: #FF4D4F;
  border-color: lightgray;
}

.normal {
  width: 100px;
  color: #696969;
  margin-top: 20px;
  background: white;
  border-color: lightgray;
}
.action {
  .van-button + .van-button {
    margin-top: 10px;
  }
}
</style>