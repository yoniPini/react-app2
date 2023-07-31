import useData from "./useData";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

  
const usePosts = () => useData<Post>("/posts");

export default usePosts;