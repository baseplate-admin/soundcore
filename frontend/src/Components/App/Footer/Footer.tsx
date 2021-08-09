import { createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';
import { Fragment, useEffect, useState } from 'react';

import voca from 'voca';
import numeral from 'numeral';

import {
    IoPauseCircleOutline,
    IoPlaySkipBackCircleOutline,
    IoPlayCircleOutline,
    IoPlaySkipForwardCircleOutline,
} from 'react-icons/io5';

import { prettifySecondsToMinutes } from '../../../Functions/Helpers/Prettifier/TimeFunction';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/Hooks';
import {
    selectFooterState,
    updateStatusToPlay,
    updateStatusToPause,
} from '../../../Store/Slices/FooterSlice';
import { Howler } from 'howler';
import {
    GetVolumeInLocalStorage,
    SetVolumeInLocalStorage,
} from '../../../Functions/Helpers/LocalStorage/HowlerVolume';

interface IFooterProps {
    howlerState: Array<object>;
}

export const Footer = (props: IFooterProps) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const [volume, setVolume] = useState(
        // Need to multiply by hundred because we store it in a range from 0.0 to 1.0
        Number(GetVolumeInLocalStorage()) * 100
    );

    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });

    const isTablet = useMediaQuery({
        query: '(max-width: 768px)',
    });

    const footerState = useAppSelector(selectFooterState);

    const handlePlayPauseClick = () => {
        // Create a new howler object
        let sound: any = props.howlerState[0];
        // Song might be null if User didn't click anything
        if (sound !== undefined) {
            if (footerState.song.global.playing && sound.playing()) {
                // Means playing
                dispatch(updateStatusToPause());
                sound.pause();
            } else if (!footerState.song.global.playing && !sound.playing()) {
                // Means paused
                dispatch(updateStatusToPlay());
                sound.play();
            }
        }
    };

    useEffect(() => {
        // Sync Volume and howler Volume
        Howler.volume(Number(GetVolumeInLocalStorage()));
    }, [volume]);

    const handleVolumeInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setVolume(Number(e.currentTarget.value));
        SetVolumeInLocalStorage(Number(e.currentTarget.value) / 100);
    };

    return (
        <footer className={classes.footer_item}>
            <div className="columns is-mobile footer_column">
                <div className={`column is-3 ${classes.footer_info_column}`}>
                    <article className="media">
                        <figure className="media-left">
                            <p className="image is-64x64">
                                <img
                                    id="footer-song-image"
                                    className={classes.song_image}
                                    alt=""
                                    src={footerState.song.image}
                                />
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p className={classes.footer_info}>
                                    {isMobile ? (
                                        // Mobile Version
                                        <Fragment>
                                            <strong
                                                className={
                                                    classes['footer-song-info']
                                                }
                                            >
                                                {voca
                                                    .chain(
                                                        footerState.song.name
                                                    )
                                                    .trimRight()
                                                    .truncate(20)
                                                    .value()}
                                            </strong>
                                            <span
                                                className={
                                                    classes['footer-song-info']
                                                }
                                            >
                                                {' | '}
                                            </span>
                                            <small
                                                className={
                                                    classes['footer-song-info']
                                                }
                                            >
                                                {voca
                                                    .chain(
                                                        footerState.song.artist
                                                    )
                                                    .titleCase()
                                                    .trimRight()
                                                    .truncate(35)
                                                    .value()}
                                            </small>
                                            <span
                                                className={
                                                    classes['footer-song-info']
                                                }
                                            >
                                                {' | '}
                                            </span>
                                            <small
                                                className={
                                                    classes['footer-song-info']
                                                }
                                            >
                                                {numeral(
                                                    footerState.song.sampleRate
                                                ).format('0 a')}
                                                Hz
                                            </small>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {isTablet ? (
                                                // Tablet Version
                                                <Fragment>
                                                    <strong
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {voca
                                                            .chain(
                                                                footerState.song
                                                                    .name
                                                            )
                                                            .trimRight()
                                                            .truncate(10)
                                                            .value()}
                                                    </strong>
                                                    <span
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {' | '}
                                                    </span>
                                                    <small
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {voca
                                                            .chain(
                                                                footerState.song
                                                                    .artist
                                                            )
                                                            .titleCase()
                                                            .trimRight()
                                                            .truncate(10)
                                                            .value()}
                                                    </small>
                                                    <span
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {' | '}
                                                    </span>
                                                    <small
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {numeral(
                                                            footerState.song
                                                                .sampleRate
                                                        ).format('0 a')}
                                                        Hz
                                                    </small>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <strong
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {voca
                                                            .chain(
                                                                footerState.song
                                                                    .name
                                                            )
                                                            .trimRight()
                                                            .truncate(30)
                                                            .value()}
                                                    </strong>
                                                    <span
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {' | '}
                                                    </span>
                                                    <small
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {voca
                                                            .chain(
                                                                footerState.song
                                                                    .artist
                                                            )
                                                            .titleCase()
                                                            .trimRight()
                                                            .truncate(35)
                                                            .value()}
                                                    </small>
                                                    <span
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {' | '}
                                                    </span>
                                                    <small
                                                        className={
                                                            classes[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {numeral(
                                                            footerState.song
                                                                .sampleRate
                                                        ).format('0 a')}
                                                        Hz
                                                    </small>
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
                <div className={`column ${classes.footer_control_column}`}>
                    <div
                        className={`columns is-mobile is-centered ${classes.footer_control_column_wrapper}`}
                    >
                        <div
                            className={`column is-1 has-text-centered ${classes.footer_control_column_items}`}
                            //  onclick="axiosGetPreviousSong('{% url 'user_previous_song_capture' %}')"
                        >
                            <IoPlaySkipBackCircleOutline
                                color="white"
                                style={{ transform: 'scale(2)' }}
                            />
                        </div>
                        <div
                            className={`column is-1 has-text-centered is-offset-1 ${classes.footer_control_column_items}`}
                        >
                            {footerState.song.global.playing ? (
                                <IoPauseCircleOutline
                                    color="white"
                                    style={{ transform: 'scale(2)' }}
                                    onClick={() => {
                                        handlePlayPauseClick();
                                    }}
                                />
                            ) : (
                                <IoPlayCircleOutline
                                    color="white"
                                    style={{ transform: 'scale(2)' }}
                                    onClick={() => {
                                        handlePlayPauseClick();
                                    }}
                                />
                            )}
                        </div>
                        <div
                            className={`column is-1 has-text-centered is-offset-1 ${classes.footer_control_column_items}`}
                            //  onclick="axiosGetRandomSong('{% url 'random_song_generator' %}')"
                        >
                            <IoPlaySkipForwardCircleOutline
                                color="white"
                                style={{ transform: 'scale(2)' }}
                            />
                        </div>
                    </div>
                    <div className="columns is-mobile">
                        <div
                            className={`column is-narrow ${classes.pre_input}`}
                        >
                            {prettifySecondsToMinutes(
                                footerState.song.control.current
                            )}
                        </div>
                        <div className="column ">
                            <div className={classes.footer_input_anchor}>
                                <progress
                                    className={`progress is-small is-info ${classes.footer_input_anchor_progress} ${classes.progress_item}`}
                                    value={
                                        (100 *
                                            footerState.song.control.current) /
                                        footerState.song.control.total
                                    }
                                    max="100"
                                />
                                <input
                                    //    onchange="handleSliderInputChange(this.value)"
                                    //    oninput="handleSliderInputChange(this.value)"
                                    className={`${classes.slider} ${classes.footer_input_anchor_input} slider`}
                                    step=".01"
                                    min="0"
                                    max="100"
                                    value={
                                        (100 *
                                            footerState.song.control.current) /
                                        footerState.song.control.total
                                    }
                                    type="range"
                                />
                            </div>
                        </div>
                        <div
                            className={`column is-narrow ${classes.post_input}`}
                        >
                            {prettifySecondsToMinutes(
                                footerState.song.control.total
                            )}
                        </div>
                    </div>
                </div>
                <div className="column is-hidden-mobile is-3 ">
                    <div
                        className={`columns is-mobile ${classes.volume_control_column}`}
                    >
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
                            <div className={classes.volume_anchor}>
                                <progress
                                    className={`progress is-small is-info ${classes.volume_progress} ${classes.progress_item}`}
                                    value={volume}
                                    max="100"
                                />
                                <input
                                    className={`${classes.slider} ${classes.volume_slider}  slider`}
                                    onInput={handleVolumeInputChange}
                                    onChange={handleVolumeInputChange}
                                    step="1"
                                    min="0"
                                    max="100"
                                    value={volume}
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

const useStyles = createUseStyles({
    footer_item: {
        backgroundColor: '#161616',

        '@media screen and (max-width: 767px)': {
            position: 'absolute',
            bottom: '0px',
            left: '0',
            right: '0',
            height: '120px',
        },
    },
    slider: {
        WebkitAppearance: 'none',
        width: '100%',
        height: '15px',
        borderRadius: '5px',
        background: 'transparent',
        outline: 'none',

        '&::-webkit-slider-thumb': {
            WebkitAppearance: 'none',
            appearance: 'none',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            background: '#485fc7',
            cursor: 'pointer',
        },

        '&::-moz-range-thumb': {
            width: '15px',
            height: '15px',
            border: 'black',
            borderRadius: '50%',
            background: '#485fc7',
            cursor: 'pointer',
        },
    },

    footer_info_column: {
        marginLeft: '3vw',
    },

    song_image: {
        height: '60px',
        width: '60px',
    },

    'footer-song-info': {
        color: 'white',
        opacity: 0.85,
    },

    pre_input: {
        transform: 'translateY(-9px)',
        color: 'white',
        opacity: 0.85,
    },

    footer_input_anchor: {
        position: 'relative',
    },

    footer_input_anchor_progress: {
        position: 'absolute',
        width: '98%',
        transform: 'translateX(1%)',
    },

    footer_input_anchor_input: {
        position: 'absolute',
        transform: 'translateY(-4px) !important',
    },

    post_input: {
        transform: 'translateY(-9px)',
        color: 'white',
        opacity: 0.85,
    },

    volume_control_column: {
        transform: 'translateY(40px)',
    },

    volume_anchor: {
        position: 'relative',
    },

    volume_progress: {
        position: 'absolute',
        width: '98%',
        transform: 'translateX(2%)',
    },

    volume_slider: {
        position: 'absolute',
        transform: 'translateY(-4px)',
    },
    footer_control_column_wrapper: {
        '@media screen and (max-width: 767px)': {
            transform: 'translateY(7px)',
        },
    },
    footer_control_column: {
        '@media screen and (max-width: 767px)': {
            marginRight: '1em !important',
        },
    },

    footer_info: {
        '@media screen and (max-width: 767px)': {
            position: 'absolute',
            bottom: '10px',
            maxHeight: '3em',
        },
    },

    footer_control_column_items: {
        '@media screen and (max-width: 767px)': {
            width: '50px !important',
        },
    },
    progress_item: {
        height: '0.35rem !important',
        transform: 'translateY(1px) !important',
    },
});
