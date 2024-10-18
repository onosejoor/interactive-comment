"use client";

import { useContext, useState } from "react";
import { Context } from "../Context";

const Counter = ({ likes, id }) => {
  const { commentsJson, setCommentsJson } = useContext(Context);
  const { comments } = commentsJson;
  const [score, setScore] = useState("false")

  function findCommentOrReply() {
    const findComment = comments.find((el) => {
      return el.id === id;
    });
    if (findComment) {
      return findComment;
    }

    for (const comment of comments) {
      const { replies } = comment;
      const find = replies.find((el) => {
        return el.id === id;
      });

      if (find) {
        return find;
      }
    }
    return null;
  }

  function voteChecker() {
    if (score === "true") {
      return downScore()
    }
    else {
      return upScore()
    }
  }

  function upScore() {
    const comment = findCommentOrReply();    
    const { score: userScore } = comment;

    setCommentsJson((prev) => {
      return {
        ...prev,
        comments: prev.comments.map((com) => {
          if (com.id === comment.id) {
            return { ...com, score: userScore + 1 };
          } else if (com.replies) {
            return {
              ...com,
              replies: com.replies.map((c) => {
                return c.id === comment.id ? { ...c, score: userScore + 1 } : c;
              }),
            };
          } else {
            return com;
          }
        }),
      };
    });
    setScore("true")
  }
  function downScore() {
    const comment = findCommentOrReply();
    const { score: userScore } = comment;

    setCommentsJson((prev) => {
      return {
        ...prev,
        comments: prev.comments.map((com) => {
          if (com.id === comment.id) {
            return { ...com, score: userScore - 1 };
          } else if (com.replies) {
            return {
              ...com,
              replies: com.replies.map((c) => {
                return c.id === comment.id ? { ...c, score: userScore - 1 } : c;
              }),
            };
          } else {
            return com;
          }
        }),
      };
    });
    setScore("false")
  }

  return (
    <div className="likes">
      <button className="likesBtn" onClick={voteChecker}>
        <svg
          className="likeIncrement"
          fill="#C5C6EF"
          width="11"
          height="11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
        </svg>
      </button>

      {likes}

      <button className="likesBtn" onClick={voteChecker}>
        <svg
          className="likeIncrement"
          fill="#C5C6EF"
          width="11"
          height="5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
