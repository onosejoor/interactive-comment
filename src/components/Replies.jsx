import { useContext, useEffect, useState } from "react";
import Counter from "./Counter";
import ImgContainer from "./ImageContainer";
import ComposeReply from "./PoseReply";
import ReplyBtn from "./ReplyBtn";
import Comment from "./Comment";
import { Context } from "../Context";

export default function Replies({ reply, id, modal }) {
  const { user } = reply;
  const [isReplying, setReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(`@${reply.replyingTo} ${reply.content} `);
  const { setCommentsJson } = useContext(Context);

  useEffect(() => {
    setText(`@${reply.replyingTo}${reply.content} `);
  }, [reply]);

  const replyAction = () => setReply((prev) => !prev);
  const editAction = () => setEditing((prev) => !prev);

  function handleEdit() {
    const userText = text.replace(`@${reply.replyingTo}`, "");

    setCommentsJson((prev) => {
      return {
        ...prev,
        comments: prev.comments.map((comment) => {
          if (comment.id === reply.id) {
            return { ...comment, content: userText };
          } else if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((el) =>
                el.id === reply.id ? { ...el, content: userText } : el
              ),
            };
          } else {
            return comment;
          }
        }),
      };
    });

    setEditing(false);
  }

  return (
    <>
      <div className={`commentContainer repliesContainer comments`} key={reply.id}>
        <Counter likes={reply.score} id={reply.id} />
        <div className="details">
          <div className="image">
            <ImgContainer
              time={reply.createdAt}
              title={user.username}
              src={user.image.png}
              user={user.username}
            />
          </div>
          {editing ? (
            <>
              <Comment
                action={handleEdit}
                errorText={"Text required"}
                img={true}
                text={text}
                btnText={"update"}
                onChange={(e) => setText(e.target.value)}
              />
            </>
          ) : (
            <p className="user-content">
              {" "}
              <>
                <span className="repl">@{reply.replyingTo} </span>
              </>
              {reply.content}
            </p>
          )}
        </div>{" "}
        <ReplyBtn
          action={replyAction}
          action2={editAction}
          user={user}
          action3={() => modal(reply.id)}
        />
      </div>
      {isReplying && (
        <ComposeReply
          commentId={id}
          action={() => setReply((prev) => !prev)}
          name={user.username}
          id={reply.id}
        />
      )}
    </>
  );
}
