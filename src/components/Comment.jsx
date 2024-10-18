import { useContext, useState } from "react";
import { Context } from "../Context";
import Img from "./Img";

const Comment = ({ action, errorText, text, onChange, btnText, img }) => {
  const { commentsJson } = useContext(Context);
  const [error, setError] = useState("");
  const { currentUser } = commentsJson;
  const { image, username } = currentUser;

  function handleAction() {
    if (!text.trim()) {
      return setError(errorText);
    }

    action();
  }

  return (
    <div
      className={`UserCommentCon commentContainer ${img && "editContainer"}`}
    >
      {!img && <Img title={username} src={image.png} />}
      <div className="textAreaCon">
        <textarea
          onChange={(e) => {
            onChange(e);
            setError("");
          }}
          rows={6}
          value={text}
          className={`userTextArea ${error ? "error" : null}`}
          placeholder="Add a comment..."
        ></textarea>
        {error && <h6 className="errorText"> {error}</h6>}
      </div>{" "}
      <button className="userSubmit" onClick={handleAction}>
        {btnText}
      </button>
    </div>

    //   <div style={{display: "flex", width: "100%", gap: "20px"}}>

    // </div>
  );
};

export default Comment;
