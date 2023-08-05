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
      <!-- 全部项目 -->
      <ul v-if="activeKey == '1'" class="mt-[-8px]">
        <li
          v-for="item in TempalateData"
          :key="item.id"
          class="w-[100%] border-b-[1px] border-[#eceaea] py-[8px] flex items-center justify-between pl-[8px] text-[14px] pr-[20px]"
        >
          <!-- 左边有头像的 -->
          <div class="flex w-[1085px]">
            <img class="w-[50px] h-[50px] rounded-[3px]" :src="item.cover" />
            <div class="flex flex-col ml-[5px] items-start">
              <a href="">{{ item.name }}</a>
              <span class="mt-[7px] text-[#a3a3a3]">{{ item.intro }}</span>
            </div>
          </div>
          <!-- 字体图标部分 -->
          <div class="flex w-[200px] justify-end ml-[40px]">
            <a-tooltip
              placement="top"
              class="w-[27.6px] h-[27.6px] rounded-[50%] mr-[8px] border flex items-center justify-center"
            >
              <div class="cursor-pointer">
                <Icon icon="uil:setting" width="12px" color="#606266" />
              </div>
            </a-tooltip>
            <a-tooltip
              placement="top"
              class="w-[27.6px] h-[27.6px] rounded-[50%] mr-[8px] border flex items-center justify-center"
            >
              <div class="cursor-pointer">
                <Icon icon="ph:star-light" width="12px" color="#606266" />
              </div>
            </a-tooltip>
            <a-tooltip
              class="w-[27.6px] h-[27.6px] rounded-[50%] mr-[8px] border flex items-center justify-center"
            >
              <div class="cursor-pointer">
                <a-popconfirm
                  title="你确定要删除当前项吗?"
                  ok-text="确定"
                  cancel-text="删除"
                  @confirm="confirm"
                  @cancel="cancel"
                >
                  <a href="#"
                    ><Icon icon="icomoon-free:bin" width="12px" color="#606266"
                  /></a>
                </a-popconfirm>
              </div>
            </a-tooltip>
          </div>
        </li>
      </ul>
      <!-- 我的收藏 -->
      <ul v-if="activeKey == '2'">
        <li
          v-for="item in TempalaPublicteData"
          :key="item.id"
          class="w-[100%] border-b-[1px] border-[#eceaea] py-[8px] flex items-center justify-between pl-[8px] text-[14px] pr-[20px]"
        >
          <!-- 左边有头像的 -->
          <div class="flex">
            <img class="w-[50px] h-[50px] rounded-[3px]" :src="item.cover" />
            <div class="flex flex-col ml-[5px] items-start">
              <a href="">{{ item.name }}</a>
              <span class="mt-[7px] text-[#a3a3a3]">{{ item.intro }}</span>
            </div>
          </div>
          <!-- 字体图标部分 -->
          <div class="flex justify-end ml-[40px]">
            <p
              v-for="(items, index) in item.project_template_tasks"
              :key="items.id"
              class="flex ml-[5px] text-[#ccc]"
            >
              <Icon icon="bi:arrow-up" :rotate="1" v-if="index !== 0" />{{
                items.name
              }}
            </p>
          </div>
        </li>
      </ul>
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
</template>
<script lang="ts" setup>
import { getTemplateData } from "@/service";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
const activeKey = ref("1");
const value1 = ref("请选择项目模板(必选)");
const modalVisible = ref<boolean>(false);
const value = ref<string>("");
const { data: TempalateData } = useRequest(
  () =>
    getTemplateData({
      is_custom: 1,
      limit: 1000,
      offset: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(TempalateData);
    },
  }
);
const { data: TempalaPublicteData } = useRequest(
  () =>
    getTemplateData({
      is_custom: 0,
      limit: 1000,
      offset: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(TempalaPublicteData);
    },
  }
);
const confirm = (e: MouseEvent) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e: MouseEvent) => {
  console.log(e);
  message.error("Click on No");
};
</script>
<style>
.lis .ant-tabs-nav-list {
  height: 55px !important;
}
</style>
