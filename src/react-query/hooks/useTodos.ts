import useData from "./useData";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => useData<Todo>("/todos");

export default useTodos;
