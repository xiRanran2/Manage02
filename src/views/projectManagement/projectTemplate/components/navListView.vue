<template>
  <div class="px-[15px]">
    <div class="relative lis">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="自定义模板"></a-tab-pane>
        <a-tab-pane key="2" tab="公共模板"></a-tab-pane>
      </a-tabs>
      <a-button
        type="primary"
        @click="modalVisible = true"
        class="flex absolute right-[8px] top-[13px] h-[36px] leading-[36px] justify-center items-center"
        style="background-color: #409eff"
        ><p class="flex text-[white] items-center justify-center mt-[12px]">
          <Icon icon="material-symbols:add" class="mr-[6px]" /><span
            >创建项目模板</span
          >
        </p></a-button
      >
    </div>
    <!-- 列表 -->
    <div>
      <PersonalTemplate v-if="activeKey === '1'" />
      <PublicTemplate v-if="activeKey === '2'" />
    </div>

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
          <a-select-option value="产品进展">产品进展</a-select-option>
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
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import PublicTemplate from "./PublicTemplateView.vue";
import PersonalTemplate from "./PersonalTemplateView.vue";
import ModifyAvatar from "@/views/components/ModifyAvatar.vue";
const activeKey = ref("1");
const value1 = ref("请选择项目模板(必选)");
const modalVisible = ref<boolean>(false);
const value = ref<string>("");
//修改头像
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
</script>
<style>
.lis .ant-tabs-nav-list {
  height: 55px !important;
}
</style>
