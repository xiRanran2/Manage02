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
        <a-progress :percent="item.progress" status="active" />
      </div>
      <!-- 图标 气泡卡片 -->
      <!-- 字体图标部分 -->
      <div class="flex w-[200px] justify-around ml-[40px]">
        <el-button
          role="button"
          tabindex="0"
          style="border-radius: 50%"
          class="w-[27.6px] h-[27.6px] border flex items-center justify-center"
          @click="dialogVO(item)"
          ><a-tooltip placement="top">
            <template #title>
              <span class="text-[12px]">项目成员</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="ph:user-light" width="12px" color="#606266" />
            </div> </a-tooltip
        ></el-button>
        <el-button
          style="border-radius: 50%"
          @click="showModalB(item)"
          class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          ><a-tooltip placement="top">
            <template #title>
              <span class="text-[12px]">项目设置</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="uil:setting" width="12px" color="#606266" />
            </div> </a-tooltip
        ></el-button>
        <el-button
          :plain="true"
          @click="open2"
          style="border-radius: 50%"
          class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          ><a-tooltip placement="top">
            <template #title>
              <span class="text-[12px]">加入收藏</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="ph:star-light" width="12px" color="#606266" />
            </div> </a-tooltip
        ></el-button>
        <el-button
          @click="DeleteObject"
          style="border-radius: 50%"
          class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
        >
          <a-tooltip>
            <template #title>
              <span class="text-[12px]">移至回收站</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="icomoon-free:bin" width="12px" color="#606266" />
            </div> </a-tooltip
        ></el-button>
      </div>
    </li>
    <!-- 项目设置 -->
    <div class="setting">
      <a-modal
        v-model:open="openB"
        :footer="null"
        width="660px"
        title="项目设置"
        @ok="handleOkB"
      >
        <div
          class="h-[620px] overflow-hidden mt-[16px] pt-[10px]"
          style="border-top: 1px solid #e9e9e9"
        >
          <a-tabs
            v-model:activeKey="activeKeyTab"
            :tab-position="mode"
            :style="{ height: '270px' }"
            @tabScroll="callback"
          >
            <a-tab-pane key="1" tab="概览">
              <div>
                <form action="">
                  <div class="text-[#606266] text-[14px]">
                    <div class="pb-[10px]">项目封面</div>
                    <div class="w-[290px] h-[160px] rounded-[3px]">
                      <img
                        :src="`http://192.168.122.36:1024/${datas.cover}`"
                        alt=""
                        class="w-[290px] h-[160px] rounded-[3px]"
                      />
                    </div>
                  </div>
                  <div class="flex text-[14px] justify-between mt-[20px]">
                    <div class="w-[220px] h-[56px] mb-[10px]">
                      <div class="flex">
                        <div class="text-[red]">*</div>
                        <div class="pb-[5px]">项目名称</div>
                      </div>
                      <div>
                        <a-input
                          type="text"
                          :placeholder="`${datas.name}`"
                          disabled
                          class="bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed h-[28px] pl-[10px] w-[100%]"
                        />
                      </div>
                    </div>
                    <div class="w-[220px] h-[56px] mb-[10px]">
                      <div class="flex">
                        <div class="text-[red]">*</div>
                        <div class="pb-[5px]">项目进度(%)</div>
                      </div>
                      <div>
                        <a-input
                          type="text"
                          :placeholder="`${datas.progress}`"
                          disabled
                          class="bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed h-[28px] pl-[10px] w-[100%]"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="w-[100%] text-[14px] mb-[18px]">
                    <div class="pb-[5px]">项目介绍</div>
                    <div>
                      <a-textarea
                        name=""
                        id=""
                        disabled
                        placeholder="介绍一下这个项目"
                        class="w-[100%] h-[60px] bg-[#F5F7FA] border-[#E4E7ED] px-[15px] py-[5px] text-[10px] rounded-[5px]"
                      ></a-textarea>
                    </div>
                  </div>
                  <div class="w-[100%] h-[56px] mb-[18px]">
                    <div class="pb-[5px]">项目公开性</div>
                    <div class="relative">
                      <a-input
                        type="text"
                        disabled
                        placeholder="请选择"
                        class="w-[100%] h-[28px] rounded-[5px] bg-[#F5F7FA] border-[#E4E7ED] text-[#C0C4CC] text-[10px] pl-[10px]"
                      />
                      <span
                        class="absolute right-0 top-0 h-[28px] text-[#ccc] flex items-center"
                        ><Icon icon="formkit:right" width="17" :rotate="1"
                      /></span>
                    </div>
                  </div>
                  <div class="w-[100%] text-[14px] mb-[18px]">
                    <div class="pb-[10px]">项目拥有者</div>
                    <div class="w-[100%] h-[40px] flex items-center">
                      <div class="rounded-[50%]">
                        <img
                          class="w-[40px] h-[40px] rounded-[50%]"
                          :src="`${datas.creator.avatar}`"
                          alt=""
                        />
                      </div>
                      <p class="pl-[10px]">{{ datas.creator.username }}</p>
                    </div>
                  </div>
                </form>
                <div class="flex justify-end">
                  <button
                    class="w-[73px] h-[40px] bg-[#a0cfff] border-[#a0cfff] rounded-[5px] text-[#fff]"
                  >
                    确定
                  </button>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="项目偏好">
              <div class="text-[14px] text-[#606266]">
                <div class="flex justify-between items-center mb-[8px]">
                  <p>自动更新项目进度</p>
                  <a-switch
                    class="bg-[#ccc]"
                    v-model:checked="checked"
                    disabled
                  />
                </div>
                <div>根据当前任务的完成情况自动计算项目进度</div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="3">
              <template #tab>
                <span class="flex items-center justify-center"
                  >更多<Icon icon="ri:more-line" class="ml-[5px]"
                /></span>
              </template>
              <div class="text-[14px]">
                <div class="text-[16px] font-semibold leading-[30px] h-[30px]">
                  项目操作
                </div>
                <div class="h-[30px] leading-[30px] text-[#ccc]">
                  您可以执行以下操作
                </div>
                <div class="flex justify-between w-[260px] h-[40px] mt-[20px]">
                  <a-button
                    disabled
                    style="background-color: #fef0f0"
                    class="w-[97.6px] h-[39.6px] text-[#f9a7a7] rounded-[5px]"
                  >
                    <span>归档项目</span>
                  </a-button>
                  <a-button
                    disabled
                    style="background-color: #fef0f0"
                    class="w-[97.6px] h-[39.6px] text-[#f9a7a7] rounded-[5px] ml-[10px]"
                  >
                    <span>退出</span>
                  </a-button>
                  <a-button
                    disabled
                    style="background-color: #fab6b6"
                    class="w-[111.6px] h-[39.6px] text-[#fff] rounded-[5px] ml-[10px]"
                  >
                    <span>移至回收站</span>
                  </a-button>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-modal>
    </div>
    <!-- 项目成员 -->
    <el-dialog
      v-model="dialogVisible"
      title="项目成员"
      style="width: 33%"
      class="text-left"
    >
      <a-input
        class="border-[1.5px] w-[100%] h-[36px] mb-[8px] border-[#d3d3d3]"
        placeholder="请输入用户名或邮箱查找"
      />
      <hr />
      <div
        v-for="(item, index) in datas.member"
        :key="item.id"
        class="h-[60px] flex items-center justify-between mt-[10px]"
      >
        <div
          v-if="index === 0"
          class="w-[100%] flex items-center justify-between"
        >
          <div class="flex items-center">
            <div>
              <img
                class="w-[36px] h-[36px] rounded-[8px]"
                :src="item.avatar"
                alt=""
              />
            </div>
            <div class="ml-[16px] flex flex-col">
              <span>{{ item.username }}</span>
              <span class="mt-[8px]">{{ item.email }}</span>
            </div>
          </div>
          <div class="flex">
            <Icon class="mr-[10px]" icon="openmoji:person" />
            <span>拥有者</span>
          </div>
        </div>
        <div v-else class="w-[100%] flex items-center justify-between">
          <div class="flex items-center">
            <div>
              <img
                class="w-[36px] h-[36px] rounded-[8px]"
                :src="item.avatar"
                alt=""
              />
            </div>
            <div class="ml-[16px] flex flex-col">
              <span>{{ item.username }}</span>
              <span class="mt-[8px]">{{ item.email }}</span>
            </div>
          </div>
          <div class="flex">
            <Icon class="mr-[10px]" icon="game-icons:character" />
            <span>已加入</span>
          </div>
        </div>
      </div>
    </el-dialog>

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
const detailsData: any = ref([]);

import { getProjectsData } from "@/service";
import usePagination from "@/hooks/usePagination";
import { TabsProps } from "ant-design-vue/es/tabs";
import { ElMessage, ElMessageBox } from "element-plus";
//加入收藏
const open2 = () => {
  ElMessage({
    message: "收藏成功.",
    type: "success",
  });
};
//加入回收站
const DeleteObject = () => {
  ElMessageBox.confirm("你却请要将当前项移至回收站?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
//全部清单
const datas = ref();
const showModalB = (id: object) => {
  datas.value = id;
  console.log(datas.value);
  openB.value = true;
};
const dialogVisible = ref(false);
const dialogVO = (id: object) => {
  datas.value = id;
  // console.log(datas.value);
  dialogVisible.value = true;
};
const { data } = useRequest(
  () =>
    getProjectsData({
      collection: 0,
      is_recycle: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      // console.log(data.value);
    },
  }
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
//点击出现
const openB = ref<boolean>(false);
const handleOkB = (e: MouseEvent) => {
  // console.log(e);
  openB.value = false;
};
const mode = ref<TabsProps["tabPosition"]>("left");
const activeKeyTab = ref("1");
const callback: TabsProps["onTabScroll"] = (val) => {
  console.log(val);
};
const checked = ref<boolean>(false);
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
.setting .ant-tabs-tab {
  margin: 0 !important;
}
</style>
