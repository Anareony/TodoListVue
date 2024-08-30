<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";

import { MainPage } from "@/pages/MainPage";
</script>

<template>
  <ConfigProvider>
    <MainPage />
  </ConfigProvider>
</template>
