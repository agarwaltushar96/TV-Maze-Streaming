//import Shows from "./Components/Shows/Shows";
import { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./Components/Dropdown/Dropdown";
import Shows from "./Components/Shows/Shows";

function App() {
  const [inputValue, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewActor, setActor] = useState([]);
  const [viewActorShow, setActorShow] = useState([]);
  const [viewShow, setShow] = useState([]);
  const [radioCheck, setRadio] = useState("actor");
  const [viewActorD, setActorD] = useState([]);
  const [viewShowD, setShowD] = useState([]);
  const [radioCheckD, setRadioD] = useState("actor");
  const [searchVal, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  function sleep(time) {
    const p = new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, time);
    });
    return p;
  }

  useEffect(() => {
    setActorShow([]);
  }, [loading]);

  async function getAPIActor(data) {
    const response = await fetch(
      `https://api.tvmaze.com/people/${data}/castcredits?embed=show`
    );
    const newData = await response.json();
    //console.log(newData);
    if (newData.length !== 0)
      setActorShow((oldState) => [...oldState, newData]);
  }
  async function getAPI(inputValue, fromWhere) {
    if (fromWhere) {
      await sleep(3000);
      if (document.getElementById("actor").checked === true) {
        const response = await fetch(
          `https://api.tvmaze.com/search/people?q=${inputValue}`
        );
        const data = await response.json();
        setActor(data);
        data.map((item) => getAPIActor(item.person.id));
        setRadio("actor");
      } else if (document.getElementById("showName").checked === true) {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${inputValue}`
        );
        const data = await response.json();
        setShow(data);
        setRadio("show");
      }
    } else {
      if (document.getElementById("actor").checked === true) {
        const response = await fetch(
          `https://api.tvmaze.com/search/people?q=${inputValue}`
        );
        const data = await response.json();
        setActorD(data);
        setRadioD("actor");
      } else if (document.getElementById("showName").checked === true) {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${inputValue}`
        );
        const data = await response.json();
        setShowD(data);
        setRadioD("show");
      }
    }
  }

  useEffect(() => {
    //console.log(inputValue);
    if (inputValue !== "") {
      (async () => {
        setLoading(true);
        await getAPI(inputValue, true);
        setLoading(false);
      })();
    }
  }, [inputValue]);

  useEffect(() => {
    if (searchVal !== "") {
      (async () => {
        await getAPI(searchVal, false);
      })();

      document.getElementsByClassName("fa fa-times")[0].style.display = "block";
    } else
      document.getElementsByClassName("fa fa-times")[0].style.display = "none";
  }, [searchVal]);

  // function displayUI() {
  //   return (
  //     view &&
  //     view?.map((obj) => {
  //       return (
  //         <>
  //           <div>Name: {obj.show.name}</div>
  //           <div>Runtime: {obj.show.runtime}</div>
  //         </>
  //       );
  //     })
  //   );
  // }

  function radioSelect(e) {
    setInput("");
    setActor([]);
    setSearch("");

    document.getElementById("typingBox").value = "";
    if (e.target.id === "By Actor" || e.target.id === "actor")
      document.getElementById("typingBox").placeholder = "eg. Daniel Craig";
    else
      document.getElementById("typingBox").placeholder = "eg. Peaky Blinders";
  }

  function submitFunction(e) {
    console.log("from dropdwon");
    const val = e.target.innerHTML;
    console.log(val);
    console.log(radioCheck);
    document.getElementById("typingBox").value = "";

    if (val !== "") {
      setInput(val);
      setSearch("");
      document.getElementById("errorDisplay").style.display = "none";
    } else {
      document.getElementById("errorDisplay").innerHTML =
        "* Input Field Cannot be EMPTY";
      document.getElementById("errorDisplay").style.display = "block";
    }
  }

  function transferInput(e) {
    e.preventDefault();
    const val = e.target.elements[0].value;

    document.getElementById("typingBox").value = "";
    if (val !== "") {
      setInput(val);
      setSearch("");
      document.getElementById("errorDisplay").style.display = "none";
    } else {
      document.getElementById("errorDisplay").innerHTML = "* TYPE SOMETHING";
      document.getElementById("errorDisplay").style.display = "block";
    }
  }

  function getDropdown(e) {
    setSearch(e.target.value);
    document.getElementById("errorDisplay").style.display = "none";
  }

  function clear() {
    setSearch("");
    document.getElementById("typingBox").value = "";
    document.getElementsByClassName("fa fa-times")[0].style.display = "none";
  }

  function deselect() {
    setShowDropdown(true);
  }

  return (
    <>
      <div onClick={deselect}>
        <div
          style={{
            position: "fixed",
            zIndex: "100",
            backgroundColor: "#11292e",
            width: "100%",
          }}
        >
          <div>
            <h2 className="title">TV Maze</h2>
          </div>
          <form className="radios">
            <label onClick={radioSelect} id="By Actor">
              <input
                type="radio"
                id="actor"
                defaultChecked="true"
                //onClick={radioSelect}
                name="inputRadio"
              />
              By Actor
            </label>

            <label onClick={radioSelect} id="By Show Name">
              <input
                type="radio"
                id="showName"
                //onClick={radioSelect}
                name="inputRadio"
              />
              By Show Name
            </label>
          </form>
          <div className="inputBox">
            <form onSubmit={transferInput}>
              <div className="inputArea">
                <input
                  type="text"
                  placeholder="eg. Daniel Craig"
                  id="typingBox"
                  onChange={getDropdown}
                />
                <i className="fa fa-times" onClick={clear}></i>
              </div>
              <button type="submit">Search</button>
            </form>
            <Dropdown
              inputAct={viewActorD}
              inputSh={viewShowD}
              searchvalue={searchVal}
              radioselect={radioCheckD}
              submitFunction={submitFunction}
              deselect={showDropdown}
            />
            <div id="errorDisplay"></div>
          </div>
        </div>

        <Shows
          viewActorShow={viewActorShow}
          viewShow={viewShow}
          property={radioCheck}
        />

        {/* {!loading && <div>{view ? displayUI() : <>No results found</>}</div>}
      {loading && <div>Loading .... . .... .... .... </div>} */}
      </div>
    </>
  );
}

export default App;
