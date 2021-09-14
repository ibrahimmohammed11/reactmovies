import React, { Component, Fragment } from 'react'

import axios from "axios";
import TypeWriterEffect from 'react-typewriter-effect';
import Styles from "./style.module.css";

const API_KEY = "f1aca93e54807386df3f6972a5c33b50";
const IMG_API = "https://image.tmdb.org/t/p/w500/"
export default class Trending extends Component {
    state = {
        movieData: [],
    };
    getMoviesAndTv = async (mediaType) => {
        let { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${API_KEY}`
        );
        this.setState({
            movieData: data.results,
        });
    };
    componentDidMount() {
        this.getMoviesAndTv("all");

    }
    getDataFromSelect = (e) => {
        this.getMoviesAndTv(e.target.value);
    }
    render() {
        let { movieData } = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="m-5">
                        <TypeWriterEffect
                            textStyle={{ color: '#f5c518' }}
                            startDelay={100}
                            cursorColor="#f5c518"
                            text={"Welcome to The Best Movies and TV Website"}
                            loop={true}
                            nextTextDelay={1000}
                            typeSpeed={100}
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <select defaultValue="" onChange={this.getDataFromSelect} className="form-control">
                                <option value="" disabled hidden>Choose a Category</option>
                                <option value="movies">Movies</option>
                                <option value="tv">Tv</option>
                            </select>
                        </div>


                        <div className="col-md-6">
                            <button value="movies" onClick={this.getDataFromSelect} className={`${Styles.btnSt} btn mx-3 mb-4`}>Movies</button>
                            <button value="tv" onClick={this.getDataFromSelect} className={`${Styles.btnSt} btn mx-3 mb-4`}>Tv</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-3 col-md-4 col-sm-8 col-10 pb-4">
                            <div>
                                <div className="w-25 brbr mt-5"></div>
                                <h3 className="my-2 py-2 mColor">Trending<br />to Watch Right Now</h3>
                                <p className="my-2 secondColor">Most Watched by Days</p>
                                <div className="w-100 brbr"></div>
                            </div>
                        </div>
                        {movieData.map((movie, key) => {
                            return <div key={key} className="grid col-xl-3 col-lg-4 col-sm-6">
                                <figure className="effect-ming">
                                    <img src={`${IMG_API}${movie.poster_path}`} alt="" className="imgStyle" />
                                    <figcaption>
                                        <h5>{movie.title}{movie.name}</h5>
                                        {movie.vote_average && <p><span className="clip-star"></span> {movie.vote_average}</p>}
                                        <p>{movie.release_date}</p>
                                    </figcaption>
                                </figure>
                            </div>
                        })}
                    </div>
                </div>
            </Fragment>
        )
    }
}
