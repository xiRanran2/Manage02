<template>
  <ul class="mt-[-8px]">
    <li
      v-for="item in TempalateData"
      :key="item.id"
      class="w-[100%] border-b-[1px] border-[#eceaea] py-[8px] flex items-center justify-between pl-[8px] text-[14px] pr-[20px]"
    >
      <!-- 左边有头像的 -->
      <div class="flex w-[1085px]">
        <img
          class="w-[50px] h-[50px] rounded-[3px]"
          :src="`http://192.168.122.36:1024/${item.cover}`"
        />
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
</template>
<script setup lang="ts">
import { getTemplateData } from "@/service";
const { data: TempalateData } = useRequest(() =>
  getTemplateData({
    is_custom: 1,
    limit: 1000,
    offset: 0,
  })
);
</script>
