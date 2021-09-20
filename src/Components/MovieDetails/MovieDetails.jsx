import React, { Component, Fragment } from 'react';

import {
    getMovieDetails,
    getSimilarMovie,
    getMovieCast,
    getMovieVideo
} from "../../service";
import StarRatings from 'react-star-ratings';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import Styles from "./style.module.css"

const IMG_API = "https://image.tmdb.org/t/p/w500/";

export default class MovieDetails extends Component {
    state = {
        details: [],
        genres: [],
        SimilarMovie: [],
        getMovieCast: [],
        MovieVideo: [],
        isOpen: false,
        loading: false,
    };

    async componentDidMount() {
        let { id } = this.props.match.params;
        let data = await getMovieDetails(id);
        let data1 = await getSimilarMovie(id);
        let data2 = await getMovieCast(id);
        let data3 = await getMovieVideo(id);
        this.setState({
            details: data,
            genres: data.genres,
            SimilarMovie: data1.results,
            getMovieCast: data2.cast,
            MovieVideo: data3,
            loading: true,

        })
    }
    getDetails = async (id) => {
        this.props.history.push(`/movie/${id}`);
        let data = await getMovieDetails(id);
        let data1 = await getSimilarMovie(id);
        let data2 = await getMovieCast(id);
        let data3 = await getMovieVideo(id);

        this.setState({
            details: data,
            genres: data.genres,
            SimilarMovie: data1.results,
            getMovieCast: data2.cast,
            MovieVideo: data3,
        })
    };
    render() {
        let { SimilarMovie, getMovieCast, details, genres, isOpen, MovieVideo } = this.state;
        console.log(details.homepage);
        const MoviePalyerModal = (props) => {
            const youtubeUrl = "https://www.youtube.com/watch?v=";
            return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title
                            id="contained-modal-title-vcenter"
                            style={{ color: "#f5c518", fontWeight: "bolder" }}
                        >
                            {details.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#000000" }}>
                        <ReactPlayer
                            className="container-fluid"
                            url={youtubeUrl + MovieVideo?.key}
                            playing
                            width="100%"
                        ></ReactPlayer>
                    </Modal.Body>
                </Modal>
            );
        };
        if (this.state.loading) {
            return (
                <Fragment>
                    <div className="container">
                        <div className="row mt-2">
                            <MoviePalyerModal // موجود بس معمول ليه اخفاء لما ادوس يظهر
                                show={isOpen}
                                onHide={() => {
                                    this.setState({ isOpen: false });
                                }}
                            ></MoviePalyerModal>
                            {details.backdrop_path && <div className="col text-center" style={{ width: "100%" }}>
                                <img
                                    className="img-fluid"
                                    src={`http://image.tmdb.org/t/p/original/${details.backdrop_path}`}
                                    alt={details.title}
                                ></img>
                                <div className="carousel-center">
                                    <i
                                        onClick={() => this.setState({ isOpen: true })}
                                        className={`${Styles.iconStyle} far fa-play-circle`}

                                    ></i>
                                </div>
                                <div
                                    className={`${Styles.txtSt} carousel-caption`}
                                >
                                    {details.title}
                                </div>
                            </div>}
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">GENRE</h4>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <ul className="list-inline">
                                    {genres.map((value, index) => {
                                        return <li key={index} className="list-inline-item">
                                            <button type="button" className={`${Styles.btnSty} btn`}>
                                                {value.name}
                                            </button>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <div className="text-center font-weight-bold mColor">
                                    Rating: {details.vote_average} &nbsp;
                                <StarRatings
                                        rating={details.vote_average}
                                        starRatedColor="gold"
                                        changeRating={this.changeRating}
                                        numberOfStars={10}
                                        name='rating'
                                        starDimension="16px"
                                        starSpacing="1px"
                                    />
                                </div>
                                <div className="mt-3">
                                    <p className="font-weight-bold mColor">OVERVIEW</p>
                                    <p className="text-white">{details.overview}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-3">
                                <p className="font-weight-bold mColor">RELEASE DATE</p>
                                <p className="text-white">{details.release_date}</p>
                            </div>
                            <div className="col-md-3">
                                <p className="font-weight-bold mColor">RUN TIME</p>
                                <p className="text-white">{details.runtime}</p>
                            </div>
                            <div className="col-md-3">
                                <p className="font-weight-bold mColor">BUDGET</p>
                                <p className="text-white">{details.budget}</p>
                            </div>
                            <div className="col-md-3">
                                <p className="font-weight-bold mColor">HOMEPAGE</p>
                                {details.homepage && <a className={`${Styles.btnStyle} btn`} href={details.homepage} target="_blank" rel="noreferrer">
                                    MOVIE HOMEPAGE
                                    </a>
                                }
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">TOP CAST</h4>
                            </div>
                        </div>


                        <div className="row mt-3">
                            {getMovieCast.slice(0, 4).map((cast, key) => {
                                return (
                                    <div key={key} className="col-md-3 col-sm-4 col-6 text-center">
                                        {cast.profile_path && <div> <img
                                            className={`${Styles.imgSt} img-fluid rounded-circle mx-auto d-block`}
                                            src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                                            alt={cast.name} />
                                            <p className="font-weight-bolder text-center text-white">{cast.name}</p>
                                            <p
                                                className="font-weight-light text-center text-white"
                                                style={{ color: "#5a606b" }}
                                            >
                                                {cast.character}
                                            </p>
                                        </div>}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <h4 className="font-weight-bold mColor">
                                    SIMILAR MOVIES
                        </h4>
                            </div>
                        </div>

                        <div className="row mt-3">
                            {SimilarMovie.slice(0, 4).map((item, index) => {
                                return (
                                    <div className="grid col-xl-3 col-lg-4 col-sm-6" key={index}>
                                        <div onClick={() => this.getDetails(item.id)}>
                                            <figure className="effect-duke">
                                                <img className="imgStyle" src={`${IMG_API}${item.poster_path}`} alt={item.title}></img>
                                                <figcaption>
                                                    <h5 className="text-white" style={{ fontWeight: "bolder" }}>{item.title}</h5>
                                                    <p className="text-white">Rated: {item.vote_average.toFixed(2)}</p>
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
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className={Styles.loader}>Loading...</div>
                </Fragment>
            )
        }

    }
}
