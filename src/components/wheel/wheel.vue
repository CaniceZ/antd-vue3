<!-- 幸运大转盘 -->
<template>
  <div
    class="__big-wheel"
    ref="bigWheel"
    :style="{ width: props.width, height: props.height }"
  >
    <div
      class="wrap"
      :style="{
        transform: intData.rotateAngle,
        transition: intData.rotateTransition
      }"
    >
      <canvas id="canvas" ref="canvas">浏览器版本过低</canvas>
      <div class="prize-wrap">
        <div
          class="item"
          v-for="(item, index) in prizeList"
          :key="index"
          :style="_calcRotateAngle(index)"
        >
          <slot name="item" :item="(item as memberType)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, Ref } from 'vue'
interface memberType {
  key: string
  name: string
  subtitle: string
  remark: string
  url: string
  isShow: boolean
}
const props = defineProps({
  prizeList: {
    // 奖品列表
    type: Array,
    required: true
  },
  width: {
    required: true,
    type: String
  },
  height: {
    required: true,
    type: String
  },
  prizeBgColors: {
    // 每一块扇形的背景色，循环填充
    type: Array,
    default: () => ['#F52D4B', '#FEE9ED']
  },
  borderColor: {
    // 每一块扇形的外边框颜色
    type: String,
    default: '#F23544'
  },
  turnsNumber: {
    // 转动的圈数
    type: Number,
    default: 5
  },
  turnsTime: {
    // 转动持续时间（秒）
    type: Number,
    default: 5
  }
})
const emit = defineEmits(['over'])
const intData = reactive({
  startRotateDegree: 0, // 开始转动的角度
  rotateAngle: 'rotate(30deg)', // 设置指针默认指向的位置,现在是默认指向1个扇形中间，设置为0即指向两个扇形之间的线上
  rotateTransition: ''
})
const canvas: Ref<any> = ref(null)
const bigWheel: Ref<any> = ref(null)
// 初始化canvas
const initData = () => {
  const prizeNum = props.prizeList.length
  const prizeBgColors = props.prizeBgColors
  const borderColor = props.borderColor
  // 绘画
  // const canvas = this.$refs.canvas
  const ctx = canvas.value.getContext('2d')
  const canvasW = (canvas.value.width = bigWheel.value.clientWidth) // 画板的高度
  const canvasH = (canvas.value.height = bigWheel.value.clientHeight) // 画板的宽度

  // translate方法重新映射画布上的 (0,0) 位置
  ctx.translate(0, canvasH)

  // rotate方法旋转当前的绘图，因为文字是和当前扇形中心线垂直的
  ctx.rotate((-90 * Math.PI) / 180)

  // 圆环的外圆的半径,可用来调整圆盘大小来适应外部盒子的大小
  const outRadius = canvasW / 2 - 1

  const innerRadius = 0 // 圆环的内圆的半径

  const baseAngle = (Math.PI * 2) / prizeNum // 每个奖项所占角度数

  ctx.clearRect(0, 0, canvasW, canvasH) // 去掉背景默认色

  ctx.strokeStyle = borderColor // 设置画图线的颜色

  let prizeBgColorsIndex = -1
  for (let index = 0; index < prizeNum; index++) {
    const angle = index * baseAngle

    // 设置每个扇形区域的背景色，循环填充
    prizeBgColorsIndex++
    ctx.fillStyle = prizeBgColors[prizeBgColorsIndex]
    if (prizeBgColorsIndex === prizeBgColors.length - 1) {
      prizeBgColorsIndex = -1
    }

    ctx.beginPath() // 开始绘制
    // 标准圆弧：arc(x,y,radius,startAngle,endAngle,anticlockwise)
    ctx.arc(
      canvasW * 0.5,
      canvasH * 0.5,
      outRadius,
      angle,
      angle + baseAngle,
      false
    )
    ctx.arc(
      canvasW * 0.5,
      canvasH * 0.5,
      innerRadius,
      angle + baseAngle,
      angle,
      true
    )
    ctx.stroke()
    ctx.fill()
    ctx.save()
  }
}
const rotate = (index: number) => {
  const turnsTime = props.turnsTime
  const rotateAngle =
    intData.startRotateDegree +
    props.turnsNumber * 360 +
    360 -
    (180 / props.prizeList.length + (360 / props.prizeList.length) * index) -
    (intData.startRotateDegree % 360)
  intData.startRotateDegree = rotateAngle
  intData.rotateAngle = `rotate(${rotateAngle}deg)`
  intData.rotateTransition = `transform ${turnsTime}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`
  setTimeout(() => {
    emit('over', props.prizeList[index])
  }, turnsTime * 1000 + 500)
}
const _calcRotateAngle = (index: number) => {
  const angle =
    (360 / props.prizeList.length) * index + 180 / props.prizeList.length
  return {
    transform: `rotate(${angle}deg)`
  }
}
onMounted(() => {
  initData()
})
defineExpose({
  rotate
})
</script>

<style lang="less" scoped>
.__big-wheel {
  position: relative;
  display: inline-block;
  .wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    .prize-wrap {
      position: absolute;
      left: 25%;
      top: 0;
      width: 50%;
      height: 50%;
      .item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform-origin: center bottom;
      }
    }
  }
}
</style>
