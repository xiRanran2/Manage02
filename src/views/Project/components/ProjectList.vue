<template>
  <div class="w-[100%] p-[20px] pt-[0] rounded-[2px] bg-[#fff]">
    <div class="relative lis">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部项目"></a-tab-pane>
        <a-tab-pane key="2" tab="我的收藏" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="已归档项目"></a-tab-pane>
        <a-tab-pane key="4" tab="回收站"></a-tab-pane>
      </a-tabs>
      <a-button
        type="primary"
        @click="modalVisible = true"
        class="flex absolute right-[8px] top-[13px] h-[36px] leading-[36px] justify-center items-center"
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
          v-for="item in reverseInfo"
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
                <span class="text-[12px]">加入收藏</span>
              </template>
              <div class="cursor-pointer">
                <Icon icon="ph:star-light" width="12px" color="#606266" />
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
        <a-pagination
          class="mt-[15px]"
          v-model:current="current"
          v-model:page-size="limit"
          :total="total"
          :pageSizeOptions="['2', '5', '8', '10']"
          :defaultPageSize="2"
          show-size-changer
        />
      </ul>
      <!-- 我的收藏 -->
      <ul v-if="activeKey == '2'">
        <li
          class="w-[348px] h-[400px] m-auto mt-[50px] flex items-center justify-center"
        >
          <img
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
            <a-progress :percent="item.progress" status="active" />
          </div>
          <!-- 图标 气泡卡片 -->
          <div class="flex w-[150px] justify-end pr-[38px] ml-[40px]">
            <a-tooltip
              placement="top"
              class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center mr-[10px]"
            >
              <template #title>
                <span class="text-[12px]">从归档中恢复项目</span>
              </template>
              <div class="cursor-pointer">
                <Icon
                  icon="material-symbols:refresh"
                  width="12px"
                  color="#606266"
                />
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
        <a-pagination
          class="mt-[15px]"
          v-model:current="current"
          v-model:page-size="limit"
          :total="total"
        />
      </ul>
      <!-- 回收站 -->
      <ul v-if="activeKey == '4'">
        <li
          v-for="item in RecyleData"
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
            <a-progress :percent="item.progress" status="active" />
          </div>
          <!-- 图标 气泡卡片 -->
          <div class="flex w-[150px] justify-end pr-[25px] ml-[40px]">
            <a-tooltip
              placement="top"
              class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
            >
              <template #title>
                <span class="text-[12px]">从回收站中恢复项目</span>
              </template>
              <div class="cursor-pointer">
                <Icon
                  icon="material-symbols:refresh"
                  width="12px"
                  color="#606266"
                />
              </div>
            </a-tooltip>
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
    </div>

    <!-- 创建新项目 对话框 -->
    <a-modal
      v-model:open="modalVisible"
      title="添加项目"
      style="width: 330px"
      centered
      @ok="modalVisible = false"
    >
      <div
        class="border-t-[1px] border-[#dcdfe6] border-b-[1px] py-[12px] pb-[36px]"
      >
        <!-- 上传图片 -->
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">添加封面</div>
          </div>
        </a-upload>
        <a-input
          placeholder="项目名称"
          style="width: 280px; margin-bottom: 8px"
        >
        </a-input>
        <a-select ref="select" v-model:value="value1" style="width: 280px">
          <a-select-option value="产品进展">产品进展</a-select-option>
        </a-select>
        <a-textarea
          v-model:value="value"
          placeholder="项目简介"
          :rows="4"
          class="mt-[6px]"
        />
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { getProjectsData, getFileProject, getRecyleProject } from "@/service";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import usePagination from "@/hooks/usePagination";
const activeKey = ref("1");
const value1 = ref("请选择项目模板(必选)");
const numberPerPage = 11;
const modalVisible = ref<boolean>(false);
const value = ref<string>("");
// const current = ref(1);
//全部清单
const { data } = useRequest(() =>
  getProjectsData({
    collection: 0,
    is_recycle: 0,
  })
);
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
//每一页的数据条数
const limit = ref(11);
const { data: getdata, total, current } = usePagination(data, limit);
const reverseInfo = computed(() => {
  return getdata.value?.reverse();
});
// const filterData = computed(() => {
//   const startIndex = (current.value - 1) * numberPerPage;
//   const endIndex = startIndex + numberPerPage;
//   return reverseInfo.value?.slice(startIndex, endIndex);
// });

//我的收藏

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
  return getRecyleData.value?.reverse();
});
const RecyleData = computed(() => {
  const startIndex = (current.value - 1) * numberPerPage;
  const endIndex = startIndex + numberPerPage;
  return RecyleReverseData.value?.slice(startIndex, endIndex);
});

//上传图片
function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>("");

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const beforeUpload = (file: UploadProps["fileList"][number]) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
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
