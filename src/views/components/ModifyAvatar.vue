<template>
  <!-- 修改头像 -->
  <a-modal :footer="null" title="修改头像" @ok="hideModal" width="680px">
    <hr />
    <div class="w-[656px] h-[500px] py-[20px]">
      <div class="w-[654px] h-[400px] flex justify-between py-[30px]">
        <div class="w-[350px] h-[350px]">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :autoCrop="option.autoCrop"
            :canMoveBox="option.canMoveBox"
            :canMove="option.canMove"
            :fillColor="option.fillColor"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixed="option.fixed"
            :fixedBox="option.fixedBox"
            :centerBox="option.centerBox"
            @realTime="realTime"
          >
          </vueCropper>
        </div>
        <div class="w-[250px] h-[350px] flex items-center">
          <div class="avatar-upload-preview">
            <img
              :src="previews.url"
              :style="previews.img"
              alt=""
              class="img_1"
            />
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="pb-[15px]">
          <a-space wrap>
            <a-button
              type="primary"
              style="background-color: #4eaded"
              class="w-[117px] h-[40px]"
              @click="SelectPicture"
              >选择图片</a-button
            >
            <input
              type="file"
              ref="fileInputRef"
              style="display: none"
              @change="handleFileChange"
            />
            <a-button
              type="primary"
              style="background-color: #4eaded"
              class="w-[56px] h-[40px]"
              @click="changeScaleS"
            >
              <Icon
                icon="iconoir:plus"
                color="white"
                width="20"
                class="element"
              />
            </a-button>
            <a-button
              type="primary"
              style="background-color: #4eaded"
              class="w-[56px] h-[40px]"
              @click="changeScale"
            >
              <Icon
                icon="iconamoon:sign-minus"
                color="white"
                width="20"
                class="element"
              />
            </a-button>
            <a-button
              type="primary"
              style="background-color: #4eaded"
              class="w-[56px] h-[40px]"
              @click="rotateLeft"
            >
              <Icon
                icon="lucide:rotate-ccw"
                color="white"
                width="15"
                class="element"
              />
            </a-button>
            <a-button
              type="primary"
              style="background-color: #4eaded"
              class="w-[56px] h-[40px]"
              @click="rotateRight"
            >
              <Icon
                icon="lucide:rotate-cw"
                color="white"
                width="15"
                class="element"
              />
            </a-button>
          </a-space>
        </div>
        <div class="ml-[97px]">
          <a-space wrap>
            <a-button
              type="primary"
              style="background-color: #4eaded"
              class="w-[70px] h-[40px] background"
              @click="genxin"
              >保存</a-button
            >
          </a-space>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, UnwrapRef, ref, h } from "vue";
import { useRequest } from "vue-request";
import { User, upLoadFileRecord } from "@/service";
import { VueCropper } from "vue-cropper";
import "vue-cropper/dist/index.css";

const cover = ref();
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
const hideModal = () => {
  open.value = false;
};

const imagePath = ref("");
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  const formdata = new FormData();
  formdata.append("file", file ?? "");
  const { data: data } = useRequest(() => upLoadFileRecord(formdata));
  cover.value = data;
  if (file) {
    imagePath.value = URL.createObjectURL(file);
  }
  //   console.log(file);
};

const { data: data } = useRequest(() => User());
interface FormState {
  name: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
const formState: UnwrapRef<FormState> = reactive({
  name: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 15 };

// 编辑图片
const cropper = ref();
// 右旋转
const rotateRight = () => {
  cropper.value?.rotateRight();
};
// 左旋转
const rotateLeft = () => {
  cropper.value?.rotateLeft();
};
// +
const changeScale = () => {
  cropper.value?.changeScale(-1);
};
// -
const changeScaleS = () => {
  cropper.value?.changeScale(1);
};
// 获取图片
const fileInputRef = ref();
const SelectPicture = () => {
  fileInputRef.value.click();
};
// 组件
const option = reactive({
  img: imagePath,
  outputType: "png",
  size: 1,
  autoCrop: true,
  canMoveBox: true,
  canMove: false,
  fillColor: "#000",
  autoCropWidth: "200px",
  autoCropHeight: "200px",
  fixed: true,
  fixedBox: true,
  enlarge: 1,
  centerBox: true,
});
const previews: any = ref({});
const realTime = (data: any) => {
  previews.value = data;
};
// 更新图片
const genxin = () => {
  // data._rawValue.avatar = previews.value.url;
  open.value = false;
};
</script>
<style>
.images {
  box-shadow: 0 0 10px #ccc;
}

.element {
  display: initial !important;
}

.abc {
  box-shadow: 0 0 4px #ccc;
}

.background {
  background-color: #67c23a;
}

.background:where(.css-dev-only-do-not-override-eq3tly).ant-btn-primary:not(
    :disabled
  ):hover {
  color: #fff;
  background-color: #67c23a;
}
.plus {
  transition: 500ms;
  transform: translate(-50%, -50%);
}

.avatar-upload-preview {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
}

.img_1 {
  max-width: none !important;
}
</style>
