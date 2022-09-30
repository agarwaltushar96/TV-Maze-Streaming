import React from "react";
import "./Shows.css";

function Shows(props) {
  const { viewActorShow, viewShow, property, results, input } = props;

  return (
    <>
      {input && (
        <div className="search_Results">Search Results for "{input}"</div>
      )}
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
                          {item.show.premiered &&
                            item.show.premiered.slice(0, 4)}
                        </div>
                        {item.show.rating.average && (
                          <div
                            style={{
                              display: "inline-block",
                              float: "right",
                            }}
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
          results && <div className="displayShowError">NO RESULTS FOUND</div>
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
                          {item._embedded.show.premiered &&
                            item._embedded.show.premiered.slice(0, 4)}
                        </div>
                        {item._embedded.show.rating.average && (
                          <div
                            style={{
                              display: "inline-block",
                              float: "right",
                            }}
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
        results && <div className="displayShowError">NO RESULTS FOUND</div>
      )}
    </>
  );
}
export default Shows;
