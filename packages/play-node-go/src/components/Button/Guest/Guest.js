import React from "react";
import authServices from "../../../services/authServices";

const Guest = ({ dispatch }) => {
  const handleClick = async (e) => {
    e.preventDefault();
    // dispatch to guest endpoint
    const guestResponse = await authServices.guestService();

    if (guestResponse.errors) {
      const authError = guestResponse.errors[0].auth;
      return dispatch({
        type: "ERR",
        message: "AUTH_ERROR",
        body: { authError },
      });
    }

    return dispatch({
      type: "AUTH",
      message: "GUEST",
      body: guestResponse,
    });
  };
  return (
    <>
      <button className="nav__section__button" onClick={handleClick}>
        Continue As Guest
      </button>
    </>
  );
};

export default Guest;
