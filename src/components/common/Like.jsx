import React from "react";

/**
 * Like stateless component.
 *
 * @param {object} props
 */
function Like({ liked, onClick }) {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";

  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
}

export default Like;
