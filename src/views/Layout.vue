<script setup lang="ts">
import HeaderTop from "@/views/components/HeaderView.vue";
import LeftMenu from "@/views/components/LeftMenu.vue";
// import { uploadFile } from "@/service/index";
// // 在文件上传中我们一般借助FormData来组织参数
// const fd = new FormData();
// fd.append("a", "1");
// fd.append("b", "2");
// console.log(fd);
// console.log([...fd.entries()]);
// function change(e: Event) {
//   const fd = new FormData();
//   fd.append("file", (e.target as any).files[0]);
//   uploadFile(fd).then((res) => {
//     console.log(res.path);
//   });
// }
</script>
<template>
  <div>12234234</div>
  <HeaderTop />
  <router-view />
  <LeftMenu />
</template>
