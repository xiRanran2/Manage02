<template>
  <div>
    <div class="relative lis">
      <a-tabs
        class="ml-5 w-[100%]"
        v-model:activeKey="activeKey"
        @change="handleChange"
      >
        <a-tab-pane key="1" tab="全部项目"></a-tab-pane>
        <a-tab-pane key="2" tab="我的收藏" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="已归档项目"></a-tab-pane>
        <a-tab-pane key="4" tab="回收站"></a-tab-pane>
      </a-tabs>
      <a-button
        type="primary"
        class="flex absolute right-[8px] top-[13px] h-[36px] leading-[36px] justify-center items-center"
        style="background-color: #409eff"
        ><p class="flex text-[white] items-center justify-center mt-[12px]">
          <Icon icon="material-symbols:add" class="mr-[6px]" /><span
            >创建新项目</span
          >
        </p></a-button
      >
    </div>
    <div>
      <ProjectList1 v-if="activeKey === '1'" />
      <ProjectList2 v-if="activeKey === '2'" />
      <ProjectList3 v-if="activeKey === '3'" />
      <ProjectList4 v-if="activeKey === '4'" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const activeKey = ref("1");
import ProjectList1 from "./ProjectLists1.vue";
import ProjectList2 from "./ProjectLists2.vue";
import ProjectList3 from "./ProjectLists3.vue";
import ProjectList4 from "./ProjectLists4.vue";
import router from "@/router";
type Key = string;
const handleChange = (activeKey: Key) => {
  console.log(activeKey);
  router.push(`/projectManagement/ProjectLists/ProjectList/${activeKey}`);
};
</script>
<style>
.ant-tabs-tab {
  height: 65px;
  margin-right: 32px !important;
}
</style>
