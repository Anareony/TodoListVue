<script setup lang="ts">
import { onMounted } from "vue";
import { Flex, Typography, Spin } from "ant-design-vue";

import { FilterButtons } from "@/features/FilterButtons";
import { useTodoStore, TodoListItem } from "@/entities/Todo";
import InfiniteScroll from "@/shared/ui/InfiniteScroll.vue";

const { Title } = Typography;

const store = useTodoStore();

const { getTodos, loadMoreTodos, isLoading } = store;

const getMoreTodos = () => {
  if (!isLoading) {
    loadMoreTodos();
  }
};

onMounted(async () => {
  await getTodos();
});
</script>

<template>
  <Flex vertical class="todo-list">
    <Title :level="3">Tasks</Title>
    <FilterButtons />
    <div v-if="!store.isLoading">
      <TodoListItem v-for="todo in store.todos" :key="todo.id" :todo="todo" />
    </div>
    <Flex v-else justify="center" align="center" class="spinner">
      <Spin />
    </Flex>
    <InfiniteScroll
      v-if="store.todos.length"
      v-on:triggerIntersection="getMoreTodos"
    />
  </Flex>
</template>

<style lang="scss" scoped>
.todo-list {
  width: 100%;
}
.spinner {
  width: 100%;
  height: 100%;
}
</style>
