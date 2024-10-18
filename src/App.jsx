import { useState } from "react";
import Home from "./components/Page";
import { Context } from "./Context";
import data from "./data.json";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

function App() {
  const [commentsJson, setCommentsJson] = useState(
    JSON.parse(localStorage.getItem("comment")) || data
  );
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  //   const [commentsJson, setCommentsJson] = useState(
  //  data
  //   );

  localStorage.setItem("comment", JSON.stringify(commentsJson));

  return (
    <Context.Provider value={{ commentsJson, setCommentsJson }}>
      <Home />
    </Context.Provider>
  );
}

export default App;
