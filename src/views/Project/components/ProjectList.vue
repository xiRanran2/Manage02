<template>
  <div class="w-[100%] h-[790px] p-[20px] rounded-[2px] bg-[#fff]">
    <header class="relative">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部项目"></a-tab-pane>
        <a-tab-pane key="2" tab="我的收藏" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="已归档项目"></a-tab-pane>
        <a-tab-pane key="4" tab="回收站"></a-tab-pane>
      </a-tabs>
      <a-button
        type="primary"
        class="flex absolute right-[8px] top-[20px] h-[40px] leading-[40px] justify-center items-center"
        style="background-color: #409eff"
        ><p class="flex text-[white] items-center justify-center mt-[12px]">
          <Icon icon="material-symbols:add" class="mr-[6px]" /><span
            >创建新项目</span
          >
        </p></a-button
      >
    </header>
    <!-- 列表 -->
    <ul class="">
      <li
        class="w-[100%] border-b-[1px] border-[#eceaea] pb-[4px] flex items-center pl-[8px]"
      >
        <!-- 左边有头像的 -->
        <div class="flex w-[1085px]">
          <img
            src="	http://192.168.122.36:1024/public/uploads/20230428045359_737260819.jpg
"
            class="w-[50px] h-[50px] rounded-[3px]"
          />
          <div class="flex flex-col ml-[5px] items-start">
            <div>
              <a href="">板蓝根</a>
              <span
                class="ml-[10px] bg-[#f0f9eb] text-[#67c23a] px-[10px] py-[5px]"
                >公开</span
              >
            </div>
            <span class="mt-[13px] text-[#a3a3a3]">商店超市菜市场完全</span>
          </div>
        </div>
        <!-- 创建日期 -->
        <div class="flex flex-col items-start w-[170px] text-[#a3a3a3]">
          <span>创建日期</span>
          <span class="mt-[7px]">2023-4-30</span>
        </div>
        <!-- 创建人 -->
        <div class="flex flex-col items-start w-[170px] text-[#a3a3a3]">
          <span>创建人</span>
          <span class="mt-[7px]">冰冰不爱吃香菜</span>
        </div>
        <!-- 进度条 -->
        <div
          class="flex flex-col items-start w-[300px] text-[#a3a3a3] ml-[30px]"
        >
          <span>进度</span>
          <a-progress :percent="50" status="active" class="mt-[7px]" />
        </div>
        <!-- 图标 气泡卡片 -->
        <div class="flex w-[200px] justify-around ml-[40px]">
          <!-- 成员 -->
          <a-popover placement="top" class="mr-[5px]">
            <template #content>
              <span>项目成员</span>
            </template>
            <a-button
              type="text"
              class="w-[20px] rounded-[130%] border-[#b1b1b1]"
              ><Icon
                icon="octicon:person-24"
                class="text-[20px] mt-[0px] ml-[-11px] text-[#9b9999]"
            /></a-button>
          </a-popover>
          <a-popover placement="top" class="mr-[5px]">
            <template #content>
              <span>项目设置</span>
            </template>
            <a-button
              type="text"
              class="w-[20px] rounded-[130%] border-[#b1b1b1]"
              ><Icon
                icon="ep:setting"
                class="text-[20px] mt-[0px] ml-[-11px] text-[#9b9999]"
            /></a-button>
          </a-popover>
          <a-popover placement="top" class="mr-[5px]">
            <template #content>
              <span>加入收藏</span>
            </template>
            <a-button
              type="text"
              class="w-[20px] rounded-[130%] border-[#b1b1b1]"
              ><Icon
                icon="ph:star"
                class="text-[20px] mt-[0px] ml-[-11px] text-[#9b9999]"
            /></a-button>
          </a-popover>
          <a-popover placement="top">
            <template #content>
              <span>移至回收站</span>
            </template>
            <a-button
              type="text"
              class="w-[20px] rounded-[130%] border-[#b1b1b1]"
              ><Icon
                icon="icomoon-free:bin"
                class="text-[20px] mt-[0px] ml-[-8px] text-[#9b9999] mr-[5px]"
            /></a-button>
          </a-popover>
        </div>
      </li>
      <a-pagination
        class="mt-[15px]"
        v-model:current="current"
        :total="50"
        show-less-items
      />
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { getProjectsData } from "@/service";
import { ref } from "vue";
const activeKey = ref("1");
const current = ref(2);
const { data: getdata } = useRequest(
  () =>
    getProjectsData({
      collection: 0,
      is_recycle: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(getdata.value);
    },
  }
);
</script>
<style scoped>
.active .ant-tabs-tab-active {
  border: none;
}
</style>
