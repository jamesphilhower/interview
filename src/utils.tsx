import React from "react";
import { CorrectLetter, MisplacedLetter, IncorrectLetter } from "./Letter";

export const validateInput = (answer: string, userInput: string, setGameState: any) => {
    console.log('validate answer', answer)
    userInput = userInput.toUpperCase();
    let correctLetterCount = 0;

    console.log("validate input user word", userInput);

    const row = [...userInput].map((letter, index) => {
      let returnVal = null;
      if (letter === answer[index]) {
        returnVal = CorrectLetter(letter);
        correctLetterCount++;
      } else if (answer.includes(letter)) {
        returnVal = MisplacedLetter(letter);
      } else {
        returnVal = IncorrectLetter(letter);
      }
      if (correctLetterCount === 5) {
          setGameState('won');
      }
      return returnVal;
    });

    console.log('validated row: ', row);
    return row;

  };