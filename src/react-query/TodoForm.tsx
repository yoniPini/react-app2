import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useMutation<Todo, Error, Todo>({
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

      if (ref.current) ref.current.value = "";
    },
    onError: (err: any) => console.log(err),
  });

  return (
    <>
      {addTodo.error?.message && (
        <div className="alert alert-danger">Error occured</div>
      )}
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
          <button
            disabled={addTodo.isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
