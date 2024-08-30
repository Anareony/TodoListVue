<script setup lang="ts">
import { defineProps, ref } from "vue";
import { Button, Checkbox, Flex, Typography, Divider } from "ant-design-vue";
import { DeleteFilled } from "@ant-design/icons-vue";

import { ITodo, useTodoStore } from "@/entities/Todo";

const { Title } = Typography;

interface Props {
  todo: ITodo;
}

const props = defineProps<Props>();

const store = useTodoStore();
const { deleteTodo, toggleStatus, changeTitle } = store;

const editableStr = ref(props.todo.title);

const removeTask = (id: number) => {
  deleteTodo(id);
};

const changeTaskTitle = (id: number) => {
  changeTitle(id, editableStr.value);
};

const toggleTaskStatus = (id: number) => {
  toggleStatus(id);
};
</script>

<template>
  <Flex justify="space-between" vertical class="item">
    <Flex justify="space-between" align="center" gap="10">
      <Checkbox
        :checked="todo.completed"
        @click="toggleTaskStatus(todo.id)"
        class="checkbox"
      >
        <Title
          v-model:content="editableStr"
          :editable="{
            onEnd() {
              changeTaskTitle(todo.id);
            },
          }"
          :level="5"
          class="title"
        />
      </Checkbox>
      <Button @click="removeTask(todo.id)" danger value="small">
        <template #icon><DeleteFilled class="delete-icon" /></template>
      </Button>
    </Flex>
    <Divider class="divider" />
  </Flex>
</template>

<style lang="scss">
.checkbox {
  width: 100%;
  & > span:last-child {
    width: 100%;
  }
}
.title {
  width: 100%;
  margin-left: 5px;
  margin-bottom: 0;
}
.editIcon {
  margin-left: 20px;
}
.divider {
  margin: 5px 0;
}
.delete-icon {
  min-width: 32px;
}
.item {
  width: 100%;
  margin: 5px 0;
}
</style>
