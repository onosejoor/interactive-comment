const { default: Img } = require("./Img");
import data from "../data.json";

const UserComment = () => {
  const { currentUser } = data;
  const { image, username } = currentUser;
  return (
    <>
      <div className="UserCommentCon commentContainer">
        <Img title={username} src={image.png} />

        <textarea
          rows={6}
          className="userTextArea"
          placeholder="Add a comment..."
        ></textarea>

        <button className="userSubmit">Send</button>
      </div>
    </>
  );
};

export default UserComment;
