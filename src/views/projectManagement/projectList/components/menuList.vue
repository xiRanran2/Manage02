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
        @click="modalVisible = true"
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
    <!-- 创建新项目 -->
    <!-- 创建项目模板 对话框 -->
    <a-modal
      v-model:open="modalVisible"
      title="添加模板"
      style="width: 330px"
      centered
      @ok="modalVisible = false"
    >
      <div
        class="border-t-[1px] border-[#dcdfe6] border-b-[1px] py-[12px] pb-[36px]"
      >
        <!-- 上传图片 -->
        <div
          @click="showModal"
          style="border: 1px dotted #ccc; cursor: pointer"
          class="w-[280px] h-[130px] mb-[10px] flex items-center justify-center rounded-[10px] text-[#5a5555]"
        >
          <plus-outlined class="text-[30px]"></plus-outlined>
          <div class="ant-upload-text">添加封面</div>
        </div>
        <a-input
          placeholder="项目名称"
          style="width: 280px; margin-bottom: 8px"
        >
        </a-input>
        <a-select ref="select" v-model:value="value1" style="width: 280px">
          <a-select-option v-for="item in data" :key="item.id">{{
            item.name
          }}</a-select-option>
        </a-select>
        <a-textarea
          v-model:value="value"
          placeholder="项目简介"
          :rows="4"
          class="mt-[6px]"
        />
      </div>
    </a-modal>
    <ModifyAvatar v-model:open="open" />
    <div>
      <ProjectList1 v-if="activeKey === '1'" />
      <ProjectList2 v-if="activeKey === '2'" />
      <ProjectList3 v-if="activeKey === '3'" />
      <ProjectList4 v-if="activeKey === '4'" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import ProjectList1 from "./ProjectLists1.vue";
import ProjectList2 from "./ProjectLists2.vue";
import ProjectList3 from "./ProjectLists3.vue";
import ProjectList4 from "./ProjectLists4.vue";
import ModifyAvatar from "@/views/components/ModifyAvatar.vue";
import router from "@/router/index";
import { Key } from "ant-design-vue/es/_util/type";
import { AddProjectTemplate } from "@/service";
const activeKey = ref("1");
const value1 = ref("请选择项目模板(必选)");
const modalVisible = ref<boolean>(false);
const value = ref<string>("");
activeKey.value =
  useRoute().path.split("")[useRoute().path.lastIndexOf("/") + 1];
const handleChange = (activeKey: Key) => {
  router.push(`/projectManagement/ProjectLists/ProjectList/${activeKey}`);
};
//修改头像
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
//获取项目模板的数据
const { data } = useRequest(
  () =>
    AddProjectTemplate({
      limit: 1000,
      offset: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(data.value);
    },
  }
);
</script>
<style>
.ant-tabs-tab {
  height: 65px;
  margin-right: 32px !important;
}
</style>
