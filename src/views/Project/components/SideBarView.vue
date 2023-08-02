<template>
  <!-- 侧边栏 -->
  <a-layout
    style="
      min-height: 94vh;
      box-shadow: 0 0 10px #ccc;
      max-width: 80px;
      min-width: 80px;
      width: 80px;
    "
  >
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      style="background-color: white"
    >
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span class="flex justify-center items-center">
              <span class="ml-[5px]">项目列表</span>
            </span>
          </template>
          <a-menu-item key="2">全部项目</a-menu-item>
          <a-menu-item key="3">我的收藏</a-menu-item>
          <a-menu-item key="4">已归档项目</a-menu-item>
          <a-menu-item key="5">回收站</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="1">
          <span class="flex items-center justify-center">
            <Icon icon="solar:notebook-linear" />
            <span>项目模板</span>
          </span>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>消息提醒</span>
            </span>
          </template>
          <a-menu-item key="6"
            ><span class="flex items-center"
              ><Icon
                icon="ant-design:message-outlined"
                class="mr-[3px] text-[#909399] text-[19px]"
              />@我</span
            ></a-menu-item
          >
          <a-menu-item key="8"
            ><span class="flex items-center"
              ><Icon
                icon="mingcute:horn-line"
                class="mr-[3px] text-[#909399] text-[19px]"
              />通知</span
            ></a-menu-item
          >
          <a-menu-item key="9"
            ><span class="flex items-center"
              ><Icon
                icon="wpf:message-outline"
                class="mr-[3px] text-[#909399] text-[19px]"
              />私信</span
            ></a-menu-item
          >
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
  </a-layout>
</template>
<script lang="ts" setup>
import { TeamOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
</script>
<style></style>
