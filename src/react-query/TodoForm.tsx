import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation({
    mutationFn: (value: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", value)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      //  First approach - invalidating the cached data.
      // queryClient.invalidateQueries({
      //     queryKey: ['todos']
      // })
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current?.value)
          addTodo.mutate({
            id: 0,
            title: ref.current.value,
            userId: 1,
            completed: false,
          });
      }}
      className="row mb-3"
    >
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
