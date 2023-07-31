import { BaseSyntheticEvent, SyntheticEvent, useId, useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const { data: posts, error, isLoading } = usePosts({ page, pageSize });
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1 ? true : false}
        className="btn btn-primary my-3 mx-1"
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <button
        className="btn btn-primary my-3"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostList;
