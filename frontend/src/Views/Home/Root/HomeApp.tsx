import { Fragment, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './scss/HomeApp.scss';
import './scss/HomeApp.responsive.scss';

import { Navbar } from '../../../Components/App/Navbar/Navbar';
import { Footer } from '../../../Components/App/Footer/Footer';
import { LeftSidebar } from '../../../Components/App/LeftSidebar/LeftSidebar';

import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { ApplicationName, MediaUrl, RoutingPath } from '../../../Routes';
import { useGetSongsQuery } from '../../../Store/Services/GetSongService';
import { useAppDispatch } from '../../../Hooks/Store/Hooks';
import { Howl } from 'howler';
import { Link } from 'react-router-dom';
import { updatePlayStatus } from '../../../Store/Slices/FooterSlice';

export const HomePage = () => {
    // const { data, error, isLoading } = useGetSongsQuery(null, {
    //     pollingInterval: 1,
    // });
    const dispatch = useAppDispatch();
    const [howlerState, setHowlerState] = useState<Array<Object>>([]);

    const dropDownRefArray = useRef<Array<HTMLDivElement>>([]);
    const dropDownElipsisIconArray = useRef<Array<HTMLSpanElement>>([]);

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

    const handleBoxClick = (src: string) => {
        if (howlerState.length === 0) {
            const sound = new Howl({
                src: src,
                html5: true,
                preload: true,
                autoplay: false,
            });
            sound.play();
            setHowlerState([sound]);
            dispatch(updatePlayStatus());
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
        }
    };

    return (
        <Fragment>
            <Helmet>
                <title> {ApplicationName} </title>
            </Helmet>
            <Navbar />
            <div className="columns is-mobile main__body">
                <div className="column is-narrow left_menu_wrapper">
                    <LeftSidebar />
                </div>
                <div className="column right-column">
                    <div className="grid-container">
                        {isLoading ? (
                            <Fragment></Fragment>
                        ) : (
                            <Fragment>
                                {data ? (
                                    <Fragment>
                                        {data.map(
                                            (music: any, index: number) => {
                                                return (
                                                    <div className="grid-item">
                                                        <div
                                                            className="box grid-box"
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
                                                                    `${MediaUrl}${music.song_file}`
                                                                );
                                                            }}
                                                        >
                                                            <figure className="image song-image-figure">
                                                                <div className="song-image preview">
                                                                    <LazyLoadImage
                                                                        src={`${MediaUrl}${music.album_art}`}
                                                                        effect="blur"
                                                                        className="song-image-figure"
                                                                        width={
                                                                            200
                                                                        }
                                                                        height={
                                                                            200
                                                                        }
                                                                    />
                                                                </div>
                                                            </figure>
                                                            <div className="song-description">
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
                                                                            <p className="title is-size-5 song-title">
                                                                                {
                                                                                    music.song_name
                                                                                }
                                                                            </p>
                                                                            <p className="subtitle is-size-6 song-artist">
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
                                                                            className="dropdown is-right "
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
                                                                                    <IoEllipsisVerticalSharp
                                                                                        color="white"
                                                                                        className="dropdown__icon"
                                                                                    />
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
