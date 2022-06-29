import React from "react";

const Main = () => {
  const [userInput, setUserInput] = React.useState("");

  const [attempts, setAttempts] = React.useState<any[]>([]);

  const Header = <h1>Wordle but with names</h1>;

  const Letter = (letter: string, backgroundColor: string) => {
    return (
      <div style={{ height: 40, width: 40, borderRadius: 15, backgroundColor }}>
        <h1 style={{ alignContent: "center", alignItems: "center" }}>
          {letter}
        </h1>
      </div>
    );
  };

  const CorrectLetter = (letter: string) => {
    return Letter(letter, "green");
  };

  const IncorrectLetter = (letter: string) => {
    return Letter(letter, "gray");
  };

  const MisplacedLetter = (letter: string) => {
    return Letter(letter, "yellow");
  };

  const Input = () => (
    <input
      autoFocus={true}
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      type={"text"}
    ></input>
  );

  const grid = () => {
    let output: [string[]] = [[]];
    // length of words are 5
    for (let i = 0; i < 5; i++) {
      output.push([]);

      // number of tries are 6
      for (let j = 0; j < 6; j++) {
        output[i].push(" ");
      }
    }
    return output;
  };

  let word = "";
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        // console.log("Success", json);
        word = json[0].name.slice(0, 5);
        console.log("the word is ", word);
      });
    } else {
      console.log("Error", response);
    }
  });

  const validateInput = (userWord: string) => {
    let cur: number = 0;
    console.log("validate input user word", userWord);
    return [...word].map((val) => {
      let returnVal = null;
      if (val === userWord[cur]) {
        returnVal = CorrectLetter(val);
      }
      if (userWord.includes(val)) {
        returnVal = MisplacedLetter(val);
      } else {
        returnVal = IncorrectLetter(val);
      }
      cur += 1;
      return returnVal;
    });
  };

  const submitButton = () => (
    <button
      onClick={() => {
        console.log("User entered", userInput);
        setAttempts([...attempts, validateInput(userInput)]);
      }}
    >
      <text>Submit</text>
    </button>
  );

  const GameGrid = () => {
    let currentTry = 0;
    return grid().map((row) => {
      currentTry += 1;

      if (attempts[currentTry - 1]) {
        console.log("attempts exists");
        return (
          <>
            {attempts}
            <div
              style={{ height: 10, width: 400, backgroundColor: "red" }}
            ></div>
          </>
        );
      }
      return (
        <>
          {row.map((col) => Letter(" ", "gray"))}
          <div style={{ height: 10, width: 400, backgroundColor: "red" }}></div>
        </>
      );
    });
  };

  return (
    <>
      <Input></Input>
      {submitButton()}
      {Header}
      {GameGrid()}
    </>
  );
};

const App = () => {
  return <Main />;
};

export default App;
