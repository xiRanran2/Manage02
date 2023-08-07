<template>
  <ul>
    <li
      v-for="(item, index) in reverseInfo"
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
      <div class="flex flex-col items-start w-[300px] text-[#a3a3a3] ml-[30px]">
        <span>进度</span>
        <a-progress :percent="item.progress" status="active" :size="[100, 5]" />
      </div>
      <!-- 图标 气泡卡片 -->
      <div class="flex w-[150px] justify-end pr-[38px] ml-[40px]">
        <el-button
          role="button"
          tabindex="0"
          style="border-radius: 50%"
          class="w-[27.6px] h-[27.6px] border flex items-center justify-center"
          ><a-tooltip placement="top">
            <template #title>
              <span class="text-[12px]">从归档中恢复项目</span>
            </template>
            <div class="cursor-pointer">
              <Icon
                icon="material-symbols:refresh"
                width="12px"
                color="#606266"
              />
            </div> </a-tooltip
        ></el-button>
        <el-button
          role="button"
          tabindex="0"
          style="border-radius: 50%"
          class="w-[27.6px] h-[27.6px] border flex items-center justify-center"
        >
          <a-tooltip>
            <template #title>
              <span class="text-[12px]">移至回收站</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="icomoon-free:bin" width="12px" color="#606266" />
            </div>
          </a-tooltip>
        </el-button>
      </div>
    </li>
    <a-pagination
      class="mt-[15px]"
      v-model:current="current"
      v-model:page-size="limit"
      :total="total"
      :defaultPageSize="2"
    />
  </ul>
</template>
<script lang="ts" setup>
import { getFileProject } from "@/service";
import usePagination from "@/hooks/usePagination";
//全部清单
const { data } = useRequest(() =>
  getFileProject({
    collection: 0,
    is_archived: 1,
  })
);
//每一页的数据条数
const limit = ref(11);
const { data: getdata, total, current } = usePagination(data, limit);
const reverseInfo = computed(() => {
  return getdata.value?.reverse();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const time: any = computed(() => {
  return getdata.value?.map((item) => {
    return item.created_at.slice(0, 10);
  });
});
</script>
<style>
.ant-tabs-tab {
  font-size: 18px;
}
.active .ant-tabs-tab-active {
  border: none;
}
.lis .ant-tabs-nav-list {
  height: 55px !important;
}

.ant-upload-select-picture-card {
  width: 280px !important;
  height: 130px !important;
  margin-top: 15px !important;
}
</style>
