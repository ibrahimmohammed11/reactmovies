import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';

import {
    getMovie,
    getGenre,
    getTrendingPerson,
    getMovieByGenre,
    searchMovie
} from "../../service";
import "./_style.css";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
    "mdbreact";
import Styles from "./style.module.css";

const IMG_API = "https://image.tmdb.org/t/p/w500/";

export default class Home extends Component {
    state = {
        now_playing: [],
        genres: [],
        persons: [],
        top_rated: [],
        upcoming: [],
        popular: [],
        movieByGenre: [],
        loading: false,
        searchMovies: [],
        search: ''
    };
    async componentDidMount() {
        let data1 = await getMovie("now_playing");
        let data2 = await getGenre();
        let data3 = await getTrendingPerson();
        let data4 = await getMovie("top_rated");
        let data5 = await getMovie("upcoming");
        let data6 = await getMovie("popular");
        let data7 = await getMovieByGenre(28);
        let data8 = await searchMovie("@#$%%");
        this.setState({
            now_playing: data1.results,
            genres: data2.genres,
            persons: data3.results,
            top_rated: data4.results,
            upcoming: data5.results,
            popular: data6.results,
            movieByGenre: data7.results,
            searchMovies: data8.results,
            loading: true,
        })
    }
    handleGenreClick = async (genre_id) => {
        let data7 = await getMovieByGenre(genre_id);
        this.setState({
            movieByGenre: data7.results
        })
    };
    updateSearch = async (e) => {
        let data8 = await searchMovie(e.target.value);
        this.setState({
            search: e.target.value,
            searchMovies: data8.results,
        })
    }
    render() {
        let { now_playing, genres, persons, top_rated, upcoming, popular, movieByGenre, searchMovies, search } = this.state;
        if (this.state.loading) {
            return (
                <Fragment>
                    <div className="container-fluid">
                        <div className="d-flex justify-content-end">
                            <div >
                                <input type="text" onKeyUp={this.updateSearch} placeholder='Serach by Movie' className={`${Styles.inputSt} my-2`} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mt-3">
                            {searchMovies.slice(0, 8).map((item, index) => {
                                if (item.original_title.toLowerCase().includes(search.toLowerCase())) {
                                    return (
                                        <div className="grid col-xl-3 col-lg-4 col-sm-6" key={index}>
                                            <Link to={`/movie/${item.id}`}>
                                                {item.poster_path && <figure className="effect-apollo">
                                                    <img className="imgStyle" src={`${IMG_API}${item.poster_path}`} alt={item.title}></img>
                                                    <figcaption>
                                                        <h5 className="text-white" style={{ fontWeight: "bolder" }}>{item.title}</h5>
                                                        <p className="text-white">Rated: {item.vote_average}</p>
                                                        <StarRatings
                                                            rating={item.vote_average}
                                                            starRatedColor="gold"
                                                            changeRating={this.changeRating}
                                                            numberOfStars={10}
                                                            name='rating'
                                                            starDimension="16px"
                                                            starSpacing="1px"
                                                        />
                                                    </figcaption>
                                                </figure>}
                                            </Link>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">
                                    Now PLAYING MOVIES
                            </h4>
                            </div>
                        </div>
                        <MDBContainer>
                            <MDBCarousel
                                activeItem={1}
                                length={3}
                                showControls={true}
                                showIndicators={true}
                                className="z-depth-1"
                            >
                                <MDBCarouselInner>
                                    {now_playing.map((item, key) => {
                                        return (
                                            <MDBCarouselItem itemId={key} key={key}>
                                                <MDBView>
                                                    <img
                                                        className={Styles.imgSt}
                                                        src={`http://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                                        alt={item.title}
                                                    />
                                                    <MDBMask overlay="black-light" />
                                                </MDBView>
                                                <MDBCarouselCaption>
                                                    <h2 className="text-white">{item.title}</h2>
                                                </MDBCarouselCaption>
                                            </MDBCarouselItem>
                                        )
                                    })}
                                </MDBCarouselInner>
                            </MDBCarousel>
                        </MDBContainer>


                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">
                                    SELECT MOVIES BY CATEGORY
                            </h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <ul className="list-inline">{genres.map((item, index) => {
                                    return (
                                        <li className="list-inline-item" key={index}>
                                            <button
                                                type="button"
                                                className={`${Styles.btnSty} btn`}
                                                onClick={() => {
                                                    this.handleGenreClick(item.id);
                                                }}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    );
                                })}</ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {movieByGenre.map((item, index) => {
                                return (
                                    <div className="grid col-xl-3 col-lg-4 col-sm-6" key={index}>
                                        <Link to={`/movie/${item.id}`}>
                                            <figure className="effect-apollo">
                                                <img className="imgStyle" src={`${IMG_API}${item.poster_path}`} alt={item.title}></img>
                                                <figcaption>
                                                    <h5 className="text-white" style={{ fontWeight: "bolder" }}>{item.title}</h5>
                                                    <p className="text-white">Rated: {item.vote_average}</p>
                                                    <StarRatings
                                                        rating={item.vote_average}
                                                        starRatedColor="gold"
                                                        changeRating={this.changeRating}
                                                        numberOfStars={10}
                                                        name='rating'
                                                        starDimension="16px"
                                                        starSpacing="1px"
                                                    />
                                                </figcaption>
                                            </figure>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">
                                    TRENDING PERSONS ON THIS WEEK
                                </h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {persons.slice(0, 8).map((p, i) => {
                                return (
                                    <div className="col-md-3 col-sm-4 col-6 text-center" key={i}>
                                        <img
                                            className={`${Styles.imgSt} img-fluid rounded-circle mx-auto d-block`}
                                            src={`${IMG_API}${p.profile_path}`}
                                            alt={p.name}
                                        ></img>
                                        <p className="font-weight-bold text-center text-white">{p.name}</p>
                                        <p
                                            className="font-weight-light text-center mColor">
                                            Trending for {p.known_for_department}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">
                                    TOP RATED MOVIES
                            </h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {top_rated.slice(0, 8).map((item, index) => {
                                return (
                                    <div className="grid col-xl-3 col-lg-4 col-sm-6" key={index}>
                                        <Link to={`/movie/${item.id}`}>
                                            <figure className="effect-duke">

                                                <img className="imgStyle" src={`${IMG_API}${item.poster_path}`} alt={item.title}></img>


                                                <figcaption>
                                                    <h5 className="text-white" style={{ fontWeight: "bolder" }}>{item.title}</h5>
                                                    <p className="text-white">Rated: {item.vote_average}</p>
                                                    <StarRatings
                                                        rating={item.vote_average}
                                                        starRatedColor="gold"
                                                        changeRating={this.changeRating}
                                                        numberOfStars={10}
                                                        name='rating'
                                                        starDimension="16px"
                                                        starSpacing="1px"
                                                    />
                                                </figcaption>
                                            </figure>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">
                                    UPCOMING MOVIES
                            </h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {upcoming.slice(0, 8).map((item, index) => {
                                return (
                                    <div className="grid col-xl-3 col-lg-4 col-sm-6" key={index}>
                                        <Link to={`/movie/${item.id}`}>
                                            <figure className="effect-apollo">

                                                <img className="imgStyle" src={`${IMG_API}${item.poster_path}`} alt={item.title}></img>

                                                <figcaption>
                                                    <h5 className="text-white" style={{ fontWeight: "bolder" }}>{item.title}</h5>
                                                    <p className="text-white">Rated: {item.vote_average}</p>
                                                    <StarRatings
                                                        rating={item.vote_average}
                                                        starRatedColor="gold"
                                                        changeRating={this.changeRating}
                                                        numberOfStars={10}
                                                        name='rating'
                                                        starDimension="16px"
                                                        starSpacing="1px"
                                                    />
                                                </figcaption>
                                            </figure>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">
                                    POPULAR MOVIES
                            </h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {popular.slice(0, 8).map((item, index) => {
                                return (
                                    <div className="grid col-xl-3 col-lg-4 col-sm-6" key={index}>
                                        <Link to={`/movie/${item.id}`}>
                                            <figure className="effect-ming">

                                                <img className="imgStyle" src={`${IMG_API}${item.poster_path}`} alt={item.title}></img>

                                                <figcaption>
                                                    <h5 className="text-white" style={{ fontWeight: "bolder" }}>{item.title}</h5>
                                                    <p className="text-white">Rated: {item.vote_average}</p>
                                                    <StarRatings
                                                        rating={item.vote_average}
                                                        starRatedColor="gold"
                                                        changeRating={this.changeRating}
                                                        numberOfStars={10}
                                                        name='rating'
                                                        starDimension="16px"
                                                        starSpacing="1px"
                                                    />
                                                </figcaption>
                                            </figure>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>
                    </div>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <div className={Styles.loader}>Loading...</div>
                </Fragment>
            )
        }
    }
}
