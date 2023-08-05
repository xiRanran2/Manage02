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
    <!-- @我 -->
    <ul>
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
  </div>
</template>
<script setup lang="ts"></script>
