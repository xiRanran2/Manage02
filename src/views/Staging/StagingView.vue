<template>
  <div class="relative">
    <Header class="h-[65px]"></Header>
    <div class="bg-[#f5f5f5] h-[100vh] p-[13px] mt-[70px]">
      <div
        class="h-[120px] px-[30px] mb-[20px] bg-[#fff] flex items-center justify-between"
      >
        <div class="flex items-center">
          <div
            class="w-[64px] h-[64px] rounded-[50%] overflow-hidden mr-[10px]"
          >
            <img
              src="https://fastly.picsum.photos/id/922/100/100.jpg?hmac=Vl2gKzuSlc2xQOe9H8w_OuezaYx-wv5MHZRLfmQny_E"
              alt=""
            />
          </div>
          <div class="text-left flex h-[64px] flex-col justify-around">
            <div class="text-[20px]">上午好, Wza, 祝你开心每一天!</div>
            <div class="text-[14px] text-[#ccc]">普通用户</div>
          </div>
        </div>
        <div class="h-[64px] flex flex-col justify-around">
          <div class="text-[14px] text-[#ccc]">项目总数</div>
          <div class="text-[25px]">24</div>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="w-[64%] bg-[#fff]">
          <div class="h-[60px] flex justify-between items-center px-[10px]">
            <div class="font-semibold">进行中的项目</div>
            <div class="text-[#409EFF]">全部项目</div>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="item in 12"
              :key="item"
              class="w-[25%] text-left px-[10px] border-t-[1px] border-r-[1px] border-[#ccc] relative overflow-hidden"
            >
              <div
                class="w-[70px] absolute top-[-10px] right-[-10px] pt-[20px] h-[40px] translate-x-[20%] rotate-[45deg] bg-purple-500 bg-opacity-80 text-center text-[14px] text-[#fff]"
              >
                公开
              </div>
              <div class="w-[100%] h-[150px]"></div>
              <div class="text-[15px] h-[24px]">水涨船高</div>
              <div class="text-[15px] h-[24px] text-[#ccc]">暂无介绍</div>
              <div
                class="text-[#ccc] border-t-[1px] border-[#ccc] flex justify-between h-[30px] items-center"
              >
                <span>admin</span>
                <span>4月29日 03:36</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[33%] bg-white">
          <div
            class="flex justify-between items-center h-[60px] px-[20px] border-b-[1px] border-[#f5f5f5]"
          >
            <div>我的任务 - 0</div>
            <a-select
              v-model:value="value"
              label-in-value
              style="width: 100px"
              :options="options"
              @change="handleChange"
            ></a-select>
          </div>
          <div>
            <div class="px-[20px]">
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1">
                  <template #tab>
                    <span class="flex items-center">
                      <Icon icon="lucide:list" class="mr-[4px]" />
                      我执行的
                    </span>
                  </template>
                  Tab 1
                </a-tab-pane>
                <a-tab-pane key="2">
                  <template #tab>
                    <span class="flex items-center">
                      <Icon icon="octicon:people-24" class="mr-[4px]" />
                      我参与的
                    </span>
                  </template>
                  Tab 2
                </a-tab-pane>
                <a-tab-pane key="3">
                  <template #tab>
                    <span class="flex items-center">
                      <Icon icon="gridicons:add-outline" class="mr-[4px]" />
                      我创建的
                    </span>
                  </template>
                  Tab 3
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "@/views/components/HeaderView.vue";
import type { SelectProps } from "ant-design-vue";
const options = ref<SelectProps["options"]>([
  {
    value: "incomplete",
    label: "未完成",
  },
  {
    value: "complete",
    label: "完成",
  },
]);
const handleChange: SelectProps["onChange"] = (value) => {
  console.log(value);
};

const value = ref("incomplete");

const activeKey = ref("1");
</script>
