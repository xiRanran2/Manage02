<template>
  <!-- 我的收藏 -->
  <div>
    <ul v-if="getdata?.count">
      <li
        v-for="(item, index) in getdata.rows"
        :key="item.id"
        class="w-[100%] border-b-[1px] border-[#eceaea] py-[4px] flex items-center pl-[8px] text-[14px]"
      >
        <!-- 左边有头像的 -->
        <div class="flex w-[1085px]">
          <img
            class="w-[50px] h-[50px] rounded-[3px]"
            :src="`http://192.168.122.36:1024${item.cover}`"
          />
          <div class="flex flex-col ml-[5px] items-start">
            <div>
              <a href="">{{ item.name }}</a>
              <span
                class="ml-[5px] text-[10px] bg-[#f0f9eb] text-[#67c23a] px-[5px] py-[2px]"
                >公开</span
              >
            </div>
            <span class="mt-[7px] text-[#a3a3a3]">{{ item.intro }}</span>
          </div>
        </div>
        <!-- 创建日期 -->
        <div class="flex flex-col items-start w-[170px] text-[#a3a3a3]">
          <span>创建日期</span>
          <span class="mt-[7px]">{{ time[index] }}</span>
        </div>
        <!-- 创建人 -->
        <div class="flex flex-col items-start w-[170px] text-[#a3a3a3]">
          <span>创建人</span>
          <span class="mt-[7px]">{{ item.creator.username }}</span>
        </div>
        <!-- 进度条 -->
        <div
          class="flex flex-col items-start w-[300px] text-[#a3a3a3] ml-[30px]"
        >
          <span>进度</span>
          <a-progress :percent="item.progress" status="active" />
        </div>
        <!-- 图标 气泡卡片 -->
        <!-- 字体图标部分 -->
        <div class="flex w-[200px] justify-around ml-[40px]">
          <a-tooltip
            placement="top"
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <template #title>
              <span class="text-[12px]">项目成员</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="ph:user-light" width="12px" color="#606266" />
            </div>
          </a-tooltip>
          <a-tooltip
            placement="top"
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <template #title>
              <span class="text-[12px]">项目设置</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="uil:setting" width="12px" color="#606266" />
            </div>
          </a-tooltip>
          <a-tooltip
            placement="top"
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <template #title>
              <span class="text-[12px]">取消收藏</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="ic:round-star" color="#ffaf38" />
            </div>
          </a-tooltip>
          <a-tooltip
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <template #title>
              <span class="text-[12px]">移至回收站</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="icomoon-free:bin" width="12px" color="#606266" />
            </div>
          </a-tooltip>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li
        class="w-[348px] h-[400px] m-auto mt-[50px] flex items-center justify-center"
      >
        <img
          class="h-[230px]"
          src="	http://192.168.122.36:1024/static/img/empty.0bf7a80e.png"
        />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { getCollectionProject } from "@/service";
//全部清单
const { data: getdata } = useRequest(
  () =>
    getCollectionProject({
      collection: 1,
      is_recycle: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(getdata.value);
    },
  }
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const time: any = computed(() => {
  return getdata.value?.rows.map((item) => {
    return item.created_at.slice(0, 10);
  });
});
</script>
<style></style>
