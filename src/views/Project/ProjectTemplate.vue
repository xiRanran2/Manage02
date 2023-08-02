<template>
  <div class="relative">
    <Header class="h-[65px]"></Header>
    <SideBar
      style="min-height: 94vh"
      class="absolute top-[65px] left-0"
    ></SideBar>
    <div
      class="absolute w-[89.5%] bg-[#f5f5f5] top-[65px] h-[100vh] left-[200px]"
    >
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
        <!-- 全部项目 -->
        <ul v-if="activeKey == '1'"></ul>
        <!-- 我的收藏 -->
        <ul v-if="activeKey == '2'"></ul>
      </div>

      <!-- 创建新项目 对话框 -->
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
          <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">添加封面</div>
            </div>
          </a-upload>
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
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import Header from "@/views/components/HeaderView.vue";
import SideBar from "@/views/Project/components/SideBarView.vue";
const activeKey = ref("1");
const value1 = ref("请选择项目模板(必选)");
const modalVisible = ref<boolean>(false);
const value = ref<string>("");
</script>
