<script setup lang="ts">
import { reactive } from "vue";
import {
  Button,
  Input,
  Typography,
  Form,
  FormItem,
  Checkbox,
} from "ant-design-vue";

import { useTodoStore } from "@/entities/Todo";

const { Title } = Typography;

interface ICreateTodo {
  title: string;
  completed: boolean;
}

const store = useTodoStore();
const { createTodo } = store;

const formState = reactive<ICreateTodo>({
  title: "",
  completed: false,
});

const onFinish = () => {
  createTodo(formState.title, formState.completed);
};
</script>

<template>
  <div class="container_create-todo">
    <Title :level="3">Create task</Title>
    <Form :model="formState" autocomplete="off" @finish="onFinish">
      <FormItem
        name="title"
        :rules="[{ required: true, message: 'Add task title!' }]"
        class="form-item"
      >
        <Input v-model:value="formState.title" placeholder="Task title" />
      </FormItem>
      <FormItem name="completed" class="form-item">
        <Checkbox v-model:checked="formState.completed">Completed</Checkbox>
      </FormItem>
      <FormItem class="form-item">
        <Button type="primary" html-type="submit">Create</Button>
      </FormItem>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.container_create-todo {
  width: 40%;
  position: sticky;
  height: 150px;
  top: 0;
}
.input-group {
  display: flex;
}
.form-item {
  margin-bottom: 0px;
}
</style>
