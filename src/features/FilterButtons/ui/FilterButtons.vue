<script setup lang="ts">
import { ref } from "vue";
import { Tabs, TabPane } from "ant-design-vue";

import { useTodoStore } from "@/entities/Todo";

const store = useTodoStore();
const { getFilteredTodos, getTodos } = store;

const activeKey = ref("1");

const onChange = (activeKey: number | string) => {
  switch (activeKey) {
    case "1":
      getTodos();
      break;
    case "2":
      getFilteredTodos("?completed=true");
      break;
    case "3":
      getFilteredTodos("?completed=false");
      break;
  }
};
</script>

<template>
  <Tabs v-model:activeKey="activeKey" v-on:change="onChange">
    <TabPane key="1" tab="All" />
    <TabPane key="2" tab="Completed" />
    <TabPane key="3" tab="Uncompleted" />
  </Tabs>
</template>
