<template>
  <div>
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
    >
      <a-form-item label="昵称"
        ><a-input v-model:value="value1" allow-clear
      /></a-form-item>
      <a-form-item label="手机号">
        <a-input v-model:value="value2" allow-clear />
      </a-form-item>
      <a-form-item label="公司"
        ><a-input v-model:value="value3" allow-clear
      /></a-form-item>
      <a-form-item label="城市">
        <a-input v-model:value="value4" allow-clear /> </a-form-item
    ></a-form>
  </div>
</template>
<script setup lang="ts">
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };
const componentDisabled = ref(true);

const value1 = ref<string>("");
const value2 = ref<string>("");
const value3 = ref<string>("");
const value4 = ref<string>("");
</script>
