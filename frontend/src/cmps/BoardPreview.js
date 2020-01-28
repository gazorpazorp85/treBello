import React from "react";

export default function BoardPreview({ board }) {
  return (
    <div className="board-preview card">
      <img style={{ height: "100%", width: "100%", position: "absolute" }} src="https://www.sciencemag.org/sites/default/files/styles/inline__450w__no_aspect/public/dogs_1280p_0.jpg?itok=4t_1_fSJ" alt="none">
      </img>
      <div>
        <h2>click me!</h2>
      </div>
    </div>
  );
}
