import type { Nullable, User } from "@utils/types";
import { Link } from "react-router-dom";
import styles from "./PostPreview.module.scss";

interface PostProps {
  id: number;
  slug: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  user: Nullable<User>;
  commentCount?: number;
}
function Post({
  id,
  slug,
  title,
  content,
  thumbnail,
  status,
  category,
  publishedAt,
  updatedAt,
  user,
  commentCount = 0
}: PostProps) {
  return (
    <div className={styles.postPreview}>
      <h2>{id}</h2>
      <img src={thumbnail} alt={slug} />
      <div>
        <h4>{title}</h4>
        <p>{content}</p>
        <span>{commentCount}</span>
        <span>
          {user?.firstname} {user?.lastname}
        </span>
        <p>{category}</p>
        <p>{publishedAt}</p>
        <p>{updatedAt}</p>
        <Link to={`/posts/${slug}`}>View</Link>
      </div>
    </div>
  );
}

export default Post;
