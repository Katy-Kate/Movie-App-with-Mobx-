import React from "react";
import MoviesList from "./MoviesList";
import CallApi from "../../api/api";
import _ from "lodash";

export default class MoviesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const queryStringParams = {
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year
    };

    if (with_genres.length > 0)
      queryStringParams.with_genres = with_genres.join(",");
    CallApi("/discover/movie", {
      params: queryStringParams
    }).then(data => {
      this.props.onChangePagination({
        page: data.page,
        total_pages: data.total_pages
      });
      this.setState({
        movies: data.results
      });
    });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }
  componentDidUpdate(prevProps) {
    if (
      !_.isEqual(this.props.filters, prevProps.filters)
      // this.props.filters !== prevProps.filters
      // this.props.filters.sort_by !== prevProps.filters.sort_by ||
      // this.props.filters.primary_release_year !==
      //   prevProps.filters.primary_release_year
    ) {
      this.props.onChangePagination({ page: 1 });
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
    const { toggleModal } = this.props;
    return <MoviesList movies={movies} toggleModal={toggleModal} />;
  }
}
