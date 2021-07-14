import './scss/footer.scss';
import './scss/footer.responsive.scss';

export const Footer = () => {
    return (
        <footer className="footer_item">
            <div className="columns is-mobile footer_column">
                <div className="column footer_info_column  is-3">
                    <article className="media">
                        <figure className="media-left">
                            <p className="image is-64x64">
                                <img
                                    id="footer-song-image"
                                    alt=""
                                    src="https://bulma.io/images/placeholders/128x128.png"
                                />
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p className="footer_info">
                                    <strong id="footer-song-name">
                                        Song Name
                                    </strong>{' '}
                                    |{' '}
                                    <small id="footer-song-artist">
                                        Artist
                                    </small>{' '}
                                    |{' '}
                                    <small id="footer-song-sample-rate">
                                        Sample Rate{' '}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
                <div className="column footer_control_column">
                    <div className="columns is-mobile is-centered footer_control_column_wrapper">
                        <div
                            className="column is-1 has-text-centered previous_song_wrapper footer_control_column_items"
                            //  onclick="axiosGetPreviousSong('{% url 'user_previous_song_capture' %}')"
                        >
                            {/* <ion-icon className="previous_icon" name="play-skip-back-circle-outline"></ion-icon>
                        <script async>
                            anime({
                                targets: '.previous_icon',
                                scale: 2,
                                color: "#FFFFFF",
                                duration: 1,
                                translateY: 2,
                                easing: 'linear',
                            })
                        </script> */}
                        </div>
                        <div
                            className="column is-1 is-offset-1 has-text-centered play_pause_wrapper footer_control_column_items"
                            // onclick="howlerJsPlayPause()"
                        >
                            {/* <ion-icon className="play_icon" id="play_icon"
                                  name="play-circle-outline"></ion-icon>
                        <ion-icon name="pause-circle-outline" id="pause_icon"
                                  className="pause_icon"></ion-icon>
                        <script async>
                            anime({
                                targets: '.play_icon, .pause_icon',
                                scale: 2,
                                color: "#FFFFFF",
                                duration: 1,
                                translateY: 2,
                                easing: 'linear',
                            })
                        </script> */}
                        </div>
                        <div
                            className="column is-1 is-offset-1 next_song_wrapper has-text-centered footer_control_column_items"
                            //  onclick="axiosGetRandomSong('{% url 'random_song_generator' %}')"
                        >
                            {/* <ion-icon className="skip_icon" name="play-skip-forward-circle-outline"></ion-icon>
                        <script async>
                            anime({
                                targets: '.skip_icon',
                                scale: 2,
                                color: "#FFFFFF",
                                duration: 1,
                                translateY: 2,
                                easing: 'linear',
                            })
                        </script> */}
                        </div>
                    </div>
                    <div className="columns is-mobile">
                        <div className="column is-narrow pre_input">0:00</div>
                        <div className="column ">
                            <div className="footer_input_anchor">
                                <progress
                                    id="slider_progress"
                                    className="progress is-small is-info"
                                    value="0"
                                    max="100"
                                />
                                <input
                                    id="transparent_slider"
                                    //    onchange="handleSliderInputChange(this.value)"
                                    //    oninput="handleSliderInputChange(this.value)"
                                    className="slider"
                                    step=".01"
                                    min="0"
                                    max="100"
                                    value="0"
                                    type="range"
                                />
                            </div>
                        </div>
                        <div
                            className="column is-narrow post_input"
                            id="total_duration"
                        >
                            0:00
                        </div>
                    </div>
                </div>
                <div className="column is-hidden-mobile is-3 ">
                    <div className="columns is-mobile volume_control_column">
                        <div className="column is-2 is-offset-2">
                            {/* <ion-icon className="volume__icon" name="volume-high-outline"></ion-icon> */}
                            {/* <script async>
                            anime({
                                targets: '.volume__icon',
                                color: '#FFFFFF',
                                translateY: -6,
                                translateX: 22,
                                scale: 1.5
                            })
                        </script> */}
                        </div>
                        <div className="column ">
                            <div className="volume_anchor">
                                <progress
                                    className="progress is-small volume_progress is-info"
                                    value="0"
                                    max="100"
                                />
                                <input
                                    className="slider volume_slider"
                                    // oninput="handleVolumeInputChange(this.value)"
                                    //    onchange="handleVolumeInputChange(this.value)"
                                    step="1"
                                    min="0"
                                    max="100"
                                    value="0"
                                    type="range"
                                />
                            </div>
                        </div>
                        <div className="column is-2 is-offset-1" />
                    </div>
                </div>
            </div>
        </footer>
    );
};
