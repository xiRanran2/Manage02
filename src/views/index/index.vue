<template>
  <div class="w-[100%] mt-[80px] ml-[30px]">
    <div id="main"></div>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
let initPriority = () => {
  let myChart = echarts.init(document.getElementById("main"));
  const option = {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};
onMounted(() => {
  initPriority();
});
</script>
<style>
#main,
#priority {
  width: 450px;
  height: 300px;
}
</style>
