import React from "react";
import "./Shows.css";

// for show, .show.name/.show.premiered/.show.rating.average/.show.image.medium or .original or null
// for actor, ._embedded.show.name/._embedded.show.premiered/._embedded.show.rating.average/._embedded.show.image.medium or original or null/._embedded.show.network.name

function Shows(props) {
  const { viewActorShow, viewShow, property } = props;
  //console.log(viewActorShow);
  // useEffect(() => {
  //   if (property === true) setProp({ display: "block" });
  //   else setProp({ display: "none" });
  // }, [property]);

  return (
    <>
      {property === "show" ? (
        viewShow.length !== 0 ? (
          <div className="displayShows">
            {viewShow.map((item) => {
              let image = item.show.image;
              return (
                image !== null && (
                  <div className="showBox">
                    <div>
                      <img
                        src={image.medium}
                        style={{ borderRadius: "7px", width: "" }}
                        alt="NOT FOUND"
                      />
                    </div>
                    <div className="detailBox">
                      <div className="titleBox">{item.show.name}</div>
                      <div className="details">
                        <div style={{ display: "inline-block" }}>
                          {item.show.premiered.slice(0, 4)}
                        </div>
                        {item.show.rating.average && (
                          <div
                            style={{ display: "inline-block", float: "right" }}
                          >
                            Rating {item.show.rating.average}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        ) : (
          <div style={{ color: "red" }}>NO RESULTS FOUND</div>
        )
      ) : viewActorShow.length !== 0 ? (
        <div className="displayShows">
          {viewActorShow.map((item1) => {
            return item1.map((item) => {
              let image = item._embedded.show.image;
              return (
                image !== null && (
                  <div className="showBox">
                    <div>
                      <img
                        src={image.medium}
                        style={{ borderRadius: "7px", width: "" }}
                        alt="NOT FOUND"
                      />
                    </div>
                    <div className="detailBox">
                      <div className="titleBox">{item._embedded.show.name}</div>
                      <div className="details">
                        <div style={{ display: "inline-block" }}>
                          {item._embedded.show.premiered.slice(0, 4)}
                        </div>
                        {item._embedded.show.rating.average && (
                          <div
                            style={{ display: "inline-block", float: "right" }}
                          >
                            Rating {item._embedded.show.rating.average}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              );
            });
          })}
        </div>
      ) : (
        <div className="displayShows" style={{ color: "red" }}>
          NO RESULTS FOUND
        </div>
      )}
    </>
  );
}
export default Shows;
