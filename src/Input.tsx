export const Input = (userInput: string, setUserInput: any) => (
    <input
      autoFocus={true}
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      type={"text"}
    ></input>
  );