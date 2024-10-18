import { useContext, useEffect, useState } from "react";
import Counter from "./Counter";
import ImgContainer from "./ImageContainer";
import Replies from "./Replies";
import ComposeReply from "./PoseReply";
import ReplyBtn from "./ReplyBtn";
import moment from "moment";
import { Context } from "../Context";
import Comment from "./Comment";
import Modal from "./Modal";

export default function CommentContainer({
  text,
  src,
  name,
  time,
  counter,
  replies,
  user,
  id,
}) {
  const { setCommentsJson } = useContext(Context);
  const [reply, setReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(`${text} `);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState();
  const [date, setDate] = useState("");

  function handleEdit() {
    setCommentsJson((prev) => {
      return {
        ...prev,
        comments: prev.comments.map((comment) => {
          return comment.id === id
            ? { ...comment, content: editText }
            : comment;
        }),
      };
    });

    setEditing(false);
  }

  const action = () => setReply((prev) => !prev);

  const modalAction = (id) => {
    setModal((prev) => !prev);
    setModalId(id);
  };

  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    modal ? overlay.classList.add("show") : overlay.classList.remove("show");
  });

  useEffect(() => {
    const moment2 = moment(time);
    if (moment2.isValid()) {
      const date = moment2.fromNow();
      setDate(date);
    } else {
      setDate(time);
    }
  }, [date, time]);

  setInterval(() => {
    const moment2 = moment(time);
    if (moment2.isValid()) {
      const date = moment2.fromNow();
      setDate(date);
    } else {
      setDate(time);
    }
  }, 1000 * 60);

  return (
    <>
      {modal && <Modal id={modalId} modal={modalAction} />}

      <div className={`commentContainer comments`}>
        <Counter likes={counter} id={id} />
        <div className="details">
          <div className="image">
            <ImgContainer
              time={date}
              title={name}
              src={src}
              user={user.username}
            />
          </div>
          {editing ? (
            <Comment
              errorText={"Text Required"}
              onChange={(e) => setEditText(e.target.value)}
              action={handleEdit}
              text={editText}
              img={true}
              btnText={"update"}
            />
          ) : (
            <p className="user-content">{text}</p>
          )}
        </div>
        <ReplyBtn
          action={action}
          action3={() => modalAction(id)}
          user={user}
          action2={() => setEditing((prev) => !prev)}
        />
      </div>

      {reply && (
        <ComposeReply id={id} commentId={id} name={name} action={action} />
      )}
      {replies && (
        <div className="replies">
          {replies.map((reply) => {
            return (
              <Replies
                id={id}
                reply={reply}
                key={reply.id}
                action={action}
                modal={modalAction}
                edit={() => setEditing((prev) => !prev)}
              />
            );
          })}{" "}
        </div>
      )}
    </>
  );
}
