<script lang="ts" setup>
// @ts-ignore
import { http } from '@ygp/ygp-design-vue/http'

// excel通用服务
const getBatchNumber = (params: any) => {
  return http.post({ url: '/excel/admin/importExcelV2', params })
}
const getImportResult = (params: any) => {
  return http.get({ url: '/excel/admin/getResult', params })
}
const importLatestResult = (params: any) => {
  return http.get({ url: '/excel/admin/getLatestResult', params })
}

// pms服务
const resultProps = {
  isPms: true,
  importBizSet: ['INQUIRY_DRAFT', 'INQUIRY_MATCH_IMPORT'],
  importBiz: 'INQUIRY_DRAFT',
  typeMap: {
    INQUIRY_MATCH_IMPORT: '数据清洗导入',
    INQUIRY_DRAFT: '询价导入'
  },
  extraData: {
    importBiz: 'INQUIRY_DRAFT'
  }
}
const pmsBatchNumber = (params: any) => {
  return http.post({ url: '/pms/admin/inquiry/imports', params })
}
const getPmsImportResult = (params: any) => {
  return http.get({ url: '/pms/excelImport/getDetails', params })
}
const pmsLatestResult = (params: any) => {
  return http.post({ url: '/pms/excelImport/batchLatestImports', params })
}
</script>
<template>
  <y-divider label="excel服务(通用)" left />
  <y-import
    showIcon
    templateCode="MerchantSkuStockExcel"
    :btnProps="{ primary: true }"
    :extraData="{ pushBatch: true }"
    :getBatchNumber="getBatchNumber"
    :getImportResult="getImportResult"
    :importLatestResult="importLatestResult"
  >
    <template #addonAfter>导入说明：test</template>
    <template #downloadTemplate>
      <y-link label="下载导入模版" />
    </template>
    <template #result-custom-opt="record">
      <y-btn
        v-if="record.fail > 0 && record.failExcelUrl2"
        link
        label="下载失败记录"
        :href="record.failExcelUrl"
      />
    </template>
  </y-import>

  <y-divider label="pms服务" left style="margin-top: 40px" />
  <y-import
    showIcon
    label="Excel导入询价单"
    :btnProps="{ primary: true }"
    :extraData="{ businessType: 'MRO' }"
    :resultProps="resultProps"
    templateUrl="https://qiniu-fe.yigongpin.com/%E8%AF%A2%E4%BB%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF%20.xlsx"
    :getBatchNumber="pmsBatchNumber"
    :getImportResult="getPmsImportResult"
    :importLatestResult="pmsLatestResult"
  >
  </y-import>
</template>
