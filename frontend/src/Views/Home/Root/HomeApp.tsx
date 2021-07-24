import { Fragment, useRef } from 'react';
import { Helmet } from 'react-helmet';

import './scss/HomeApp.scss';
import './scss/HomeApp.responsive.scss';

import { Navbar } from '../../../Components/App/Navbar/Navbar';
import { Footer } from '../../../Components/App/Footer/Footer';
import { LeftSidebar } from '../../../Components/App/LeftSidebar/LeftSidebar';

import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { ApplicationName, MediaUrl } from '../../../Routes';
import { useGetSongsQuery } from '../../../Store/Services/GetSongService';
import {
    ExtractArtistName,
    ExtractSongName,
    getAlbumArtFromUrl,
} from '../../../Functions/Helpers/ExtractSongMetadata';

export const HomePage = () => {
    // const { data, error, isLoading } = useGetSongsQuery(null, {
    //     pollingInterval: 1,
    // });
    const imageRefArray = useRef<Array<HTMLDivElement>>([]);
    const artistRefArray = useRef<Array<HTMLDivElement>>([]);
    const songRefArray = useRef<Array<HTMLDivElement>>([]);
    const dropDownRefArray = useRef<Array<HTMLDivElement>>([]);
    const dropDownElipsisIconArray = useRef<Array<HTMLSpanElement>>([]);

    const { data, error, isLoading } = useGetSongsQuery(null);

    // data.music <-- File

    const addImageRef = (el: never) => {
        if (el && !imageRefArray.current.includes(el)) {
            imageRefArray.current.push(el);
        }
    };

    const addArtistRef = (el: never) => {
        if (el && !artistRefArray.current.includes(el)) {
            artistRefArray.current.push(el);
        }
    };

    const addSongRef = (el: never) => {
        if (el && !songRefArray.current.includes(el)) {
            songRefArray.current.push(el);
        }
    };

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
        // if (dropDownRefArray.current[id].classList.contains('is-hidden')) {
        //     dropDownRefArray.current[id].classList.remove('is-hidden');
        // }
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
                                                getAlbumArtFromUrl(
                                                    `${MediaUrl}${music.music}`,
                                                    index,
                                                    imageRefArray
                                                );
                                                ExtractArtistName(
                                                    `${MediaUrl}${music.music}`,
                                                    artistRefArray,
                                                    index
                                                );
                                                ExtractSongName(
                                                    `${MediaUrl}${music.music}`,
                                                    songRefArray,
                                                    index
                                                );

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
                                                        >
                                                            <figure className="image song-image-figure">
                                                                <div
                                                                    className="song-image preview"
                                                                    ref={
                                                                        addImageRef
                                                                    }
                                                                />
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
                                                                            <p
                                                                                className="title is-size-5 song-title"
                                                                                ref={
                                                                                    addSongRef
                                                                                }
                                                                            ></p>
                                                                            <p
                                                                                ref={
                                                                                    addArtistRef
                                                                                }
                                                                                className="subtitle is-size-6 song-artist"
                                                                            ></p>
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
                                    <Fragment>{error}</Fragment>
                                )}
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};
