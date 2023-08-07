<template>
  <ul>
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
</template>
<script lang="ts" setup>
import { getTemplateData } from "@/service";
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
</script>
