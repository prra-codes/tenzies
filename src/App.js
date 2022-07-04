import logo from "./logo.svg";
import "./App.css";
import Die from "./components/Die/Die";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid"; // imported to generate random ids
import Confetti from "react-confetti"; // imported to create Confetti effect when game is won

function App() {
  const [dice, setDice] = useState(allNewDice()); //call allNewDice function to initalise dice to generate random number for dice in state
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true); //can use every method to check if the conditions are met for an array. e.g. if all die isHeld is true, it wil return true. otherwise return false
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue); //testing if all the die hold the same value

    if (allHeld && allSameValue) {
      setTenzies(true);
    }

    //if all the values are held and they are all the same value, set the state Tenzies to true and the player wins the game
  }, [dice]); // we want the useEffect to run every time the dice state changes to check if the conditions match

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6), //generates a random number between 1 and 6
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = []; // empty array to put random numbers for dice between 1 - 6,

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie()); // pushes objects that contain the value random number and the isHeld property to the newDice array. Combined with for loop allows for 10 random numbers to be pushed into the newDice array
    }

    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  // rolls new dice. If the isHeld property is true, it will roll new dice but keep the dice with the isHeld property set to true. if isHeld is false, generates a new die with a new random Number

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  //need access to oldNice, so uses an arrow function. use map method to return a new array from the function. it goes through every die object. Each die has a unique id. If the die that is clicked on has the same id as the die object, the isHeld property is flipped from true to false (and vice-versa) and the background-color changes because of the ternary operator in the die component. Otherwise the color remains the same

  const diceELements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
        // passing in id into holdDice function, so when each die is clicked, it recieves a unique id
      />
    );
  }); // mapped over state and passing each random value (between 1-6) into the dice component

  const confettiStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <main>
      {" "}
      {tenzies && <Confetti style={confettiStyles} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceELements}</div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
