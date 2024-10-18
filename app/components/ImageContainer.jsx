import Image from "next/image";
import Img from "./Img";

export default function ImgContainer({ src, title, time, user }) {
  return (
    <div className="userImageContainer">
      <Img title={title} src={src} />
      <h3 className="username">{title}</h3>
      {user && <><h4>{user}</h4></>}
      <p className="time">{time}</p>
    </div>
  );
}
