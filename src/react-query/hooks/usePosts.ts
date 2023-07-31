import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery { 
    page: number,
    pageSize: number
}
  
const usePosts = ({page, pageSize}: PostQuery) => {

return useQuery<Post[], Error>({
    queryKey:  ['posts'],
    queryFn: () =>
            axios
            .get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _start: (page-1)* pageSize,
                    _limit: pageSize
                }
            })
            .then((res) => res.data),
    staleTime: 10_000,
    keepPreviousData: true
});
};

export default usePosts;