import React from "react";

import "./Comp3.scss";

function DiceBet(props) {
  const { bet, setBet, isDisabled } = props;
  return (
    <div
      className={`dice-bet ${isDisabled ? "disabled" : ""}`}
      onClick={setBet}
    >
      <div className="dice-bet-icon material-icons md-18">$</div>
      <div className="bet-value">{bet}</div>
    </div>
  );
}

export default DiceBet;
