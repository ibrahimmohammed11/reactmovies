import React, { Component, Fragment } from 'react'
import "./__style.css";
export default class Tv extends Component {
    render() {
        let { tv } = this.props;
        return (
            <Fragment>



                <div className="row">
                    <div className="col-xl-4 col-lg-3 col-md-4 col-sm-8 col-10 pb-4">
                        <div>
                            <div className="w-25 brbr mt-5"></div>
                            <h3 className="my-2 py-2 mainColor">Trending<br />Tv<br />to Watch Right Now</h3>
                            <p className="my-2 secondColor">Most watched tv by days</p>
                            <div className="w-100 brbr"></div>
                        </div>
                    </div>
                    {tv.map((value, key) => {
                        return <div key={key} className="grid col-md-3">
                            <figure className="effect-layla">
                                <img src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`} className="w-100 brRadius overflow-hidden" alt=" " />
                                <figcaption className="text-center">
                                    <h5>{value.title}{value.name}</h5>
                                    <p><span className="clip-star"></span> {value.vote_average}</p>
                                    <p href="#g"> {value.first_air_date}</p>
                                </figcaption>
                            </figure>
                        </div>
                    })}
                </div>

            </Fragment>
        )
    }
}
