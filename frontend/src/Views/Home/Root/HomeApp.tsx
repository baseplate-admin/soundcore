import { Fragment, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Navbar } from '../../../Components/App/Navbar/Navbar';
import { Footer } from '../../../Components/App/Footer/Footer';
import { LeftSidebar } from '../../../Components/App/LeftSidebar/LeftSidebar';

import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { ApplicationName, MediaUrl, RoutingPath } from '../../../Routes';
import { useGetSongsQuery } from '../../../Store/Services/GetSongService';
import { useAppDispatch } from '../../../Hooks/Store/Hooks';
import { Howl } from 'howler';
import { Link } from 'react-router-dom';
import {
    updateSongState,
    updateStatusToPlay,
} from '../../../Store/Slices/FooterSlice';
import { createUseStyles } from 'react-jss';

export const HomePage = () => {
    // We dont need Polling For now
    // const { data, error, isLoading } = useGetSongsQuery(null, {
    //     pollingInterval: 1,
    // });

    const classes = useStyles();

    const dispatch = useAppDispatch();
    const [howlerState, setHowlerState] = useState<Array<Object>>([]);

    const dropDownRefArray = useRef<Array<HTMLDivElement>>([]);
    const dropDownElipsisIconArray = useRef<Array<HTMLSpanElement>>([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error, isLoading } = useGetSongsQuery(null);

    const addDropDownRef = (el: never) => {
        if (el && !dropDownRefArray.current.includes(el)) {
            dropDownRefArray.current.push(el);
        }
    };

    const addDropDownIconRef = (el: never) => {
        if (el && !dropDownElipsisIconArray.current.includes(el)) {
            dropDownElipsisIconArray.current.push(el);
        }
    };

    const handleBoxMouseEnter = (id: number) => {
        if (
            dropDownElipsisIconArray.current[id].classList.contains('is-hidden')
        ) {
            dropDownElipsisIconArray.current[id].classList.remove('is-hidden');
        }
    };
    const handleBoxMouseLeave = (id: number) => {
        if (
            !dropDownElipsisIconArray.current[id].classList.contains(
                'is-hidden'
            )
        ) {
            dropDownElipsisIconArray.current[id].classList.add('is-hidden');
        }
        if (dropDownRefArray.current[id].classList.contains('is-active')) {
            dropDownRefArray.current[id].classList.remove('is-active');
        }
    };

    const handleDropdownItemClick = (id: number) => {
        if (!dropDownRefArray.current[id].classList.contains('is-active')) {
            dropDownRefArray.current[id].classList.add('is-active');
        }
    };

    const handleBoxClick = (src: string, index: number) => {
        const name: string = data[index].song_name;
        const artist: string = data[index].artist;
        const image: string = `${MediaUrl}${data[index].album_art}`;
        const sampleRate: string = data[index].sample_rate;

        if (howlerState.length === 0) {
            const sound = new Howl({
                src: src,
                html5: true,
                preload: true,
                autoplay: false,
            });
            sound.play();

            setHowlerState([sound]);
            dispatch(updateSongState({ name, artist, image, sampleRate }));
            dispatch(updateStatusToPlay());
        } else {
            const previousSound: any = howlerState;
            previousSound[0].pause();
            setHowlerState([]);

            const sound = new Howl({
                src: src,
                html5: true,
                preload: true,
                autoplay: false,
            });
            sound.play();
            setHowlerState([sound]);
            dispatch(updateSongState({ name, artist, image, sampleRate }));
            dispatch(updateStatusToPlay());
        }
    };

    return (
        <Fragment>
            <Helmet>
                <title> {ApplicationName} </title>
            </Helmet>
            <Navbar />
            <div className={`columns is-mobile ${classes.main__body}`}>
                <div
                    className={`column is-narrow ${classes.left_menu_wrapper}`}
                >
                    <LeftSidebar />
                </div>
                <div className={`column ${classes['right-column']}`}>
                    <div className={classes['grid-container']}>
                        {isLoading ? (
                            <Fragment></Fragment>
                        ) : (
                            <Fragment>
                                {data ? (
                                    <Fragment>
                                        {data.map(
                                            (music: any, index: number) => {
                                                return (
                                                    <div
                                                        className={
                                                            classes['grid-item']
                                                        }
                                                    >
                                                        <div
                                                            className={`box ${classes['grid-box']}`}
                                                            onMouseEnter={() => {
                                                                handleBoxMouseEnter(
                                                                    index
                                                                );
                                                            }}
                                                            onMouseLeave={() => {
                                                                handleBoxMouseLeave(
                                                                    index
                                                                );
                                                            }}
                                                            onClick={() => {
                                                                handleBoxClick(
                                                                    `${MediaUrl}${music.song_file}`,
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <figure className="image song-image-figure">
                                                                <div className="song-image preview">
                                                                    <LazyLoadImage
                                                                        src={`${MediaUrl}${music.album_art}`}
                                                                        effect="blur"
                                                                        className={
                                                                            classes[
                                                                                'song-image-figure'
                                                                            ]
                                                                        }
                                                                        width={
                                                                            200
                                                                        }
                                                                        height={
                                                                            200
                                                                        }
                                                                    />
                                                                </div>
                                                            </figure>
                                                            <div
                                                                className={
                                                                    classes[
                                                                        'song-description'
                                                                    ]
                                                                }
                                                            >
                                                                <div
                                                                    className="columns is-mobile"
                                                                    style={{
                                                                        width: 200,
                                                                    }}
                                                                >
                                                                    <div className="column is-11 ">
                                                                        <div
                                                                            className="box"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    'transparent',
                                                                                paddingRight: 0,
                                                                            }}
                                                                        >
                                                                            <p
                                                                                className={`title is-size-5 ${classes['song-title']}`}
                                                                            >
                                                                                {
                                                                                    music.song_name
                                                                                }
                                                                            </p>
                                                                            <p
                                                                                className={`subtitle is-size-6 ${classes['song-artist']}`}
                                                                            >
                                                                                {
                                                                                    music.artist
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="column is-1">
                                                                        <div
                                                                            ref={
                                                                                addDropDownRef
                                                                            }
                                                                            className="dropdown is-right"
                                                                        >
                                                                            <div
                                                                                className="dropdown-trigger"
                                                                                style={{
                                                                                    paddingTop: 16,
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    ref={
                                                                                        addDropDownIconRef
                                                                                    }
                                                                                    onClick={() => {
                                                                                        handleDropdownItemClick(
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                    className="is-hidden"
                                                                                >
                                                                                    <IoEllipsisVerticalSharp color="white" />
                                                                                </span>
                                                                            </div>
                                                                            <div
                                                                                className="dropdown-menu"
                                                                                role="menu"
                                                                            >
                                                                                <div
                                                                                    className="dropdown-content"
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            '#161616',
                                                                                    }}
                                                                                >
                                                                                    <div
                                                                                        className="dropdown-item"
                                                                                        style={{
                                                                                            color: '#e0e0ec',
                                                                                        }}
                                                                                    />
                                                                                    <div
                                                                                        className="dropdown-item"
                                                                                        style={{
                                                                                            color: '#e0e0ec',
                                                                                        }}
                                                                                    />

                                                                                    {/* <!--<hr className="dropdown-divider">--> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {/* If user is not logged in show a prompt to login */}
                                        <section className="hero is-large">
                                            <div className="hero-body">
                                                <div className="columns is-mobile is-centered">
                                                    <div className="column is-narrow">
                                                        <div className="title">
                                                            <p>
                                                                You are not
                                                                logged in.
                                                            </p>
                                                        </div>
                                                        <div className="columns is-mobile is-centered">
                                                            <div className="column is-narrow">
                                                                <div className="subtitle">
                                                                    <Link
                                                                        to={
                                                                            RoutingPath.LOGIN_PAGE
                                                                        }
                                                                    >
                                                                        Log-in?
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </Fragment>
                                )}
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
            <Footer howlerState={howlerState} />
        </Fragment>
    );
};

const useStyles = createUseStyles({
    main__body: {
        minHeight: 'calc(100vh - 140px)',
        marginBottom: '0',
        maxHeight: '1vh',
    },
    left_menu_wrapper: {
        transform: 'translateY(-12px)',
    },

    'right-column': {
        backgroundColor: '#060606',
        transform: 'translateX(-12px)',
        overflowX: 'hidden',
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    },
    'grid-container': {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(12em, 1fr))',
        gap: '1em',
        paddingTop: '1em',
    },
    'grid-item': {
        fontSize: 30,
        display: 'flex',
        justifyContent: 'center',
    },
    'grid-box': {
        backgroundColor: 'transparent',
        color: 'white',
    },
    'song-image-figure': {
        height: '200px !important',
        width: '200px !important',
    },
    'song-description': {
        backgroundColor: 'transparent',
    },
    'song-title': {
        whiteSpace: 'nowrap',
        width: '8em',
        height: '1.3em',
        color: '#e0e0ec',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    'song-artist': {
        whiteSpace: 'nowrap',
        width: '8em',
        height: '1.3em',
        color: '#a1a1a2',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
});
