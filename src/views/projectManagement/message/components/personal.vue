<template>
  <div>
    <div class="px-[15px]">
      <div class="flex justify-end items-center">
        <a-form
          ref="formRef"
          name="advanced_search"
          class="ant-advanced-search-form w-[390px] h-[50px] flex items-center justify-center"
        >
          <a-form-item :rules="[{ required: true }]">
            <a-input placeholder="内容" class="mt-[23px]" /> </a-form-item
          ><a-button
            type="primary"
            html-type="submit"
            style="background-color: rgb(40, 150, 240)"
            class="flex items-center justify-center ml-[10px]"
            ><Icon icon="ri:search-line" class="mr-[8px]" />查询</a-button
          ></a-form
        >
      </div>
    </div>
    <!-- 私信 -->
    <ul v-if="PersonalMessage?.count === 0">
      <li
        class="w-[100%] border-b-[1px] border-[#eceaea] py-[12px] flex items-center justify-between pl-[8px] text-[14px] pr-[20px] text-[#606266]"
      >
        <div class="pl-[20px]">内容</div>
        <div>
          <span class="mr-[147px]">时间</span>
          <span class="pr-[160px]">操作</span>
        </div>
      </li>
      <li
        class="w-[100%] border-b-[1px] border-[#eceaea] py-[23px] flex items-center justify-center pl-[8px] text-[14px] pr-[20px] text-[#606266]"
      >
        <span class="text-[#909399]">暂无内容</span>
      </li>
    </ul>
    <ul v-else>
      <li
        class="w-[100%] border-b-[1px] border-[#eceaea] py-[12px] flex items-center justify-between pl-[8px] text-[14px] pr-[20px] text-[#606266]"
      >
        <div class="pl-[20px]">内容</div>
        <div class="pr-[81px]">
          <span class="mr-[212px]">时间</span>
          <span class="pr-[92px]">操作</span>
        </div>
      </li>
      <li
        v-for="item in PersonalMessage?.rows"
        :key="item.id"
        class="w-[100%] border-b-[1px] border-[#eceaea] py-[23px] flex items-center justify-between pl-[8px] text-[14px] pr-[20px] text-[#606266]"
      >
        <div class="pl-[20px] flex items-center spanStyle">
          <img
            :src="item.actor.avatar"
            class="w-[32px] h-[32px] rounded-[50%]"
          />
          <span class="ml-[9px]">{{ item.actor.username }}</span>
          <a-button type="link" v-html="item.content"></a-button>
        </div>
        <div class="flex items-center">
          <div class="mr-[124px]">{{ item.created_at }}</div>
          <div class="pr-[120px]">
            <a-button type="link" @click="router.push(`${item.url}`)"
              >查看</a-button
            >
            <a-button type="text" disabled>已读</a-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { getPersonalMessage } from "@/service";
const { data: PersonalMessage } = useRequest(
  () =>
    getPersonalMessage({
      prop_order: "id",
      order: "desc",
      pageNo: 1,
      pageSize: 10,
      keyword: null,
      type: "personal",
      receiver_id: 73,
      limit: 10,
      offset: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(PersonalMessage.value);
    },
  }
);
//传参
</script>
<style>
.spanStyle .ant-btn-link {
  color: #000;
}
.spanStyle .ant-btn-link .project-name {
  color: rgb(104, 157, 244);
}
</style>
