<template>
  <div class="mt-[65px] flex justify-around h-[93vh] w-[100%] bg-[#f5f5f5]">
    <div class="w-[1140px] mt-[10px] bg-[white] h-[400px] rounded-lg">
      <a-radio-group v-model:value="tabPosition" style="margin: 8px">
      </a-radio-group>
      <a-tabs
        v-model:activeKey="activeKey"
        :tab-position="tabPosition"
        animated
      >
        <a-tab-pane key="1" tab="基本设置"><InformationView /></a-tab-pane>
        <a-tab-pane key="2" tab="安全设置">安全设置</a-tab-pane>
        <a-tab-pane key="3" tab="用户绑定">用户绑定</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InformationView from "@/views/personalCenter/components/InformationView.vue";
import { ref } from "vue";
import { TabsProps } from "ant-design-vue/es/tabs";
const tabPosition = ref<TabsProps["tabPosition"]>("left");
const activeKey = ref("1");
</script>
