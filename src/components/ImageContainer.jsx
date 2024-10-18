import { useContext } from "react";
import Img from "./Img";
import { Context } from "../Context";

export default function ImgContainer({ src, title, time, user }) {
  const { commentsJson } = useContext(Context);
  const { currentUser } = commentsJson;

  return (
    <>
      <div className="userImageContainer">
        <Img title={title} src={src} />
        <h3 className="username">{title}</h3>
        {user === currentUser.username && (
          <>
            <h4 className="you">{"You"}</h4>
          </>
        )}

        {/* <p className="time">{time}</p> */}
        <time className="time" dateTime={time}>{time}</time>
      </div>
    </>
  );
}
