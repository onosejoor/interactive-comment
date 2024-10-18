import CommentContainer from "./components/CommentContainer";
import UserComment from "./components/UserComment";
import data from "./data.json";

export default function Home() {
  const { comments, currentUser } = data;

  function mapper(el, index) {
    const { replies } = el;

    const { image, username } = el.user;
    const { png } = image;
    return (
      <CommentContainer
        key={index}
        text={el.content}
        time={el.createdAt}
        counter={el.score}
        src={png}
        name={username}
        replies={replies}
        currentUser={currentUser}
      />
    );
  }
  return (
    <section id="comments">
      {comments.map(mapper)}

      <UserComment />
    </section>
  );
}
