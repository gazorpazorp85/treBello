import React from "react";

function BoardPreview({ board }) {
  return (
    <div className="board-preview card">
      <img src={board.boardBgThumbnail} alt="none" />
      <div className={`flex justify-center align-center title-container ${board.boardBgThumbnailTitleStyle}`}>
        <h2 className={`capitalize ${board.boardBgThumbnailTitleStyle}`}>{board.title}</h2>
      </div>
    </div>
  );
}

export default (BoardPreview)