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
      //onKeyDown={(e) => console.log("keydown", e.key)}
      type={"text"}
    ></input>
  );

  const grid = () => {
    // length of words are 5
    const output = Array(6).fill(Array(5).fill("")) as [[string]];
    console.log(output);
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
    //had to readjust logic here bc dont think greedy approach works for multiple letters 'nnbbn' for 'Leann'
    userWord = userWord.toLowerCase();
    word = word.toLowerCase();
    let cur: number = 0;
    let wordDict = new Map();
    let correct = [5];
    for (let i = 0; i < word.length; i++) {
      if (userWord[i] === word[i]) {
        correct[i] = 1;
      } else {
        if (wordDict.has(word[i])) {
          wordDict.set(word[i], wordDict.get(word[i]) + 1);
        } else {
          wordDict.set(word[i], 1);
        }
      }
    }
    console.log("validate input user word", userWord);
    return [...userWord].map((val) => {
      console.log(val + " " + word[cur]);
      console.log(val.toLowerCase() === word[cur].toLowerCase());
      let returnVal = null;
      if (correct[cur] === 1) {
        returnVal = CorrectLetter(val);
      } else if (word.includes(val) && wordDict.get(val) > 0) {
        returnVal = MisplacedLetter(userWord[cur]);
        wordDict.set(val, wordDict.get(val) - 1);
      } else {
        returnVal = IncorrectLetter(userWord[cur]);
      }
      cur += 1;
      return returnVal;
    });
  };

  const submitButton = () => (
    <button
      onClick={() => {
        console.log("User entered", userInput);
        console.log(!/[^a-zA-Z]/.test(userInput));
        if (userInput.length === 5 && !/[^a-zA-Z]/.test(userInput)) {
          setAttempts([...attempts, validateInput(userInput)]);
        }
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
            {attempts[currentTry - 1]}
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
