import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@services/posts";
import { getComments } from "@services/comments";
import { useMemo } from "react";
import { collect } from "@utils/collection";
import { getUsers } from "@services/users";
import { PostPreview } from "@components/index";

function Posts() {
  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  const postsExtended = useMemo(() => {
    if (!(posts && comments && users)) {
      return [];
    }

    const postsCommentCount = collect(comments)
      .groupBy("postId")
      .map((group) => group.length);
    const usersMap = collect(users).keyBy("id");

    return posts.map((post) => ({
      ...post,
      user: usersMap.get(post.userId),
      commentCount: postsCommentCount.get(post.id, 0) as number
    }));
  }, [posts, comments, users]);

  if (isLoadingPosts && isLoadingComments && isLoadingUsers) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      {postsExtended?.map(({ id, ...props }) => (
        <PostPreview key={id} {...props} />
      ))}
    </>
  );
}

export default Posts;
