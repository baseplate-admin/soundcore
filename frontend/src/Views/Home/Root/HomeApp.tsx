import voca from 'voca';
import axios from 'axios';
import { Howl } from 'howler';

import Tippy from '@tippyjs/react';
import { followCursor, animateFill } from 'tippy.js';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Fragment, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Navbar } from '../../../Components/App/Navbar/Navbar';
import { Footer } from '../../../Components/App/Footer/Footer';
import { LeftSidebar } from '../../../Components/App/LeftSidebar/LeftSidebar';

import { IoEllipsisVerticalSharp } from 'react-icons/io5';

import { APIPath } from '../../../Config/Api';
import { RoutingPath } from '../../../Config/Routes';
import { APIUrl, ApplicationName, MediaUrl } from '../../../Config/App';

import { useGetSongsQuery } from '../../../Store/Services/GetSong';
import { useAppDispatch } from '../../../Hooks/Store/Hooks';
import {
    updateCurrentSeconds,
    updateSongState,
    updateStatusToPlay,
    updateTotalSeconds,
} from '../../../Store/Slices/Footer';

import {
    randomSpinnerPicker,
    SpinnerComponent,
} from '../../../Components/Spinners/Spinners';

import { CreateHowlObject } from '../../../Functions/Helpers/Howler/CreateHowl';
import { randomEmoji } from '../../../Functions/Helpers/RandomPicker/RandomEmojis';
// import { MdPlaylistAdd } from 'react-icons/md';
import { IconColor } from '../../../Config/Colors/Icons';
import {
    Box,
    Columns,
    Dropdown,
    Element,
    Heading,
    Hero,
    Icon,
    Block,
    Button,
} from 'react-bulma-components';

export const HomePage = () => {
    // We dont need Polling For now
    // const { data, error, isLoading } = useGetSongsQuery(null, {
    //     pollingInterval: 1,
    // });

    let customInterval: ReturnType<typeof setInterval>;

    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [howlerState, setHowlerState] = useState<Array<Howl>>([]);

    const dropDownRefArray = useRef<Array<HTMLDivElement>>([]);

    const { data, isLoading } = useGetSongsQuery(null);

    const handleBoxMouseEnter = (index: number) => {
        const element = dropDownRefArray?.current[index];

        switch (element?.classList?.contains('is-invisible')) {
            default:
                element?.classList?.remove('is-invisible');
                break;
        }
    };

    const handleBoxMouseLeave = (index: number) => {
        const element = dropDownRefArray?.current[index];

        switch (element?.classList?.contains('is-invisible')) {
            default:
                element?.classList?.add('is-invisible');
                break;
        }
    };

    const handleBoxClick = (src: string, index: number) => {
        const newData = data?.[index];
        howlerJsPlay(src, newData);
    };

    const howlerJsPlay = (
        src: string,
        data: {
            song_name: string;
            artist: string;
            album_art: string;
            sample_rate: string;
        }
    ) => {
        const name: string = data?.song_name;
        const artist: string = data?.artist;
        const image: string = `${MediaUrl}${data?.album_art}`;
        const sampleRate: string = data?.sample_rate;

        if (howlerState.length === 0) {
            const sound = CreateHowlObject({ src });

            sound?.play();

            sound?.on('load', async () => {
                dispatch(updateTotalSeconds(sound?.duration()));
            });
            sound?.on('play', async () => {
                await howlerJsPlayInterval(sound, customInterval);
            });
            sound?.on('end', () => {
                howlerJsOnFinish();
            });

            setHowlerState([sound]);
            dispatch(updateSongState({ name, artist, image, sampleRate }));
            dispatch(updateStatusToPlay());
        } else {
            const previousSound: any = howlerState;
            previousSound[0]?.pause();
            setHowlerState([]);

            const sound = CreateHowlObject({ src });

            setHowlerState([sound]);

            sound?.play();

            sound?.on('load', async () => {
                dispatch(updateTotalSeconds(sound?.duration()));
            });
            sound?.on('play', async () => {
                await howlerJsPlayInterval(sound, customInterval);
            });
            sound?.on('end', async () => {
                howlerJsOnFinish();
            });

            dispatch(updateSongState({ name, artist, image, sampleRate }));
            dispatch(updateStatusToPlay());
        }
    };

    const howlerJsPlayInterval = async (
        sound: Howl,
        customInterval: ReturnType<typeof setInterval>
    ) => {
        const startInterval = async () => {
            customInterval = setInterval(async () => {
                if (sound?.playing()) {
                    let currentPos = sound?.seek();
                    dispatch(updateCurrentSeconds(Number(currentPos)));
                }
            }, 1000);
        };
        clearInterval(customInterval);
        await startInterval();
    };

    const howlerJsOnFinish = () => {
        dispatch(updateCurrentSeconds(0));
        clearInterval(customInterval);

        const url = `${APIUrl}${APIPath.RANDOM_SONG_ENDPOINT}`;

        axios.get(url).then((res: any) => {
            console.log(res);
            const song_name = res?.data?.song_name;
            const artist = res?.data?.artist;
            const album_art = res?.data?.album_art;
            const sample_rate = res?.data?.sample_rate;

            howlerJsPlay(`${MediaUrl}${res?.data?.song_file}`, {
                song_name,
                artist,
                album_art,
                sample_rate,
            });
        });
    };
    const addDropDownRef = (el: never) => {
        switch (!dropDownRefArray?.current?.includes(el)) {
            case true: {
                dropDownRefArray?.current?.push(el);
            }
        }
    };

    const mappedSong = data?.map((music: any, index: number) => {
        return (
            <Element
                key={index}
                className={classes?.['grid-item']}
                onMouseEnter={() => {
                    handleBoxMouseEnter(index);
                }}
                onMouseLeave={() => {
                    handleBoxMouseLeave(index);
                }}
            >
                <Box className={classes?.['grid-box']}>
                    <Element
                        renderAs="figure"
                        className="image"
                        onClick={() => {
                            handleBoxClick(
                                `${MediaUrl}${music?.song_file}`,
                                index
                            );
                        }}
                    >
                        <Element className="song-image preview">
                            <LazyLoadImage
                                src={`${MediaUrl}${music?.album_art}`}
                                effect="blur"
                                className={classes?.['song-image-figure']}
                                width={200}
                                height={200}
                            />
                        </Element>
                    </Element>
                    <Element className={classes?.['song-description']}>
                        <Columns
                            multiline={false}
                            style={{
                                width: 200,
                            }}
                            breakpoint="mobile"
                        >
                            <Columns.Column
                                size={11}
                                onClick={() => {
                                    handleBoxClick(
                                        `${MediaUrl}${music?.song_file}`,
                                        index
                                    );
                                }}
                            >
                                <Box
                                    style={{
                                        backgroundColor: 'transparent',
                                        paddingRight: 0,
                                    }}
                                >
                                    <Heading
                                        textSize={5}
                                        className={classes?.['song-title']}
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
                                                    ?.chain(music?.song_name)
                                                    ?.replace(',', ' | ')
                                                    ?.trimRight()
                                                    ?.truncate(20)
                                                    ?.value()}
                                            </span>
                                        </Tippy>
                                    </Heading>
                                    <Heading
                                        subtitle={true}
                                        textSize={6}
                                        className={classes?.['song-artist']}
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
                                    </Heading>
                                </Box>
                            </Columns.Column>

                            <Columns.Column size={1}>
                                <Columns multiline={false} centered={true}>
                                    <Columns.Column narrow={true}>
                                        <Dropdown
                                            right
                                            closeOnSelect={false}
                                            color="transparent"
                                            icon={
                                                <div
                                                    ref={addDropDownRef}
                                                    className="is-invisible"
                                                >
                                                    <Icon>
                                                        <IoEllipsisVerticalSharp
                                                            color={
                                                                IconColor?.WHITE_ICON
                                                            }
                                                            style={{
                                                                transform:
                                                                    'translateY(10px) scale(2) translateX(3px)',
                                                            }}
                                                        />
                                                    </Icon>
                                                </div>
                                            }
                                            label=""
                                        >
                                            <Dropdown.Item
                                                renderAs="a"
                                                value="item"
                                            ></Dropdown.Item>
                                        </Dropdown>
                                    </Columns.Column>
                                </Columns>
                            </Columns.Column>
                        </Columns>
                    </Element>
                </Box>
            </Element>
        );
    });

    return (
        <Fragment>
            <Helmet>
                <title> {ApplicationName ?? ''} | Home </title>
            </Helmet>
            <Navbar />
            <Columns
                breakpoint="mobile"
                className={classes?.main__body}
                multiline={false}
            >
                <Columns.Column
                    narrow={true}
                    className={classes?.left_menu_wrapper}
                >
                    <LeftSidebar />
                </Columns.Column>

                <Columns.Column className={classes?.['right-column']}>
                    <Element className={classes?.['grid-container']}>
                        {isLoading ? (
                            <Fragment>
                                <Hero size="large">
                                    <Hero.Body>
                                        <Heading subtitle={true}>
                                            <Columns
                                                centered={true}
                                                breakpoint="mobile"
                                            >
                                                <Columns.Column narrow={true}>
                                                    <SpinnerComponent
                                                        type={randomSpinnerPicker().toString()}
                                                    />
                                                </Columns.Column>
                                            </Columns>
                                            <Columns
                                                centered={true}
                                                breakpoint="mobile"
                                            >
                                                <Columns.Column narrow={true}>
                                                    <Block
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Loading. {randomEmoji()}
                                                    </Block>
                                                </Columns.Column>
                                            </Columns>
                                        </Heading>
                                    </Hero.Body>
                                </Hero>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {data ? (
                                    <Fragment>{mappedSong}</Fragment>
                                ) : (
                                    // If user is not logged in show a prompt to login
                                    <Fragment>
                                        <Hero size="large">
                                            <Hero.Body>
                                                <Columns
                                                    centered={true}
                                                    breakpoint="mobile"
                                                    multiline={false}
                                                >
                                                    <Columns.Column
                                                        narrow={true}
                                                    >
                                                        <Heading>
                                                            <Block>
                                                                <Heading
                                                                    style={{
                                                                        color: 'white',
                                                                    }}
                                                                >
                                                                    You are not
                                                                    logged in.
                                                                </Heading>
                                                            </Block>
                                                        </Heading>
                                                    </Columns.Column>
                                                </Columns>
                                                <Columns
                                                    centered={true}
                                                    breakpoint="mobile"
                                                    multiline={false}
                                                >
                                                    <Columns.Column
                                                        narrow={true}
                                                    >
                                                        <Heading subtitle>
                                                            <Button
                                                                color="transparent"
                                                                to={
                                                                    RoutingPath?.LOGIN_PAGE
                                                                }
                                                                renderAs={Link}
                                                            >
                                                                <Heading
                                                                    subtitle
                                                                >
                                                                    <Block className="has-text-link">
                                                                        Log-in?
                                                                    </Block>
                                                                </Heading>
                                                            </Button>
                                                        </Heading>
                                                    </Columns.Column>
                                                </Columns>
                                            </Hero.Body>
                                        </Hero>
                                    </Fragment>
                                )}
                            </Fragment>
                        )}
                    </Element>
                </Columns.Column>
            </Columns>
            <Footer howlerState={howlerState} />
        </Fragment>
    );
};

const useStyles = createUseStyles({
    main__body: {
        minHeight: 'calc(100vh - 140px) !important',
        marginBottom: '0',
        maxHeight: '1vh !important',
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
