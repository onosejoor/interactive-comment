import CommentContainer from "./CommentContainer";
import UserComment from "./UserComment";
import { Context } from "../Context";
import { useContext } from "react";

export default function Home() {
  const { commentsJson: userComments } = useContext(Context);
  const { comments } = userComments;

  function mapper(el) {
    const { replies } = el;

    const { image, username } = el.user;
    const { user } = el;
    const { png } = image;
    return (
      <CommentContainer
        key={el.id}
        text={el.content}
        time={el.createdAt}
        counter={el.score}
        src={png}
        id={el.id}
        name={username}
        user={user}
        replies={replies}
      />
    );
  }
  return (
    <>
      <div className="overlay"></div>
      <section id="comments">
        {comments.map(mapper)}

        <UserComment />
      </section>
    </>
  );
}
