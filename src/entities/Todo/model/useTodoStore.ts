import { Ref, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export interface ITodo {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const useTodoStore = defineStore("todo", () => {
  const todos: Ref<ITodo[]> = ref([]);
  const filters = ref("");
  const isLoading = ref(false);
  const currentPage = ref(1);

  async function getTodos() {
    try {
      todos.value = [];
      isLoading.value = true;
      filters.value = "";
      currentPage.value = 1;

      const response = await axios.get<ITodo[]>(BASE_URL, {
        params: {
          _page: 1,
          _limit: 20,
        },
      });

      todos.value = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function createTodo(title: string, completed: boolean) {
    try {
      const response = await axios.post(BASE_URL, {
        userId: 1,
        completed,
        title,
      });

      todos.value.unshift({
        ...response.data,
        id: Math.floor(Math.random() * 10000),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function changeTitle(todoId: number, title: string) {
    try {
      const todo = todos.value.find((todo) => todo.id === todoId);

      if (todo) {
        const response = await axios.patch<ITodo>(`${BASE_URL}/${todoId}`, {
          title,
        });

        todo.title = response.data.title;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleStatus(todoId: number) {
    try {
      const todo = todos.value.find((todo) => todo.id === todoId);

      if (todo) {
        const response = await axios.patch<ITodo>(`${BASE_URL}/${todoId}`, {
          completed: !todo.completed,
        });

        todo.completed = response.data.completed;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(todoId: number) {
    try {
      const response = await axios.delete(`${BASE_URL}/${todoId}`);

      todos.value = todos.value.filter((todo) => {
        return todo.id !== todoId;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getFilteredTodos(filtersValue: string) {
    try {
      todos.value = [];
      isLoading.value = true;
      filters.value = filtersValue;
      currentPage.value = 1;

      const response = await axios.get<ITodo[]>(`${BASE_URL}${filtersValue}`, {
        params: {
          _page: 1,
          _limit: 20,
        },
      });

      todos.value = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadMoreTodos() {
    try {
      currentPage.value++;

      const response = await axios.get<ITodo[]>(`${BASE_URL}${filters.value}`, {
        params: {
          _page: currentPage.value,
          _limit: 20,
        },
      });

      todos.value.push(...response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    todos,
    isLoading,
    getTodos,
    createTodo,
    changeTitle,
    toggleStatus,
    deleteTodo,
    getFilteredTodos,
    loadMoreTodos,
  };
});
