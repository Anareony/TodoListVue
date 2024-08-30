<script setup lang="ts">
import { Flex } from "ant-design-vue";

import { TodoList } from "@/widgets/TodoList";
import { CreateTodo } from "@/features/CreateTodo";
</script>

<template>
  <Flex class="container">
    <CreateTodo />
    <TodoList />
  </Flex>
</template>

<style lang="scss" scoped>
.container {
  width: 1000px;
  height: 100%;
  margin: 10px auto;
  gap: 50px;
}
</style>
