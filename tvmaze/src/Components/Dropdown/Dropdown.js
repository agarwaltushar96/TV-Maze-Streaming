import React, { useEffect, useState } from "react";
import "./Dropdown.css";

function Dropdown(props) {
  const {
    radioselect,
    searchvalue,
    inputAct,
    inputSh,
    submitFunction,
    // historyDropdown,
  } = props;
  const [property, setProp] = useState({ display: "none" });

  useEffect(() => {
    if (searchvalue !== "") setProp({ display: "block" });
    // else {
    //   if (
    //     (radioselect === "actor" && historyDropdown) ||
    //     (radioselect === "show" && historyDropdown)
    //   )
    //     setProp({ display: "block" });
    else setProp({ display: "none" });
    //}
  }, [searchvalue]);

  // function selectDown(ev) {
  //   console.log("down");
  //   if (ev.target.nextElementSibling) {
  //     ev.target.nextElementSibling.style.backgroundColor = "#F0C993";
  //     ev.target.nextElementSibling.style.color = "#105D97";
  //   }
  // }

  // function selectUp(ev) {
  //   console.log("up");
  //   if (ev.target.previousElementSibling) {
  //     ev.target.previousElementSibling.style.backgroundColor = "#F0C993";
  //     ev.target.previousElementSibling.style.color = "#105D97";
  //   }
  // }

  return (
    <>
      {/* {historyDropdown ? (
        <div className="dropdown" style={property}>
          {radioselect === "show" &&
            window.localStorage.getItem("showHistory") &&
            window.localStorage
              .getItem("showHistory")
              .slice(0, 7)
              .map((item) => {
                return (
                  <div
                    className="dropSelect"
                    style={{ cursor: "pointer" }}
                    onClick={submitFunction}
                  >
                    {item}
                  </div>
                );
              })}
          {radioselect === "actor" &&
            window.localStorage.getItem("actorHistory") &&
            window.localStorage
              .getItem("actorHistory")
              .slice(0, 7)
              .map((item) => {
                return (
                  <div
                    className="dropSelect"
                    style={{ cursor: "pointer" }}
                    onClick={submitFunction}
                  >
                    {item}
                  </div>
                );
              })}
        </div>
      ) :  */}
      {/* ( */}
      <div className="dropdown" style={property}>
        {radioselect === "show" &&
          inputSh.slice(0, 7).map((item) => {
            return (
              <div
                className="dropSelect"
                style={{ cursor: "pointer" }}
                onClick={submitFunction}
                // onKeyDown={selectDown}
                // onKeyUp={selectUp}
              >
                {item.show.name}
              </div>
            );
          })}
        {radioselect === "actor" &&
          inputAct.slice(0, 7).map((item) => {
            return (
              <div
                className="dropSelect"
                style={{ cursor: "pointer" }}
                onClick={submitFunction}
                // onKeyDown={selectDown}
                // onKeyUp={selectUp}
              >
                {item.person.name}
              </div>
            );
          })}
      </div>
      {/* )} */}
    </>
  );
}
export default Dropdown;
