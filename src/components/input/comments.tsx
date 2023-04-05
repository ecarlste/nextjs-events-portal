import { FormEvent, useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';

function Comments(props: { eventId: string }) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (showComments) {
        setIsFetchingComments(true);

        const response = await fetch(`/api/comments/${eventId}`);
        const data = await response.json();

        setComments(data);
        setIsFetchingComments(false);
      }
    }
    fetchData();
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: FormEvent) {
    notificationCtx?.showNotification({
      title: 'Sending comment!',
      message: 'Your comment is being saved!',
      status: 'pending',
    });

    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong!');
      }

      notificationCtx?.showNotification({
        title: 'Success!',
        message: 'Your comment was saved!',
        status: 'success',
      });
    } catch (error: any) {
      notificationCtx?.showNotification({
        title: 'Error!',
        message: error.message,
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
