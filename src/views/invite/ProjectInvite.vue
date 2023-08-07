<template>
  <div class="w-[100%] h-[100%] bg-[#f5f5f5]">
    <div
      class="w-[476px] p-[25px] m-auto mt-[30px] rounded-[12px] bg-[#fff] text-center"
      style="box-shadow: 0 4px 12px rgba(38, 38, 38, 0.12)"
    >
      <p class="text-[26px] text-center text-[#939393]">arco</p>
      <img
        src="http://192.168.122.36:1024/static/img/new-message.86886448.png"
        class="mt-[60px] h-[43%]"
      />
      <div class="flex flex-col items-center justify-center">
        <img
          :src="inviteData?.data.actor.avatar"
          class="w-[64px] h-[64px] rounded-[50%]"
        />
        <p class="mt-[8px] text-[14px]">
          <span>{{ inviteData?.data.actor.username }}</span
          ><span class="text-[#9393a1] ml-[5px]">邀请你加入项目</span>
        </p>
        <div
          class="font-[800]"
          v-for="item in PersonalMessage?.rows"
          :key="item.id"
        >
          <span
            v-if="href2 === item.url.substring(item.url.lastIndexOf('/') + 1)"
            v-html="item.content.substring(7)"
          ></span>
        </div>
        <a-button
          type="primary"
          style="background-color: #b3e19d"
          class="text-center w-[100%] mt-[8px]"
          disabled
          >已加入</a-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FetchInviteData, getPersonalMessage } from "@/service";
const href2 = ref(
  window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
);
//传参
const { data: inviteData } = useRequest(
  () =>
    FetchInviteData({
      uuid: href2.value,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(inviteData.value?.data.uuid);
    },
  }
);
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
</script>
