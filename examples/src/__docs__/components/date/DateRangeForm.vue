<script setup lang="ts">
import { FormItem } from '@ygp/ygp-design-vue'
import dayjs, { Dayjs } from 'dayjs'
import { computed, reactive, ref } from 'vue'

const formData = reactive<any>({})
const dates = ref<Dayjs[]>([])
function disabledDate([name1, name2]: [string, string]) {
  return function (current: Dayjs) {
    const startDate = formData[name1]
    const endDate = formData[name2]
    if (!startDate && !endDate && dates.value.length === 0) {
      return false
    }
    const tooLate = dates.value[0] && current.diff(dates.value[0], 'days') > 7
    const tooEarly =
      dates.value[1] && dayjs(dates.value[1]).diff(current, 'days') > 7
    return tooEarly || tooLate
  }
}
function onOpenChange([name1, name2]: [string, string]) {
  return function (open: boolean) {
    if (open) {
      formData[name1] = void 0
      formData[name2] = void 0
      dates.value = []
    }
  }
}
function onCalendarChange(val: any) {
  dates.value = val
}
const items = computed<FormItem[]>(() => [
  {
    label: '日期范围选择',
    name: 'daterange',
    names: ['startDate', 'endDate'],
    extra: '只可以选7天',
    type: 'datetimerange2',
    componentProps: {
      disabledDate: disabledDate(['startDate', 'endDate']),
      onOpenChange: onOpenChange(['startDate', 'endDate']),
      onCalendarChange
    }
  },
  {
    label: '日期范围选择2',
    name: 'daterange2',
    names: ['startDate2', 'endDate2'],
    extra: '只可以选7天',
    type: 'datetimerange2',
    componentProps: {
      disabledDate: disabledDate(['startDate2', 'endDate2']),
      onOpenChange: onOpenChange(['startDate2', 'endDate2']),
      onCalendarChange
    }
  }
])
</script>
<template>
  {{ formData }}
  <y-divider />
  {{ dates }}
  <y-form :items="items" :model="formData" />
</template>
