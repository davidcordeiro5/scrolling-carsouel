import { useState } from "react";
import Vinyls from "./components/Vinyls";
import { Example } from "./Ex";

function App() {
  const squares = ["#9499ff", "#daffef", "#149eca", "#dc8c8c", "#bebebe"];
  const length = squares.length;

  const arr = ["1", "2", "3", "4", "5", "6", "7"];

  const [displayedItem, setDisplayedItem] = useState<number[]>([0, 1, 2, 3]);

  const handle = (action: "add" | "pop") => {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (action === "add") {
        setDisplayedItem((curr) =>
          curr.map((elem) =>
            elem === arr.length - 1 ? (elem = 0) : (elem += 1)
          )
        );
      } else {
        setDisplayedItem((curr) =>
          curr.map((elem) =>
            elem === 0 ? (elem = arr.length - 1) : (elem -= 1)
          )
        );
      }
    };
  };

  return (
    <div className="page">
      {/* <h1 style={{ color: "black" }}>
        {arr[displayedItem[0]]}, {arr[displayedItem[1]]},{" "}
        {arr[displayedItem[2]]}, {arr[displayedItem[3]]}
      </h1>
      <button onClick={handle("add")}>++</button>
      <button onClick={handle("pop")}>--</button> */}
      {/* <Example /> */}
      <Vinyls />
    </div>
  );
}

export default App;
