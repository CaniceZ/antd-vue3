<template>
  <div v-show="obj.showResult" class="result_alert">
      <a-result
          status="success"
          title="选中名单"
          sub-title="Ψ=Ψ（x，y，z，t）"
          @click="obj.showResult = false"
      >
        <div v-for="(item, index) in (obj.currentWinnerArr as memberType[])" :key="index" class="desc">
          <p :style="{ textAlign: 'center' }">
            <SmileOutlined :style="{ color: 'red', marginRight: '10px' }"></SmileOutlined>
            <a :href="(item.url as any as string)">{{ item.name }}</a>
          </p>
        </div>
      </a-result>
  </div>

  <div>
    <div id="cloud_main" :class="{ mask: obj.showResult }" @click="obj.showResult = false"></div>
    <div>
      <div id="tags">
        <ul v-for="(item, index) in obj.dataSource" :key="index">
          <li>
            <img v-if="item.url" :src="item.url" :width="50" :height="50" style="border-radius: 5px"/>
            <a href="javascript:void(0);" :style="obj.nameStyle">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="action_group">
      <a-button
          class="action_b"
          type="primary"
          shape="round"
          size="large"
          :loading="obj.isRunning"
          :disabled="obj.isActive"
          @click="go()"
      >
        自动
      </a-button>
      <a-button
          type=""
          shape="round"
          size="large"
          :class="{action_b: true, active: obj.isActive, normal: !obj.isActive}"
          :disabled="obj.isRunning"
          @click="start"
      >
        <template #icon>
          <DashboardOutlined />
        </template>
        {{ obj.isActive ? "停止" : "开始" }}
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import '../../assets/js/tagcanvas.js'
  import { SmileOutlined, DashboardOutlined } from '@ant-design/icons-vue';
  import { reactive, onMounted } from "vue"
  const obj = reactive({
    visible: false,
      showResult: false,
      isRunning: false,
      isActive: false,
      allowRepeat: false,
      winnerCount: 1,
      nameStyle: {color: '#1890FF', fontSize: '15px'},
      normalSpeed: [0.1, 0.1],
      runSpeed: [2, 1],
      historyWinnerArr: [] as Array<memberType>,
      currentWinnerArr: [] as Array<memberType>,
      dataSource:[
        {
            key: '1',
            name: '肖申克的救赎',
            subtitle: 'Top 250',
            remark: 'reserve',
            url: '',
            isShow: false
        },
        {
            key: '2',
            name: '霸王别姬',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '3',
            name: '阿甘正传',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '4',
            name: '这个杀手不太冷',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '5',
            name: '泰坦尼克号',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '6',
            name: '美丽人生',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '7',
            name: '千与千寻',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '8',
            name: '辛德勒的名单',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '9',
            name: '盗梦空间',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '10',
            name: '星际穿越',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '11',
            name: '海上钢琴师',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '12',
            name: '楚门的世界',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '13',
            name: '机器人总动员',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '14',
            name: '放牛班的春天',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '15',
            name: '大话西游',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '16',
            name: '疯狂动物城',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '17',
            name: '无间道',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '18',
            name: '教父',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '19',
            name: '当幸福来敲门',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '20',
            name: '龙猫',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '21',
            name: '怦然心动',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '22',
            name: '触不可及',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '23',
            name: '乱世佳人',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '24',
            name: '何以为家',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '25',
            name: '飞屋环游记',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '26',
            name: '鬼子来了',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '27',
            name: '天空之城',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '28',
            name: '猫鼠游戏',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '29',
            name: '搏击俱乐部',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '30',
            name: '大闹天宫',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '31',
            name: '狮子王',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '32',
            name: '死亡诗社',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '33',
            name: '黑客帝国',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '34',
            name: '指环王',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '35',
            name: '饮食男女',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '36',
            name: '窃听风暴',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '37',
            name: '美丽心灵',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '38',
            name: '让子弹飞',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '39',
            name: '两杆大烟枪',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '40',
            name: '本杰明·巴顿奇事',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '41',
            name: '飞越疯人院',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '42',
            name: '西西里的美丽传说',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '43',
            name: '拯救大兵瑞恩',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '44',
            name: '小鞋子',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '45',
            name: '情书',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '46',
            name: '海豚湾',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '47',
            name: '美国往事',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '48',
            name: '低俗小说',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '49',
            name: '心灵捕手',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '50',
            name: '摩登时代',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '51',
            name: '阿凡达',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '52',
            name: '勇敢的心',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '53',
            name: '狩猎',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '54',
            name: '红辣椒',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '55',
            name: '阳光灿烂的日子',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '56',
            name: '重庆森林',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        },
        {
            key: '57',
            name: '小森林',
            subtitle: 'Top 250',
            remark: '',
            url: '',
            isShow: false
        }
      ]
  })
    const go = ()=> {
      obj.isRunning = true
      obj.showResult = false
      window.TagCanvas.SetSpeed('my_canvas', obj.runSpeed)

      setTimeout(() => {
        onDraw()
      }, 2000 * (Number(obj.winnerCount < 3) || 3))
    }
    const start = ()=> {
      obj.isActive = !obj.isActive
      obj.showResult = false
      window.TagCanvas.SetSpeed('my_canvas', obj.runSpeed)

      let interval = setInterval(() => {
        if (!obj.isActive) {
          clearInterval(interval)
          onDraw()
          return
        }
      }, 77)
    }
    const onDraw= ()=> {
      obj.currentWinnerArr = []
      const tempArr = [...obj.dataSource]
      for (let j = 0; j < obj.winnerCount; j++) {
        let draws = tempArr
        // 剔除历史元素
        if (!obj.allowRepeat) {
          draws = tempArr.filter(item => !obj.historyWinnerArr.includes(item))
          draws = draws.filter(item => !obj.currentWinnerArr.includes(item))
        }
        const index = parseInt((Math.random() * draws.length + 1)+'', 10)
        const winner = draws[index - 1]
        obj.currentWinnerArr.push(winner)
        obj.historyWinnerArr.push(winner)
      }
      obj.showResult = true
      obj.isRunning = false
      window.TagCanvas.SetSpeed('my_canvas', obj.normalSpeed)
    }
    const createCanvas = ()=> {
      const canvas = document.createElement('canvas')
      canvas.width = 500
      canvas.height = 500
      canvas.id = 'my_canvas';
      (document.querySelector('#cloud_main') as HTMLElement).appendChild(canvas)
    }
    const setTagCanvas = ()=> {
      createCanvas()
      window.TagCanvas.Start('my_canvas', 'tags', {
        textColour: null,
        initial: obj.normalSpeed,
        dragControl: 1,
        textHeight: 20,
        noSelect: true,
        lock: 'xy'
      })
    }
    onMounted(()=>{
     setTagCanvas()
  })
</script>
<style lang="less" scope>

.mask {
  -webkit-filter: blur(5px);
  filter: blur(5px);
}

#cloud_main {
  width: 100%;
  height: 100%;
}

.action_s {
  background: #FF4D4F;
  margin-right: 10px;
}

.action_i {
  width: 100px;
}

.action_group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .action_b{
    margin-right: 15px;
  }
  .active {
    color: white;
    background: #FF4D4F;
    border-color: lightgray;
  }

  .normal {
    color: #696969;
    background: white;
    border-color: lightgray;
  }
}

.result_alert {
  position: absolute;
  top: 25%;
  left: 20%;
  width: 60%;
  z-index: 10;
}

</style>