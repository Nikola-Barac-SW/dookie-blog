import type { Nullable, User } from "@utils/types";

interface PostCommentProps {
  comment: string;
  user: Nullable<User>;
}
function PostComment({ comment, user }: PostCommentProps) {
  return (
    <div>
      <p>
        {!user ? (
          <>UNKNOWN USER</>
        ) : (
          <>
            {" "}
            {user?.firstname} {user?.lastname}
          </>
        )}
      </p>

      <p>{comment}</p>
    </div>
  );
}

export default PostComment;
