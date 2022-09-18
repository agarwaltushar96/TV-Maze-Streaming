import React, { useEffect, useState } from "react";
import "./Dropdown.css";

function Dropdown(props) {
  const {
    radioselect,
    searchvalue,
    inputAct,
    inputSh,
    submitFunction,
    deselect,
  } = props;
  const [property, setProp] = useState({ display: "none" });

  useEffect(() => {
    if (searchvalue !== "") setProp({ display: "block" });
    else setProp({ display: "none" });
  }, [searchvalue, deselect]);

  useEffect(() => {
    if (deselect === true) setProp({ display: "none" });
  }, [deselect]);

  return (
    <>
      <div className="dropdown" style={property}>
        {radioselect === "show" &&
          inputSh.slice(0, 7).map((item) => {
            return (
              <div
                className="dropSelect"
                style={{ cursor: "pointer" }}
                onClick={submitFunction}
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
              >
                {item.person.name}
              </div>
            );
          })}
      </div>
    </>
  );
}
export default Dropdown;
