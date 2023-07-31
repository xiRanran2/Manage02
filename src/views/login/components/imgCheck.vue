<template>
  <div class="box" ref="qwe">
    <div class="img-box" ref="bgImgRef">
      <img class="bg" :src="imgUrl" alt="" />

      <div
        class="hc"
        :style="{ left: data1.left + 'px', top: data1.top + 'px' }"
      ></div>

      <div
        class="hd"
        :style="{
          left: data.left + 'px',
          top: data.top + 'px',
          backgroundImage: `url(${imgUrl})`,
          backgroundPositionX: 0 - data1.left + 'px',
          backgroundPositionY: 0 - data1.top + 'px',
        }"
      ></div>
    </div>

    <div class="btn-box text-center leading-[40px]" ref="btnbox">
      <div
        ref="btnRef"
        class="btn z-[300] flex justify-center items-center"
        :style="{ left: data.left + 'px' }"
        @mousedown="btnMousedown"
        @mouseup="btnMouseup"
      >
        <Icon
          icon="ic:baseline-double-arrow"
          color="#666"
          class="text-[20px]"
        />
      </div>
      <div
        class="dv_text text-[rgb(238, 238, 238)] relative text-[14px] top-[-50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        请按住滑块拖动
      </div>
    </div>
    <div class="px-[10px] flex h-[40px] items-center bg-[#fff]">
      <Icon icon="iconoir:xbox-x" class="text-[15px] text-[#858585]" />
      <Icon
        icon="solar:refresh-linear"
        @click="toggle"
        class="ml-[10px] text-[15px] text-[#858585]"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, toRefs } from "vue";
import { notification } from "ant-design-vue";
import { isUsersLogin } from "@/service";
import { useRouter } from "vue-router";
// import router from "@/router";
const $router = useRouter();
// 定义向父组件发送的自定义事件
const emits = defineEmits(["update"]);
const updateParentValuess = () => {
  emits("update", "loginView", false);
};
const user = defineProps<{
  propValue: string;
  propPassword: string;
}>();

// 图片切换
let num = 5;
let imgUrl = ref<string>(
  `http://192.168.122.36:1024/static/img/dragChipImgs/${num}.jpg`
);
let toggle = () => {
  num = Math.floor(Math.random() * 9) + 1;
  imgUrl.value = `http://192.168.122.36:1024/static/img/dragChipImgs/${num}.jpg`;
};

// 全局
const qwe = ref<HTMLDivElement>();

const data = reactive<de>({
  left: 0,

  top: 0,

  // 计算出的位置

  btnLeft: 0,

  btnRef: "",

  offsetLeft: 0,

  positon: 0,

  bgImgRef: "",
});

interface de {
  left: number;
  top: number;
  btnLeft: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  btnRef: any;
  offsetLeft: number;
  positon: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bgImgRef: any;
}

const data1 = reactive({
  left: 70,

  // 计算出的位置
  top: 0,

  btnLeft: 0,

  btnRef: null,

  offsetLeft: 0,

  bgImgRef: null,
});

// 解构ref

const { btnRef, bgImgRef } = toRefs(data);

onMounted(() => {
  // data1随机位置

  data1.left = Number((Math.random() * (270 - 70) + 70).toFixed(0));

  data1.top = Number((Math.random() * (210 - 50 - 50) + 50).toFixed(0));
  if (data1.left > 245) {
    data1.left = 245;
  }
  data.top = data1.top;
  if (data.top > 120) {
    data.top = 120;
    data1.top = 120;
  }

  data.offsetLeft = data.bgImgRef.offsetLeft;

  // 监听鼠标松开
  qwe.value?.addEventListener("mouseup", btnMouseup);
});

// 按下

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let btnMousedown = (e: any) => {
  // 计算出鼠标按下的位置 pageX 减去按钮距离窗口的位置等于鼠标点击的位置距离按钮的边距

  data.btnLeft = e.pageX - data.btnRef.offsetLeft;
  qwe.value?.addEventListener("mousemove", btnMousemove);
};

//滑动的时候只要求鼠标没有松开

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var btnMousemove = (e: any) => {
  // left等于鼠标的位置pageX减去data.btnRef.offsetLeft再减去data.btnLeft（计算出的距离）

  let x = ref(e.pageX - data.offsetLeft - data.btnLeft);
  // if (
  //   e.pageX - data.btnRef.offsetLeft < 0 ||
  //   e.pageX - data.btnRef.offsetLeft > 264
  // ) {
  //   x.value = 0;
  // }
  // 判断滑动图片时是否超出范围

  if (x.value <= 0) x.value = 0;
  else if (x.value >= 245) x.value = 245;
  data.left = x.value;
};

// 鼠标松开
let btnMouseup = () => {
  if (data1.left >= data.left - 3 && data1.left <= data.left + 3) {
    // console.log("验证通过");
    isrun();
    // 点击按钮时触发的方法
    updateParentValuess();
  } else {
    data.left = 0;
  }
  document.body.removeEventListener("mousemove", btnMousemove);
};
const { run: isrun } = useRequest(
  () =>
    isUsersLogin({
      username: user.propValue,
      password: user.propPassword,
    }),
  {
    manual: true,
    // 请求成功时
    onSuccess: () => {
      notification.open({
        type: "success",
        message: `账号登录成功`,
      });
      $router.push("/ProjectView");
    },
    // 请求失败时
    onError: () => {
      notification.open({
        type: "error",
        message: `密码错误`,
      });
    },
  }
);
</script>

<style scoped lang="scss">
.box {
  width: 300px;

  height: 280px;

  position: relative;

  z-index: 30;

  /* border: 1px solid #ccc; */
  box-shadow: 0px 0px 10px #6d6d6d !important;

  /* margin: 0 auto; */

  /* padding: 10px; */
}

.img-box {
  width: 300px;
  height: 200px;
  position: relative;
}

.bg {
  width: 300px;
  height: 200px;
}

.hd {
  overflow: hidden;

  /* background: url("http://192.168.122.36:1024/static/img/dragChipImgs/5.jpg"); */

  background-size: 300px 200px;

  background-position: -70px -110px;

  position: absolute;

  height: 50px;

  width: 55px;

  left: 10px;

  cursor: pointer;
}

.hc {
  background: rgb(222, 217, 217);

  position: absolute;

  height: 50px;

  width: 55px;

  left: 81px;

  cursor: pointer;
}

.btn-box {
  width: 100%;

  height: 40px;

  /* border-radius: 5px; */

  background: #e4e4e4;

  /* margin-top: 15px; */
}

.btn {
  position: relative;

  /* top: 5px; */

  left: 26px;

  width: 55px;

  height: 40px;

  text-align: center;

  letter-spacing: 5px;

  line-height: 30px;

  color: #fff;

  /* border-radius: 15px; */

  background-color: rgb(255, 255, 255);

  /* box-shadow: rgb(26 121 255 / 52%) 0px 0px 10px 1px; */

  cursor: pointer;
}
</style>
