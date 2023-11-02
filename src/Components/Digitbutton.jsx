import PropTypes from "prop-types";
Digitbutton.propTypes = {
  digit: PropTypes.string,
  dispatch: PropTypes.func,
};
export function Digitbutton({ digit, dispatch }) {
  return (
    <button onClick={() => dispatch({ type: "digit", payload: digit })}>
      {digit}
    </button>
  );
}
