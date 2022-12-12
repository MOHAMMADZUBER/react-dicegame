import React from "react";
import "./Comp5.scss";

function ScoreCard(props) {
  const score = Math.abs(props.score);
  const won = props.score >= 0;

  return (
    <div className="score-card-overlay">
      <div className={`score-card ${won ? "won" : "lost"}`}>
        {`You ${won ? "won" : "lost"} ${score}$`}
      </div>
    </div>
  );
}

export default ScoreCard;

