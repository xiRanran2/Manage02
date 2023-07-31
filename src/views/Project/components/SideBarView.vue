<template>
  <!-- 侧边栏 -->
  <a-layout style="min-height: 100vh; box-shadow: 0 0 10px #ccc">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
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
    <!-- <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          Bill is a cat.
        </div>
      </a-layout-content>
    </a-layout> -->
  </a-layout>
</template>
<script lang="ts" setup>
import { TeamOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
</script>
<style>
.ant-layout-sider-children,
.ant-menu-inline,
.ant-menu-dark {
  color: #000;
  background-color: #fff !important;
}
</style>
