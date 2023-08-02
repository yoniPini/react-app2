import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = ({ pageSize }: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * pageSize,
            _limit: pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 10_000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
