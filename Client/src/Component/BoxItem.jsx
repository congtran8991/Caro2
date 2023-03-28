import React from "react";
import PropTypes from "prop-types";

const BoxItem = (props) => {
  const { value = "", newTick, X, Y } = props;
  const isCoordinatesCheckNewTick = newTick?.x === X && newTick?.y === Y;
  const bg = newTick?.tick === "X" ? "bg-blue" : "bg-brown";
  const bg_newTick = isCoordinatesCheckNewTick ? bg : "";
  const classValue = `bold fz18 ${bg_newTick} ${
    value === "X" ? "clr-blue" : "clr-brown"
  }`;
  return (
    <td className={classValue} x={X} y={Y}>
      {value}
    </td>
  );
};

BoxItem.propTypes = {
  value: PropTypes.string,
  newTick: PropTypes.object,
  X: PropTypes.number,
  Y: PropTypes.number,
};

export default BoxItem;
