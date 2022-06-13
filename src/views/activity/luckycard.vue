<template>
  <div class="card-module">
    <div v-for="(item, index) of obj.dataSource" :class="['img-box', {'active' : item.isShow}]" :key="index"
          @click="handleClick(index)" :data-id='index'>
      <div class="back">
        <a class="back_title">编号：{{ index +1 }}</a>
        <img class="img-item" src='../../assets/img/luck-card/project_card_bg.png'/>
      </div>
      <div class="front">
        <a class="title_item">{{ item.name }}</a>
        <a class="subtitle_item">{{ item.subtitle }}</a>
        <a-input-search
            class="remark_item"
            allowClear
            placeholder="请输入获奖者"
            @search="(value, event)=>onCommit(value, event, item)"
        >
          <template #prefix>
            <user-outlined type="user" />
          </template>
          <template #enterButton>
            <a-button :key="index">
              <template #icon>
                <CheckCircleOutlined />
              </template>
            </a-button>
          </template>
        </a-input-search>
        <a class="id_item">*{{ item.key }}*</a>
        <img class="img-item" src="../../assets/img/luck-card/card_win_bg.png"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from "vue" 
  import { message } from 'ant-design-vue';
  import { CheckCircleOutlined, UserOutlined } from '@ant-design/icons-vue';
  interface winnerType {
    winner: string;
    draw: string;
  }
  type ReactiveType = {
    dataSource: Array<memberType>,
    winnerList: Array<winnerType>,
  }
  const obj = reactive<ReactiveType>({
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
    winnerList:[]
  })
  const handleClick = (index:number)=>{
    obj.dataSource[index].isShow = true
  }
   const onCommit=(value, e, item)=> {
      let winItem = {winner: value, draw: item}
      obj.winnerList.push(winItem)
      message.success('已备注')
      console.log(obj.winnerList)
    }
</script>
<style lang="less" scoped>
  .card-module {
  margin: 2%;
  display: flex;
  flex-wrap: wrap;

  .img-box {
    flex-shrink: 0;
    width: 20%;
    height: 350px;
    text-align: center;
    box-sizing: border-box;
    position: relative;

    .front {
      box-sizing: border-box;
      position: absolute;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      transform-style: preserve-3d;
      border: 1px solid #e8e8e8;
      border-radius: 7px;

      .title_item {
        position: absolute;
        top: 35%;
        width: 100%;
        text-align: center;
        color: white;
        font-size: 27px;
        font-weight: bold;
      }

      .subtitle_item {
        position: absolute;
        top: 50%;
        width: 100%;
        text-align: center;
        color: whitesmoke;
        font-size: 15px;
      }

      .remark_item {
        position: absolute;
        top: 75%;
        left: 5%;
        width: 90%;
      }

      .id_item {
        position: absolute;
        bottom: 5px;
        right: 6%;
        width: 50%;
        text-align: right;
        background: none;
        color: orange;
        font-size: 10px;
      }

      .img-item {
        object-fit: cover;
      }
    }

    .back {
      background: none;
      box-sizing: border-box;
      position: absolute;
      transform: rotateY(0deg);
      backface-visibility: hidden;
      transform-style: preserve-3d;

      .img-item {
        object-fit: cover;
        border-radius: 7px;
      }

      .back_title {
        position: absolute;
        top: 15px;
        width: 100px;
        margin: 0 auto;
        text-align: center;
        color: #ff6c00;
        font-size: 20px;
        font-weight: bold;
      }
    }

    &.active {
      animation: mymove 0.5s forwards;
      -webkit-animation: mymove 0.5s forwards;

      .front {
        transform: rotateY(0deg);
        /*翻牌前加个抖动效果*/
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1);
      }

      .back {
        transform: rotateY(180deg);
        /*翻牌前加个抖动效果*/
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1);
      }
    }
  }
}
</style>

