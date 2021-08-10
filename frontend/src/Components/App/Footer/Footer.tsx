import { createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';
import React, { Fragment, useEffect, useState } from 'react';

import Tippy from '@tippyjs/react';
import { followCursor, animateFill } from 'tippy.js';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';

import voca from 'voca';
import numeral from 'numeral';
import { Howl, Howler } from 'howler';

import {
    IoPauseCircleOutline,
    IoPlaySkipBackCircleOutline,
    IoPlayCircleOutline,
    IoPlaySkipForwardCircleOutline,
    IoVolumeMedium,
} from 'react-icons/io5';

import { prettifySecondsToMinutes } from '../../../Functions/Helpers/Prettifier/TimeFunction';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/Hooks';
import {
    selectFooterState,
    updateStatusToPlay,
    updateStatusToPause,
    updateCurrentSeconds,
} from '../../../Store/Slices/FooterSlice';
import {
    GetVolumeInLocalStorage,
    SetVolumeInLocalStorage,
} from '../../../Functions/Helpers/LocalStorage/HowlerVolume';
import {
    MdVolumeDown,
    MdVolumeMute,
    MdVolumeOff,
    MdVolumeUp,
} from 'react-icons/md';

interface IFooterProps {
    howlerState: Array<Howl>;
}

export const Footer = (props: IFooterProps) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const footerState = useAppSelector(selectFooterState);

    const [songSeekTippyVisible, setSongSeekTippyVisible] = useState(false);
    const [songSeekTippyContent, setSongSeekTippyContent] = useState('');

    const [volume, setVolume] = useState(
        // Need to multiply by hundred because we store it in a range from 0.0 to 1.0
        Number(GetVolumeInLocalStorage()) * 100
    );

    const [volumeSeekTippyVisible, setVolumeSeekTippyVisible] = useState(false);
    const [volumeSeekTippyContent, setVolumeSeekTippyContent] = useState('');

    // Every thing down here is for volume control
    const [showHighVolume, setShowHighVolume] = useState(false);
    const [showMediumVolume, setShowMediumVolume] = useState(false);
    const [showLowVolume, setShowLowVolume] = useState(false);
    const [showVolumeOff, setShowVolumeOff] = useState(false);
    const [showMute, setShowMute] = useState(false);

    useEffect(() => {
        switch (true) {
            case volume > 75 && volume <= 100: {
                setShowHighVolume(true);
                setShowMediumVolume(false);
                setShowLowVolume(false);
                setShowVolumeOff(false);
                setShowMute(false);
                break;
            }
            case volume > 50 && volume <= 75: {
                setShowHighVolume(false);
                setShowMediumVolume(true);
                setShowLowVolume(false);
                setShowVolumeOff(false);
                setShowMute(false);
                break;
            }
            case volume > 25 && volume <= 50: {
                setShowHighVolume(false);
                setShowMediumVolume(false);
                setShowLowVolume(true);
                setShowVolumeOff(false);
                setShowMute(false);
                break;
            }
            case volume > 0 && volume <= 25: {
                setShowHighVolume(false);
                setShowMediumVolume(false);
                setShowLowVolume(false);
                setShowVolumeOff(true);
                setShowMute(false);
                break;
            }
            case volume === 0: {
                setShowHighVolume(false);
                setShowMediumVolume(false);
                setShowLowVolume(false);
                setShowVolumeOff(false);
                setShowMute(true);
                break;
            }
        }
    }, [volume]);

    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });

    const isTablet = useMediaQuery({
        query: '(max-width: 768px)',
    });

    useEffect(() => {
        // Sync Volume and howler Volume
        Howler.volume(Number(GetVolumeInLocalStorage()));
    }, [volume]);

    const calcSliderPos = (e: React.MouseEvent<HTMLInputElement>) => {
        return (
            // Enhancement proposals:
            //      Get Max value from a slider. Currently we are hardcoding 100
            //      what if a slider has max value of 200?

            (e.nativeEvent.offsetX / e.currentTarget.clientWidth) *
            parseInt(JSON.stringify(100), 10)
        );
    };

    const handlePlayPauseClick = () => {
        // Create a new howler object
        const sound: Howl = props.howlerState[0];

        // Song might be null if User didn't click anything
        switch (sound) {
            case undefined: {
                console.error('No song is playing');
                break;
            }
            default: {
                if (footerState.song.global.playing && sound?.playing()) {
                    // Means playing
                    dispatch(updateStatusToPause());
                    sound?.pause();
                } else if (
                    !footerState.song.global.playing &&
                    !sound?.playing()
                ) {
                    // Means paused
                    dispatch(updateStatusToPlay());
                    sound?.play();
                }
            }
        }
    };
    const handleSongSeekInputMouseMove = (
        e: React.MouseEvent<HTMLInputElement>
    ) => {
        const sound: Howl = props.howlerState[0];

        // Make the tippy container visible.
        switch (sound) {
            case undefined: {
                console.log('No song is playing');
                break;
            }
            default: {
                const sliderPos: number = Number(calcSliderPos(e));
                const duration: number = footerState.song.control.total; // Total seconds
                const math: number = (duration / 100) * sliderPos; // A little math function

                setSongSeekTippyContent(prettifySecondsToMinutes(math));
            }
        }
    };

    const handleSongSeekInputChange = (
        e: React.FormEvent<HTMLInputElement>
    ) => {
        // Create a new howler object
        const sound: Howl = props.howlerState[0];

        switch (sound) {
            case undefined: {
                // console.error('No song is playing'); // <- Too many console.log
                break;
            }
            default: {
                // Means playing
                const sliderValue = e.currentTarget.value;
                const duration =
                    (sound?.duration() * Number(sliderValue)) / 100;
                sound?.seek(duration);
                dispatch(updateCurrentSeconds(duration));
            }
        }
    };

    const handleVolumeSeekInputChange = (
        e: React.FormEvent<HTMLInputElement>
    ) => {
        const value = e.currentTarget.value;

        setVolume(Number(value));
        SetVolumeInLocalStorage(Number(value) / 100);
    };

    const handleVolumeSeekMouseMove = (
        e: React.MouseEvent<HTMLInputElement>
    ) => {
        const value = calcSliderPos(e);
        switch (true) {
            case value >= 0 && value <= 100: {
                setVolumeSeekTippyContent(Math.round(Number(value)).toString());
            }
        }
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
                            <Tippy
                                content={<span>Previous Song</span>}
                                animateFill={true}
                                plugins={[animateFill]}
                            >
                                <span>
                                    <IoPlaySkipBackCircleOutline
                                        color="white"
                                        style={{ transform: 'scale(2)' }}
                                    />
                                </span>
                            </Tippy>
                        </div>
                        <div
                            className={`column is-1 has-text-centered is-offset-1 ${classes.footer_control_column_items}`}
                        >
                            {footerState.song.global.playing ? (
                                <Fragment>
                                    <Tippy
                                        content={<span>Play</span>}
                                        animateFill={true}
                                        plugins={[animateFill]}
                                    >
                                        <span>
                                            <IoPauseCircleOutline
                                                color="white"
                                                style={{
                                                    transform: 'scale(2)',
                                                }}
                                                onClick={() => {
                                                    handlePlayPauseClick();
                                                }}
                                            />
                                        </span>
                                    </Tippy>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Tippy
                                        content={<span>Pause</span>}
                                        animateFill={true}
                                        plugins={[animateFill]}
                                    >
                                        <span>
                                            <IoPlayCircleOutline
                                                color="white"
                                                style={{
                                                    transform: 'scale(2)',
                                                }}
                                                onClick={() => {
                                                    handlePlayPauseClick();
                                                }}
                                            />
                                        </span>
                                    </Tippy>
                                </Fragment>
                            )}
                        </div>
                        <div
                            className={`column is-1 has-text-centered is-offset-1 ${classes.footer_control_column_items}`}
                            //  onclick="axiosGetRandomSong('{% url 'random_song_generator' %}')"
                        >
                            <Tippy
                                content={<span>Next Song</span>}
                                animateFill={true}
                                plugins={[animateFill]}
                            >
                                <span>
                                    <IoPlaySkipForwardCircleOutline
                                        color="white"
                                        style={{ transform: 'scale(2)' }}
                                    />
                                </span>
                            </Tippy>
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
                        <div
                            className="column"
                            onMouseEnter={() => {
                                setSongSeekTippyVisible(true);
                            }}
                            onMouseLeave={() => {
                                setSongSeekTippyVisible(false);
                            }}
                        >
                            <div className={classes.footer_input_anchor}>
                                <Tippy
                                    offset={[0, -10]}
                                    content={
                                        <span>{songSeekTippyContent}</span>
                                    }
                                    visible={songSeekTippyVisible}
                                    followCursor={'horizontal'}
                                    animateFill={true}
                                    plugins={[followCursor, animateFill]}
                                >
                                    <span>
                                        <progress
                                            className={`progress is-small is-info ${classes.footer_input_anchor_progress} ${classes.progress_item}`}
                                            value={
                                                (100 *
                                                    footerState.song.control
                                                        .current) /
                                                footerState.song.control.total
                                            }
                                            max="100"
                                        />
                                        <input
                                            onChange={handleSongSeekInputChange}
                                            onInput={handleSongSeekInputChange}
                                            onMouseMove={
                                                handleSongSeekInputMouseMove
                                            }
                                            className={`${classes.slider} ${classes.footer_input_anchor_input} slider`}
                                            step={0.01}
                                            min={0}
                                            max={100}
                                            value={
                                                (100 *
                                                    footerState.song.control
                                                        .current) /
                                                footerState.song.control.total
                                            }
                                            type="range"
                                        />
                                    </span>
                                </Tippy>
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
                            {showHighVolume &&
                            !showMediumVolume &&
                            !showLowVolume &&
                            !showVolumeOff &&
                            !showMute ? (
                                <MdVolumeUp />
                            ) : showMediumVolume &&
                              !showHighVolume &&
                              !showLowVolume &&
                              !showVolumeOff &&
                              !showMute ? (
                                <IoVolumeMedium />
                            ) : showLowVolume &&
                              !showHighVolume &&
                              !showMediumVolume &&
                              !showVolumeOff &&
                              !showMute ? (
                                <MdVolumeDown />
                            ) : showVolumeOff &&
                              !showHighVolume &&
                              !showMediumVolume &&
                              !showLowVolume &&
                              !showMute ? (
                                <MdVolumeMute />
                            ) : !showHighVolume &&
                              !showMediumVolume &&
                              !showLowVolume &&
                              !showVolumeOff &&
                              showMute ? (
                                <MdVolumeOff />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="column">
                            <div
                                className={classes.volume_anchor}
                                onMouseEnter={() => {
                                    setVolumeSeekTippyVisible(true);
                                }}
                                onMouseLeave={() => {
                                    setVolumeSeekTippyVisible(false);
                                }}
                            >
                                <Tippy
                                    content={
                                        <span>{volumeSeekTippyContent}</span>
                                    }
                                    visible={volumeSeekTippyVisible}
                                    followCursor={'horizontal'}
                                    animateFill={true}
                                    offset={[0, -10]}
                                    plugins={[followCursor, animateFill]}
                                >
                                    <span>
                                        <progress
                                            className={`progress is-small is-info ${classes.volume_progress} ${classes.progress_item}`}
                                            value={volume}
                                            max="100"
                                        />
                                        <input
                                            className={`${classes.slider} ${classes.volume_slider}  slider`}
                                            onInput={
                                                handleVolumeSeekInputChange
                                            }
                                            onChange={
                                                handleVolumeSeekInputChange
                                            }
                                            onMouseMove={
                                                handleVolumeSeekMouseMove
                                            }
                                            step={1}
                                            min={0}
                                            max={100}
                                            value={volume}
                                            type="range"
                                        />
                                    </span>
                                </Tippy>
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
