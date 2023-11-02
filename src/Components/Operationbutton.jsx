import PropTypes from "prop-types";
Operatioanbutton.propTypes = {
  operation: PropTypes.string,
  dispatch: PropTypes.func,
};

export function Operatioanbutton({ operation, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: "choose_operation", payload: operation })}
    >
      {operation}
    </button>
  );
}
