import React from "react";

export default function BoardPreview({ board }) {
  return (
    <div className="board-preview card">
      <img style={{ height: "100%", width: "100%", position: "absolute" }} src={board.boardBgThumbnail} alt="none">
      </img>
      <div>
        <h2>click me!</h2>
      </div>
    </div>
  );
}
