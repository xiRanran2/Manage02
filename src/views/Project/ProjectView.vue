<template>
  <div class="relative">
    <Header class="h-[65px]"></Header>
    <SideBar
      style="min-height: 94vh"
      class="absolute top-[65px] left-0"
    ></SideBar>
    <div
      class="absolute w-[89.5%] bg-[#f5f5f5] top-[65px] h-[100vh] left-[200px]"
    >
      <div class="w-[97%] ml-[30px] mt-[30px]">
        <!-- 项目列表 -->
        <ProjectList></ProjectList>
        <!-- 个人设置 -->
        <!-- <PersonalSetting class="absolute top-[80px] left-[400px]"></PersonalSetting> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "@/views/components/HeaderView.vue";
import SideBar from "@/views/Project/components/SideBarView.vue";
// import PersonalSetting from "@/views/Project/components/PersonalSetting.vue";
import ProjectList from "./components/ProjectList.vue";
</script>
