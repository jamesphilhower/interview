import React from "react";
import { Input } from "./Input";
import { Letter } from "./Letter";
import { validateInput } from "./utils";

const Main = () => {
  const [userInput, setUserInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [attempts, setAttempts] = React.useState<any[]>([]);
  const [gameState, setGameState] = React.useState("playing");

  const Header = <h1>Wordle but with names</h1>;

 const answer = 'GAMES';
  

  const submitButton = () => (
    <button
      disabled={attempts.length >= 6 || gameState === 'won'}
      onClick={() => {
        console.log("User entered", userInput);
        if (userInput.length !== 5) {
          console.log('Invalid input');
          setError('Invalid input');
        } else {
          setAttempts([...attempts, validateInput(answer, userInput, setGameState)]);
          if (attempts.length >= 5 && gameState !== 'won') {
            setGameState('lost');
          }
        }
      }}
    >
      <text>Submit</text>
    </button>
  );

  const GameGrid = () => { 
    let grid = []
    grid = attempts.map((row) => {
      console.log("attempts exists");
      return (
        
          <div style={{ display: 'flex', margin: 5 }}>
            {row}
          </div>
          

      );
    });

    console.log("grid",grid);
    while(grid.length < 6){
      grid.push(
        
          <div style={{ display: 'flex', margin: 5 }}>
            {Array(5).fill(0).map((col) => Letter(" ", "gray"))}
          </div>
        
      )
    }

    return grid;
  };

  return (
    <>
      {Input(userInput, setUserInput)}
      {submitButton()}
      {error && <p>{error}</p>}
      {Header}
      {GameGrid()}
      {gameState === 'won' && <p>You won!</p>}
      {gameState === 'lost' && <p>You lost! The word is {answer}</p>}
    </>
  );
};

const App = () => {
  return <Main />;
};

export default App;
