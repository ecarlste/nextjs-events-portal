import Comment from '@/models/comment';
import classes from './comment-list.module.css';

function CommentList(props: { comments: Comment[] }) {
  const { comments } = props;

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
