import { Fragment } from 'react';
import './scss/FormWithInputBoxLoader.scoped.scss'

export const FormWithInputBoxLoader = () => {
    return (
        <Fragment>
            <section className="hero login-hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered is-desktop">
                            <div className="column is-half-desktop is-full-mobile is-narrow-tablet">
                                <div className="icon-box box">
                                    <div className="columns is-mobile is-centered">
                                        <div className="column is-narrow">
                                            {/* <img
                                                // src={loginLogo}
                                                alt=""
                                                width="150"
                                                height="40"
                                                style={{
                                                    userSelect: 'none',
                                                }}
                                            /> */}
                                            {/* <div
                                                style={{
                                                    width: 150,
                                                    height: 40,
                                                    background: '#0a0a0a',
                                                }}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};
