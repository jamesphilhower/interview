import React from "react";

export const Letter = (letter: string, backgroundColor: string) => {
    return (
      <div style={{ 
        height: 40,
        width: 40,
        borderRadius: 15,
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center" ,
        margin: 5
    }}>
        <h1 style={{ alignContent: "center", alignItems: "center", margin: 0 }}>
          {letter}
        </h1>
      </div>
    );
  };

export const CorrectLetter = (letter: string) => {
    return Letter(letter, "green");
  };

export const IncorrectLetter = (letter: string) => {
    return Letter(letter, "gray");
  };

export const MisplacedLetter = (letter: string) => {
    return Letter(letter, "yellow");
  };