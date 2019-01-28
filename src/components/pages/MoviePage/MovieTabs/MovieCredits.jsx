import React from "react";
import CallApi from "../../../../api/api";

export default class MovieCredits extends React.Component {
  constructor() {
    super();
    this.state = {
      cast: []
    };
  }
  componentDidMount = () => {
    if (this.props.movieId) {
      CallApi.get(`/movie/${this.props.movieId}/credits`).then(data => {
        this.setState({
          cast: data.cast
        });
      });
    }
  };

  render() {
    console.log("render", this.props);
    return (
      <div>
        <h2 className="characters-title">В ролях:</h2>
        <div className="row">
          {this.state.cast.length > 0
            ? this.state.cast.map(item => {
                if (item.profile_path) {
                  return (
                    <div
                      key={item.id}
                      className="col-xs-12 col-sm-6 col-md-3 pt-3 pb-3 character-card"
                    >
                      <img
                        alt=""
                        src={`https://image.tmdb.org/t/p/w500${
                          item.profile_path
                        }`}
                        style={{ width: "100%" }}
                      />
                      <div className="character">
                        <h3>{item.name}</h3>
                        <span>{item.character}</span>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            : null}
        </div>
      </div>
    );
  }
}
