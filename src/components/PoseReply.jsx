import { useContext, useState } from "react";
import Comment from "./Comment";
import { Context } from "../Context";

const ComposeReply = ({ id, name, commentId, action }) => {
  const { commentsJson, setCommentsJson } = useContext(Context);
  const { comments, currentUser } = commentsJson;
  const [replyText, setReplytext] = useState(`@${name} `);

  function handleOnchange(e) {
    setReplytext(`${e.target.value}`);
  }

  function handleReply() {
    const text = replyText.replace(`@${name}`, "");
    const mapper = comments
      .map((el) => {
        return el.replies.length;
      })
      .reduce((acc, item) => {
        return acc + item;
      });

    setCommentsJson((prev) => {
      return {
        ...prev,
        comments: comments.map((com) => {
          if (com.id === id) {
            return {
              ...com,
              replies: [
                {
                  id: comments.length + mapper + 1,
                  content: text,
                  score: 0,
                  replyingTo: name,
                  user: { ...currentUser },
                },
                ...com.replies,
              ],
            };
          } else if (com.id === commentId) {
            return {
              ...com,
              replies: [
                ...com.replies,
                {
                  id: comments.length + mapper + 1,
                  content: text,
                  score: 0,
                  replyingTo: name,
                  user: { ...currentUser },
                },
              ],
            };
          } else {
            return com;
          }
        }),
      };
    });

    action();
  }
  return (
    <>
      <Comment
        text={replyText}
        btnText={"reply"}
        onChange={handleOnchange}
        errorText={"Reply Required"}
        action={handleReply}
      />
    </>
  );
};

export default ComposeReply;
