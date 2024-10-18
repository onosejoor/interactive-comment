import { useContext } from "react";
import { Context } from "../Context";

const Modal = ({ id, modal }) => {
  const { commentsJson, setCommentsJson } = useContext(Context);
  const { comments } = commentsJson;

  function deleteComment() {
    setCommentsJson((prev) => {
      return {
        ...prev,
        comments: prev.comments.filter((comment) => {
          if (comment.id === id) {
            return false;
          } else {
            return comment;
          }
        }),
      };
    });

    for (const comment of comments) {
      const { replies } = comment;

      if (replies) {
        setCommentsJson((prev) => {
          return {
            ...prev,
            comments: prev.comments.map((comment) => {
              return {
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== id),
              };
            }),
          };
        });
      }
    }

    modal();
  }
  
  return (
    <>
      <div className="modalContainer">
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone
        </p>
        <div className="modalButtonCon">
          <button className="modal" onClick={modal}>
            no, cancel
          </button>
          <button className="modal" onClick={deleteComment}>
            yes, delete
          </button>
        </div>{" "}
      </div>
    </>
  );
};

export default Modal;
