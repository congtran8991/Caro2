import React from "react";
import PropTypes from "prop-types";

const BoxItem = (props) => {
  const { value = "", X, Y } = props;
  const classValue = `bold fz18 ${value === "X" ? "clr-blue" : "clr-brown"}`;
  return (
    <td
      x={X}
      y={Y}
      className={classValue}
    >
      {value}
    </td>
  );
};

BoxItem.propTypes = {
  value: PropTypes.string,
  X: PropTypes.number,
  Y: PropTypes.number
};

export default BoxItem;
