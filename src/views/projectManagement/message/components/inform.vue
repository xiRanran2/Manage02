<template>
  <!-- 通知 -->
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
    <ul v-if="data?.count === 0">
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
      <li
        class="w-[100%] py-[23px] flex items-center justify-center pl-[8px] text-[14px] pr-[20px] text-[#606266]"
      >
        <div class="flex justify-center items-center">
          <span class="text-[#909399] mr-[8px]">共0条</span>
          <a-pagination
            size="small"
            :total="10"
            show-size-changer
            show-quick-jumper
          />
        </div>
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
        v-for="item in data?.rows"
        :key="item.id"
        class="w-[100%] border-b-[1px] border-[#eceaea] py-[23px] flex items-center justify-between pl-[8px] text-[14px] pr-[20px] text-[#606266]"
      >
        <div class="pl-[20px] flex items-center">
          <img
            :src="item.actor.avatar"
            class="w-[32px] h-[32px] rounded-[50%]"
          />
          <span class="ml-[9px]">{{ item.actor.username }}</span>
          <span class="mr-[7px]">{{ item.content.slice(0, 8) }}</span>
          <a-button type="link">{{ item.content.slice(35, 41) }}</a-button>
        </div>
        <div class="flex items-center">
          <div class="mr-[124px]">{{ item.created_at }}</div>
          <div class="pr-[120px]">
            <a-button type="link">查看</a-button>
            <a-button type="text" disabled>已读</a-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { getInformMessage } from "@/service";
const { data } = useRequest(() =>
  getInformMessage({
    prop_order: "id",
    order: "desc",
    pageNo: 1,
    pageSize: 10,
    keyword: null,
    type: "inform",
    receiver_id: 73,
    limit: 10,
    offset: 0,
  })
);
</script>
