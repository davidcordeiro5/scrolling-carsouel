import { DOMAttributes, MouseEventHandler, useState } from "react";

function App() {
  const squares = ["#9499ff", "#daffef", "#149eca", "#dc8c8c", "#bebebe"];
  const length = squares.length;

  const arr = ["1", "2", "3", "4", "5", "6", "7"];

  console.log("arr", arr.length);

  const [displayedItem, setDisplayedItem] = useState<number[]>([0, 1, 2, 3]);

  console.log("arr :>> ", arr);

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
      {squares.map((s, i) => (
        <div
          style={{
            backgroundColor: s,
            // transform: `scale(${0.5 + i / 10})`,

            //NOTE: Change translate3d Y according to the device
            transform: `translate3d(0px, ${0 - i * 50}px, ${0 - i * 75}px)`,

            zIndex: `${length - i}`,
          }}
          className="square"
          key={i}
        />
      ))}
    </div>
  );
}

export default App;
