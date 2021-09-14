import React, { Component, Fragment } from 'react';
import Styles from './style.module.css';
import error from '../../images/404 Error Page not Found with people connecting a plug-amico.svg'

export default class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <div className="container fixed-bottom">
                    <section className="mt-5">
                        <div className="text-center">
                            <img src={error} alt=".." className={`${Styles.area}`} />
                        </div>
                    </section>
                </div>
            </Fragment>
        )
    }
}