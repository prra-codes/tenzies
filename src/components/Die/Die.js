import React from "react";
import "./Die.css";

const Die = ({ value, isHeld, holdDice }) => {
  let styles = {
    backgroundColor: isHeld ? "#59E391" : "#FFFFFF",
  };
  // when isHeld is true, background become a light green, if false, background is white
  return (
    <div className="dice" style={styles} onClick={holdDice}>
      <h2 className="dice-num">{value}</h2>
    </div>
  );
};

export default Die;
