export default function Img({ src, title }) {
  return (
    <img
      className="userImage"
      height={35}
      width={35}
      alt={title}
      src={src.substring(1)}
    />
  );
}
