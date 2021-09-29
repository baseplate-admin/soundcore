import voca from 'voca';

import Tippy from '@tippyjs/react';
import { followCursor, animateFill } from 'tippy.js';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Fragment, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Navbar } from '../../../Components/App/Navbar/Navbar';
import { Footer } from '../../../Components/App/Footer/Footer';
import { LeftSidebar } from '../../../Components/App/LeftSidebar/LeftSidebar';

import { IoEllipsisVerticalSharp } from 'react-icons/io5';

import { RoutingPath } from '../../../Config/Routes';
import { ApplicationName, MediaUrl } from '../../../Config/App';

import { useGetSongsQuery } from '../../../Store/Redux/Services/GetSong';

import {
    randomSpinnerPicker,
    SpinnerComponent,
} from '../../../Components/Spinners/Spinners';

import { randomEmoji } from '../../../Functions/RandomPicker/RandomEmojis';
import { MdPlaylistAdd } from 'react-icons/md';
import { IconColor } from '../../../Config/Colors/Icons';
import { useHowler } from '../../../Hooks/Howler/Hooks';

export const HomePage = () => {
    const classes = useStyles();

    const { CreateHowl, howlerArray } = useHowler();

    const dropDownRefArray = useRef<Array<HTMLDivElement>>([]);
    const dropDownElipsisIconArray = useRef<Array<HTMLSpanElement>>([]);

    const { data, isLoading } = useGetSongsQuery(null);

    const addDropDownRef = (el: never) => {
        switch (!dropDownRefArray?.current?.includes(el)) {
            case true: {
                dropDownRefArray?.current?.push(el);
            }
        }
    };

    const addDropDownIconRef = (el: never) => {
        switch (!dropDownElipsisIconArray?.current?.includes(el)) {
            case true: {
                dropDownElipsisIconArray?.current?.push(el);
            }
        }
    };

    const handleBoxMouseEnter = (id: number) => {
        switch (true) {
            case dropDownElipsisIconArray?.current[id]?.classList?.contains(
                'is-hidden'
            ): {
                dropDownElipsisIconArray?.current[id]?.classList?.remove(
                    'is-hidden'
                );
            }
        }
    };
    const handleBoxMouseLeave = (id: number) => {
        if (
            !dropDownElipsisIconArray?.current[id]?.classList?.contains(
                'is-hidden'
            )
        ) {
            dropDownElipsisIconArray?.current[id]?.classList?.add('is-hidden');
        }
        if (dropDownRefArray?.current[id]?.classList?.contains('is-active')) {
            dropDownRefArray?.current[id]?.classList?.remove('is-active');
        }
    };

    const handleDropdownItemClick = (id: number) => {
        switch (true) {
            case !dropDownRefArray?.current[id]?.classList?.contains(
                'is-active'
            ): {
                dropDownRefArray?.current[id]?.classList?.add('is-active');
            }
        }
    };

    const handleBoxClick = (index: number) => {
        const newData = data?.[index];
        howlerJsPlay(newData);
    };

    const dropdownItem = useSpring({});

    const howlerJsPlay = (data: {
        song_name: string;
        artist: string;
        album_art: string;
        sample_rate: string;
        song_file: string;
    }) => {
        if (howlerArray.length !== 0) {
            // Stop the last song and remove it
            howlerArray[0]?.stop();
            howlerArray?.shift();
        }
        const name: string = data?.song_name ?? '';
        const artist: string = data?.artist ?? '';
        const image: string = `${MediaUrl}${data?.album_art}` ?? '';
        const sampleRate: string = data?.sample_rate ?? '';
        const src: string = `${MediaUrl}${data?.song_file}`;

        CreateHowl({
            data: { name, artist, image, sampleRate, src },
        });
    };

    const mappedSong = data?.map((music: any, index: number) => {
        return (
            <Fragment>
                <div key={index} className={classes?.['grid-item']}>
                    <div
                        className={`box ${classes?.['grid-box']}`}
                        onMouseEnter={() => {
                            handleBoxMouseEnter(index);
                        }}
                        onMouseLeave={() => {
                            handleBoxMouseLeave(index);
                        }}
                    >
                        <figure
                            className="image song-image-figure"
                            onClick={() => {
                                handleBoxClick(index);
                            }}
                        >
                            <div className="song-image preview">
                                <LazyLoadImage
                                    src={`${MediaUrl}${music?.album_art}`}
                                    effect="blur"
                                    className={classes?.['song-image-figure']}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </figure>
                        <div className={classes?.['song-description']}>
                            <div
                                className="columns is-mobile"
                                style={{
                                    width: 200,
                                }}
                            >
                                <div
                                    className="column is-11"
                                    onClick={() => {
                                        handleBoxClick(index);
                                    }}
                                >
                                    <div
                                        className="box"
                                        style={{
                                            backgroundColor: 'transparent',
                                            paddingRight: 0,
                                        }}
                                    >
                                        <p
                                            className={`title is-size-5 ${classes?.['song-title']}`}
                                        >
                                            <Tippy
                                                content={voca
                                                    ?.chain(music?.song_name)
                                                    ?.replace(',', ' ')
                                                    ?.trimRight()
                                                    ?.value()}
                                                placement="top"
                                                animateFill={true}
                                                followCursor="horizontal"
                                                plugins={[
                                                    animateFill,
                                                    followCursor,
                                                ]}
                                            >
                                                <span>
                                                    {voca
                                                        ?.chain(
                                                            music?.song_name
                                                        )
                                                        ?.replace(',', ' | ')
                                                        ?.trimRight()
                                                        ?.truncate(20)
                                                        ?.value()}
                                                </span>
                                            </Tippy>
                                        </p>
                                        <p
                                            className={`subtitle is-size-6 ${classes?.['song-artist']}`}
                                        >
                                            <Tippy
                                                content={voca
                                                    ?.chain(music?.artist)
                                                    ?.trim()
                                                    ?.replace(',', ' | ')
                                                    ?.titleCase()
                                                    ?.trimRight()
                                                    ?.value()}
                                                animateFill={true}
                                                placement="bottom"
                                                followCursor="horizontal"
                                                plugins={[
                                                    animateFill,
                                                    followCursor,
                                                ]}
                                            >
                                                <span>
                                                    {voca
                                                        ?.chain(music?.artist)
                                                        ?.replace(',', ' | ')
                                                        ?.trim()
                                                        ?.titleCase()
                                                        ?.trimRight()
                                                        ?.truncate(19)
                                                        ?.value()}
                                                </span>
                                            </Tippy>
                                        </p>
                                    </div>
                                </div>
                                <div className="column is-1">
                                    <div
                                        ref={addDropDownRef}
                                        className="dropdown is-right"
                                    >
                                        <div
                                            className="dropdown-trigger"
                                            style={{
                                                paddingTop: 16,
                                            }}
                                        >
                                            <span
                                                ref={addDropDownIconRef}
                                                onClick={() => {
                                                    handleDropdownItemClick(
                                                        index
                                                    );
                                                }}
                                                className="is-hidden"
                                            >
                                                <IoEllipsisVerticalSharp
                                                    color={
                                                        IconColor?.WHITE_ICON
                                                    }
                                                />
                                            </span>
                                        </div>
                                        <animated.div
                                            style={dropdownItem}
                                            className="dropdown-menu"
                                            role="menu"
                                        >
                                            <div
                                                className="dropdown-content"
                                                style={{
                                                    backgroundColor: '#161616',
                                                }}
                                            >
                                                <div
                                                    className="dropdown-item"
                                                    style={{
                                                        color: '#e0e0ec',
                                                    }}
                                                >
                                                    <div className="columns is-centered">
                                                        <div className="column is-mobile is-narrow">
                                                            <table
                                                                className="table"
                                                                style={{
                                                                    backgroundColor:
                                                                        'transparent',
                                                                }}
                                                            >
                                                                <tbody>
                                                                    <tr>
                                                                        <th>
                                                                            <MdPlaylistAdd
                                                                                color={
                                                                                    IconColor?.WHITE_ICON
                                                                                }
                                                                                style={{
                                                                                    transform:
                                                                                        'scale(2)',
                                                                                }}
                                                                            />
                                                                        </th>
                                                                        <th>
                                                                            <p
                                                                                style={{
                                                                                    color: '#e0e0ec',
                                                                                }}
                                                                                className="subtitle is-size-6"
                                                                            >
                                                                                Save
                                                                                to
                                                                                playlist
                                                                            </p>
                                                                        </th>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="dropdown-item"
                                                    style={{
                                                        color: '#e0e0ec',
                                                    }}
                                                />

                                                {/* <!--<hr className="dropdown-divider">--> */}
                                            </div>
                                        </animated.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    });

    return (
        <Fragment>
            <Helmet>
                <title> {ApplicationName} </title>
            </Helmet>
            <Navbar />
            <div className={`columns is-mobile ${classes?.main__body}`}>
                <div
                    className={`column is-narrow ${classes?.left_menu_wrapper}`}
                >
                    <LeftSidebar />
                </div>
                <div className={`column ${classes?.['right-column']}`}>
                    <div className={classes?.['grid-container']}>
                        {isLoading ? (
                            <Fragment>
                                <section className="hero is-large">
                                    <div className="hero-body">
                                        <p className="subtitle">
                                            <div className="columns is-centered">
                                                <div className="column is-mobile is-narrow">
                                                    <SpinnerComponent
                                                        type={randomSpinnerPicker().toString()}
                                                    />
                                                </div>
                                            </div>
                                            <div className="columns is-centered">
                                                <div className="column is-mobile is-narrow">
                                                    <p
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Loading. {randomEmoji()}
                                                    </p>
                                                </div>
                                            </div>
                                        </p>
                                    </div>
                                </section>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {data ? (
                                    <Fragment>{mappedSong}</Fragment>
                                ) : (
                                    // If user is not logged in show a prompt to login
                                    <Fragment>
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
                                                                            RoutingPath?.LOGIN_PAGE
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
            <Footer />
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
        gap: '1.3em',
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
