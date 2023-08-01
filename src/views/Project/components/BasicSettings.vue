<template>
  <a-form
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    class="relative"
  >
    <a-form-item label="用户名">
      <a-input
        v-model:value="formState.name"
        :placeholder="userData?.username"
        disabled
      />
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input
        v-model:value="formState.name"
        :placeholder="userData?.email"
        disabled
      />
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="公司">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="城市">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <div @click="showModal">
      <Icon
        ref="iconRef"
        class="absolute top-[80px] right-[90px] z-[99] w-[100px] h-[100px] opacity-0 hover:opacity-100 str"
        icon="fluent:add-32-filled"
        color="white"
        width="20"
      />
      <img
        :src="userData?.avatar"
        alt=""
        class="h-[239px] w-[239px] rounded-[50%] absolute top-5 right-5"
      />
    </div>
    <!-- 对话框 -->
    <div>
      <a-modal
        v-model:open="open"
        :footer="null"
        title="修改头像"
        @ok="hideModal"
        width="680px"
      >
        <hr />
        <div class="w-[656px] h-[501px] py-[30px]">
          <div class="w-[656px] h-[400px] flex justify-between py-[30px]">
            <div class="w-[350px] h-[350px] bg-[#ccc]"></div>
            <div class="w-[250px] h-[350px] flex items-center">
              <img
                src=""
                alt=""
                class="w-[200px] h-[200px] rounded-[50%] bg-[pink]"
              />
            </div>
          </div>
          <div class="flex">
            <div class="pb-[15px]">
              <a-space wrap>
                <a-button type="primary" class="w-[117px] h-[40px]"
                  >选择图片</a-button
                >
                <a-button type="primary" class="w-[56px] h-[40px]">
                  <Icon
                    icon="iconoir:plus"
                    color="white"
                    width="20"
                    class="element"
                  />
                </a-button>
                <a-button type="primary" class="w-[56px] h-[40px]">
                  <Icon
                    icon="iconamoon:sign-minus"
                    color="white"
                    width="20"
                    class="element"
                  />
                </a-button>
                <a-button type="primary" class="w-[56px] h-[40px]">
                  <Icon
                    icon="lucide:rotate-ccw"
                    color="white"
                    width="15"
                    class="element"
                  />
                </a-button>
                <a-button type="primary" class="w-[56px] h-[40px]">
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
                <a-button type="primary" class="w-[70px] h-[40px] background"
                  >保存</a-button
                >
              </a-space>
            </div>
          </div>
          <input type="file" name="" value="" id="avatarFile" />
        </div>
      </a-modal>
    </div>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { UnwrapRef } from "vue";
import { getUserInfoData } from "@/service";
const { data: userData } = useRequest(() => getUserInfoData(), {});
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
const hideModal = () => {
  open.value = false;
};
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
const wrapperCol = { span: 10 };
</script>
<style lang="scss">
.hidden {
  display: inline-block;
}
.str {
  transition: 700ms;
}
.element {
  display: initial !important;
}

.background {
  background-color: #67c23a;
  border-color: #67c23a;
}

.background:where(.css-dev-only-do-not-override-eq3tly).ant-btn-primary:not(
    :disabled
  ):hover {
  color: #fff;
  background-color: #67c23a;
}
</style>
