<template>
  <div class="w-[100%] h-[800px] p-[20px] pt-[0] rounded-[2px] bg-[#fff]">
    <div class="relative">
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
    </div>
    <!-- 列表 -->
    <div>
      <!-- 全部项目 -->
      <ul v-if="activeKey == '1'">
        <li
          v-for="item in filterData"
          :key="item.id"
          class="w-[100%] border-b-[1px] border-[#eceaea] pb-[4px] flex items-center pl-[8px]"
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
                  class="ml-[10px] bg-[#f0f9eb] text-[#67c23a] px-[10px] py-[5px]"
                  >公开</span
                >
              </div>
              <span class="mt-[13px] text-[#a3a3a3]">{{ item.intro }}</span>
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
            <span class="mt-[7px]">{{ item.creator.username }}</span>
          </div>
          <!-- 进度条 -->
          <div
            class="flex flex-col items-start w-[300px] text-[#a3a3a3] ml-[30px]"
          >
            <span>进度</span>
            <a-progress
              :percent="item.progress"
              status="active"
              class="mt-[7px]"
            />
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
          :defaultPageSize="numberPerPage"
          :total="getdata?.data.rows.length"
          show-less-items
        />
      </ul>
      <!-- 我的收藏 -->
      <ul v-if="activeKey == '2'">
        <li
          class="w-[348px] h-[400px] m-auto mt-[50px] flex items-center justify-center"
        >
          <img
            v-if="getCollectdata?.data.count === 0"
            class="h-[230px]"
            src="	http://192.168.122.36:1024/static/img/empty.0bf7a80e.png"
          />
        </li>
      </ul>
      <!-- 已归档项目 -->
      <ul v-if="activeKey == '3'">
        <li
          v-for="item in getFileData?.data.rows"
          :key="item.id"
          class="w-[100%] border-b-[1px] border-[#eceaea] pb-[4px] flex items-center pl-[8px]"
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
                  class="ml-[10px] bg-[#f0f9eb] text-[#67c23a] px-[10px] py-[5px]"
                  >公开</span
                >
              </div>
              <span class="mt-[13px] text-[#a3a3a3]">{{ item.intro }}</span>
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
            <span class="mt-[7px]">{{ item.creator.username }}</span>
          </div>
          <!-- 进度条 -->
          <div
            class="flex flex-col items-start w-[300px] text-[#a3a3a3] ml-[30px]"
          >
            <span>进度</span>
            <a-progress
              :percent="item.progress"
              status="active"
              class="mt-[7px]"
            />
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
          :defaultPageSize="numberPerPage"
          :total="getdata?.data.rows.length"
          show-less-items
        />
      </ul>
      <!-- 回收站 -->
      <ul v-if="activeKey == '4'">
        <li
          v-for="item in RecyleData"
          :key="item.id"
          class="w-[100%] border-b-[1px] border-[#eceaea] pb-[4px] flex items-center pl-[8px]"
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
                  class="ml-[10px] bg-[#f0f9eb] text-[#67c23a] px-[10px] py-[5px]"
                  >公开</span
                >
              </div>
              <span class="mt-[13px] text-[#a3a3a3]">{{ item.intro }}</span>
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
            <span class="mt-[7px]">{{ item.creator.username }}</span>
          </div>
          <!-- 进度条 -->
          <div
            class="flex flex-col items-start w-[300px] text-[#a3a3a3] ml-[30px]"
          >
            <span>进度</span>
            <a-progress
              :percent="item.progress"
              status="active"
              class="mt-[7px]"
            />
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
          :defaultPageSize="numberPerPage"
          :total="getdata?.data.rows.length"
          show-less-items
        />
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getProjectsData, getFileProject, getRecyleProject } from "@/service";
import { ref } from "vue";
const activeKey = ref("1");
const current = ref(1);
const numberPerPage = 11;

//全部清单
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
const reverseInfo = computed(() => {
  return getdata.value?.data.rows.reverse();
});
const filterData = computed(() => {
  const startIndex = (current.value - 1) * numberPerPage;
  const endIndex = startIndex + numberPerPage;
  return reverseInfo.value?.slice(startIndex, endIndex);
});

//我的收藏
const { data: getCollectdata } = useRequest(
  () =>
    getProjectsData({
      collection: 1,
      is_recycle: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(getCollectdata.value);
    },
  }
);

//已归档项目  getFileProject
const { data: getFileData } = useRequest(
  () =>
    getFileProject({
      collection: 0,
      is_archived: 1,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(getFileData.value);
    },
  }
);

//回收站  getRecyleData
const { data: getRecyleData } = useRequest(
  () =>
    getRecyleProject({
      collection: 0,
      is_recycle: 1,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(getRecyleData.value);
    },
  }
);
//回收站
const RecyleReverseData = computed(() => {
  return getRecyleData.value?.data.rows.reverse();
});
const RecyleData = computed(() => {
  const startIndex = (current.value - 1) * numberPerPage;
  const endIndex = startIndex + numberPerPage;
  return RecyleReverseData.value?.slice(startIndex, endIndex);
});
</script>
<style>
.ant-tabs-tab {
  font-size: 18px;
}
.active .ant-tabs-tab-active {
  border: none;
}
</style>
