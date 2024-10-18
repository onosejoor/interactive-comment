import { useContext, useState } from "react";
import { Context } from "../Context";
import Comment from "./Comment";
import moment from "moment";

const UserComment = () => {
  const { commentsJson, setCommentsJson } = useContext(Context);
  const { currentUser } = commentsJson;
  const [text, setText] = useState("");

  const date = new Date().toUTCString();

  function handleText(e) {
    setText(e.target.value);
  }
  function setComment() {
    const { comments } = commentsJson;

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
        comments: [
          ...prev.comments,
          {
            id: comments.length + mapper + 1,
            content: text,
            score: 0,
            createdAt: date,
            user: { ...currentUser },
            replies: [],
          },
        ],
      };
    });
    setText("");
  }
  return (
    <Comment
      btnText={"Send"}
      text={text}
      onChange={handleText}
      action={setComment}
      errorText={"Comment Required"}
    />
  );
};

export default UserComment;
