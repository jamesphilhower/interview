import React from "react";

const Main = () => {
  const [userInput, setUserInput] = React.useState("");
  const [attempts, setAttempts] = React.useState<any[]>([]);
  const [answer, setAnswer] = React.useState<string>("waiting");
  const [answers, setAnswers] = React.useState<{ name: string }[]>([]);
  const [gameState, setGameState] = React.useState<any>(null);

  React.useMemo(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok) {
      response.json().then((json) => {
        setAnswers(json);
      });
    }
  }, []);

  React.useEffect(() => {
    if (answers.length > 0) {
      console.log("answers", answers);
      setAnswer(answers[0].name!.slice(0, 5));
    }
  }, [answers]);

  console.log("answer", answer);

  const Header = () => <h1>Wordle but with names</h1>;
  const Letter = (letter: string, backgroundColor: string) => {
    return (
      <div
        style={{
          height: 40,
          width: 40,
          borderRadius: 15,
          backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{letter}</h1>
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

  React.useEffect(() => {
    if (answers.length > 0) {
      setAttempts([]);
    }
  }, [answer]);

  React.useEffect(() => {
    if (gameState === "won") {
      if (answers.length > 0) {
        const index = Math.floor(Math.random() * answers.length);
        const newAnswer = answers[index].name.slice(0, 5);
        setAnswer(newAnswer);
      }
    }
  }, [gameState]);

  const validateInput = (userWord: string) => {
    let cur: number = 0;
    console.log("validate input user word", userWord);
    if (userWord === answer) {
      setGameState("won");
    }
    return [...answer].map((val) => {
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
            <div style={{ display: "flex" }}>{attempts}</div>
            <div
              style={{ height: 10, width: 400, backgroundColor: "red" }}
            ></div>
          </>
        );
      }
      return (
        <>
          <div
            style={{
              display: "flex",
              width: 500,
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            {row.map((col) => Letter(" ", "gray"))}{" "}
          </div>
          <div style={{ height: 10, backgroundColor: "red" }}></div>
        </>
      );
    });
  };

  return [Input(), submitButton(), Header(), GameGrid()];
};

const App = () => <>{Main()}</>;

export default App;
