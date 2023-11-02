import { useReducer } from "react";
import styles from "./Calc.module.css";
import { Digitbutton } from "./Digitbutton";
import { Operatioanbutton } from "./Operationbutton";

function reducer(state, action) {
  switch (action.type) {
    case "digit":
      if (state.overwrite) {
        return {
          ...state,
          currentoperand: action.payload,
          overwrite: false,
        };
      }
      if (action.payload === "0" && state.currentoperand === "0") return state;
      if (action.payload === "." && state.currentoperand.includes("."))
        return state;
      return {
        ...state,
        currentoperand: `${state.currentoperand}${action.payload}`,
      };

    case "choose_operation":
      if (state.previousoperand === "" && state.currentoperand === "")
        return state;
      if (state.currentoperand === "") {
        return {
          ...state,
          operation: action.payload,
        };
      }
      if (state.previousoperand === "") {
        return {
          ...state,
          previousoperand: state.currentoperand,
          currentoperand: "",
          operation: action.payload,
        };
      }
      return {
        ...state,
        previousoperand: evaluate(state),
        currentoperand: "",
        operation: action.payload,
      };
    case "clear":
      return { currentoperand: "", previousoperand: "" };

    case "delete":
      if (state.overwrite) {
        return {
          ...state,
          currentoperand: "",
          overwrite: false,
        };
      }
      if (state.currentoperand.length === 1) {
        return {
          ...state,
          currentoperand: "",
        };
      }
      return { ...state, currentoperand: state.currentoperand.slice(0, -1) };

    case "evaluate":
      if (state.currentoperand === "") return state;
      return {
        ...state,
        overwrite: true,
        currentoperand: evaluate(state),
        previousoperand: "",
        operation: "",
      };
  }
}

function evaluate({ currentoperand, previousoperand, operation }) {
  const prev = parseFloat(previousoperand);
  const curr = parseFloat(currentoperand);

  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "÷":
      computation = prev / curr;
      break;
  }
  return computation;
}

export default function Calc() {
  const initialstate = {
    currentoperand: "",
    previousoperand: "",
    operation: "",
    overwrite: false,
  };
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { currentoperand, previousoperand, operation } = state;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.calculator}>
          <div className={styles.output}>
            <div className={styles.previous}>
              {previousoperand} {operation}
            </div>
            <div className={styles.current}>{currentoperand}</div>
          </div>
          <button
            className={styles.span}
            onClick={() => dispatch({ type: "clear" })}
          >
            AC
          </button>
          <button onClick={() => dispatch({ type: "delete" })}>DEL</button>
          <Operatioanbutton operation="÷" dispatch={dispatch} />
          <Digitbutton digit="1" dispatch={dispatch} />
          <Digitbutton digit="2" dispatch={dispatch} />
          <Digitbutton digit="3" dispatch={dispatch} />
          <Operatioanbutton operation="*" dispatch={dispatch} />
          <Digitbutton digit="4" dispatch={dispatch} />
          <Digitbutton digit="5" dispatch={dispatch} />
          <Digitbutton digit="6" dispatch={dispatch} />
          <Operatioanbutton operation="+" dispatch={dispatch} />

          <Digitbutton digit="7" dispatch={dispatch} />
          <Digitbutton digit="8" dispatch={dispatch} />
          <Digitbutton digit="9" dispatch={dispatch} />
          <Operatioanbutton operation="-" dispatch={dispatch} />

          <Digitbutton digit="." dispatch={dispatch} />

          <Digitbutton digit="0" dispatch={dispatch} />
          <button
            className={styles.span}
            onClick={() => dispatch({ type: "evaluate" })}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}
