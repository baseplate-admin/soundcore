import { createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState, MouseEvent, FormEvent, Fragment } from 'react';

import Tippy from '@tippyjs/react';
import { followCursor, animateFill } from 'tippy.js';

import voca from 'voca';
import numeral from 'numeral';
import { Howl, Howler } from 'howler';

import {
    IoPauseCircleOutline,
    IoPlaySkipBackCircleOutline,
    IoPlayCircleOutline,
    IoPlaySkipForwardCircleOutline,
    IoVolumeMedium,
    IoVolumeHigh,
    IoVolumeLow,
    IoVolumeOff,
    IoVolumeMute,
} from 'react-icons/io5';

import { humanizeSeconds } from '../../../Functions/Helpers/Prettifier/HumanizeTime';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/Hooks';
import {
    selectFooterState,
    updateStatusToPlay,
    updateStatusToPause,
    updateCurrentSeconds,
} from '../../../Store/Slices/Footer';
import {
    GetVolumeInLocalStorage,
    SetVolumeInLocalStorage,
} from '../../../Functions/Helpers/LocalStorage/HowlerVolume';
import {
    GetReversePlaybackStatus,
    SetReversePlaybackStatus,
} from '../../../Functions/Helpers/LocalStorage/IsPlaybackReversed';
import { IconColor } from '../../../Config/Colors/Icons';
import {
    Columns,
    Content,
    Image,
    Media,
    Block,
    Progress,
    Element,
} from 'react-bulma-components';

interface IFooterProps {
    howlerState: Howl[];
}

export const Footer = (props: IFooterProps) => {
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const footerState = useAppSelector(selectFooterState);

    const [songSeekTippyVisible, setSongSeekTippyVisible] = useState(false);
    const [songSeekTippyContent, setSongSeekTippyContent] = useState('');
    const [playbackTotalReversed, setPlaybackTotalReversed] = useState(
        GetReversePlaybackStatus()
    );

    const [volume, setVolume] = useState(
        // Need to multiply by hundred because we store it in a range from 0.0 to 1.0
        Number(GetVolumeInLocalStorage()) * 100
    );
    const [isMuted, setIsMuted] = useState(false);
    const [unmutedValue, setUnmutedValue] = useState(0);

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

                // If volume is 0 set volume to 10
                setIsMuted(true);
                setUnmutedValue(10);
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

    const isFullHD = useMediaQuery({
        query: '(max-width: 1408px)',
    });

    useEffect(() => {
        // Sync Volume and howler Volume
        Howler?.volume(Number(volume / 100));
    }, [volume]);

    const calcSliderPos = (e: MouseEvent<HTMLInputElement>) => {
        return (
            // Enhancement proposals:
            //      Get Max value from a slider. Currently we are hardcoding 100
            //      what if a slider has max value of 200?

            (e?.nativeEvent?.offsetX / e?.currentTarget?.clientWidth) *
            parseInt(JSON.stringify(100), 10)
        );
    };

    const handlePlayPauseClick = () => {
        // Create a new howler object
        const sound: Howl = props?.howlerState[0];

        // Song might be null if User didn't click anything
        switch (sound) {
            case undefined: {
                console.error('No song is playing');
                break;
            }
            default: {
                if (footerState?.song?.global?.playing && sound?.playing()) {
                    // Means playing
                    dispatch(updateStatusToPause());
                    sound?.pause();
                } else if (
                    !footerState?.song?.global?.playing &&
                    !sound?.playing()
                ) {
                    // Means paused
                    dispatch(updateStatusToPlay());
                    sound?.play();
                }
            }
        }
    };
    const handleSongSeekInputMouseMove = (e: MouseEvent<HTMLInputElement>) => {
        const sound: Howl = props?.howlerState[0];

        // Make the tippy container visible.

        switch (sound) {
            case undefined: {
                // console.log('No song is playing');
                break;
            }
            default: {
                const sliderPos: number = Number(calcSliderPos(e));
                const duration: number = footerState?.song?.control?.total; // Total seconds
                const math: number = (duration / 100) * sliderPos; // A little math function

                setSongSeekTippyContent(humanizeSeconds(math));
            }
        }
    };

    const handleSongSeekInputChange = (e: FormEvent<HTMLInputElement>) => {
        // Create a new howler object
        const sound: Howl = props?.howlerState[0];

        switch (sound) {
            case undefined: {
                // console.error('No song is playing'); // <- Too many console.log
                break;
            }
            default: {
                // Means playing
                const sliderValue = e?.currentTarget?.value;
                const duration =
                    (sound?.duration() * Number(sliderValue)) / 100;
                sound?.seek(duration);
                dispatch(updateCurrentSeconds(duration));
            }
        }
    };

    const handleVolumeSeekInputChange = (e: FormEvent<HTMLInputElement>) => {
        const value = e?.currentTarget?.value;

        setVolume(Number(value));
        SetVolumeInLocalStorage(Number(value) / 100);
    };

    const handleTotalTimeClick = () => {
        switch (playbackTotalReversed) {
            case true: {
                SetReversePlaybackStatus(false);
                setPlaybackTotalReversed(false);
                break;
            }
            case false: {
                SetReversePlaybackStatus(true);
                setPlaybackTotalReversed(true);
                break;
            }
        }
    };

    const handleVolumeSeekMouseMove = (e: MouseEvent<HTMLInputElement>) => {
        const value = calcSliderPos(e);
        switch (true) {
            case value >= 0 && value <= 100: {
                setVolumeSeekTippyContent(Math.round(Number(value)).toString());
            }
        }
    };
    const handleMuteIconClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!isMuted) {
            setUnmutedValue(volume);
            setIsMuted(true);
            setVolume(0);
        } else if (isMuted) {
            setVolume(unmutedValue);
            setIsMuted(false);
            setUnmutedValue(0);
        }
    };

    return (
        <Element renderAs="footer" className={classes?.footer_item}>
            <Columns breakpoint={'mobile'} multiline={false}>
                <Columns.Column
                    size={3}
                    className={classes?.footer_info_column}
                >
                    <Media renderAs="article">
                        <Media.Item align="left">
                            <Image
                                size={64}
                                className={
                                    classes?.song_image &&
                                    footerState?.song?.image
                                        ? ''
                                        : classes?.['opacity-hidden']
                                }
                                alt=""
                                src={footerState?.song?.image ?? ''}
                            />
                        </Media.Item>
                        <Media.Item>
                            <Content>
                                <Block className={classes?.footer_info}>
                                    {isMobile ? (
                                        // Mobile Version
                                        <Fragment>
                                            <Element
                                                renderAs="strong"
                                                className={
                                                    classes?.[
                                                        'footer-song-info'
                                                    ]
                                                }
                                            >
                                                {voca
                                                    ?.chain(
                                                        footerState?.song?.name
                                                    )
                                                    ?.replace(',', ' ')
                                                    ?.titleCase()
                                                    ?.trimRight()
                                                    ?.truncate(20)
                                                    ?.value()}
                                            </Element>
                                            <span
                                                className={
                                                    classes?.[
                                                        'footer-song-info'
                                                    ]
                                                }
                                            >
                                                {' | '}
                                            </span>
                                            <Element
                                                renderAs="small"
                                                className={
                                                    classes?.[
                                                        'footer-song-info'
                                                    ]
                                                }
                                            >
                                                {voca
                                                    ?.chain(
                                                        footerState?.song
                                                            ?.artist
                                                    )
                                                    ?.replace(',', ' ')
                                                    ?.titleCase()
                                                    ?.trimRight()
                                                    ?.truncate(35)
                                                    ?.value()}
                                            </Element>
                                            <span
                                                className={
                                                    classes?.[
                                                        'footer-song-info'
                                                    ]
                                                }
                                            >
                                                {' | '}
                                            </span>
                                            <Element
                                                renderAs="small"
                                                className={
                                                    classes?.[
                                                        'footer-song-info'
                                                    ]
                                                }
                                            >
                                                {numeral(
                                                    footerState?.song
                                                        ?.sampleRate
                                                )?.format('0 a')}
                                                Hz
                                            </Element>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {isTablet ? (
                                                // Tablet Version
                                                <Fragment>
                                                    <Tippy
                                                        content={voca
                                                            ?.chain(
                                                                footerState
                                                                    ?.song?.name
                                                            )
                                                            ?.replace(',', ' ')
                                                            ?.titleCase()
                                                            ?.trimRight()
                                                            ?.value()}
                                                        placement="top"
                                                        followCursor="horizontal"
                                                        animateFill={true}
                                                        plugins={[
                                                            animateFill,
                                                            followCursor,
                                                        ]}
                                                    >
                                                        <span>
                                                            <Element
                                                                renderAs="strong"
                                                                className={
                                                                    classes?.[
                                                                        'footer-song-info'
                                                                    ]
                                                                }
                                                            >
                                                                {voca
                                                                    ?.chain(
                                                                        footerState
                                                                            ?.song
                                                                            ?.name
                                                                    )
                                                                    ?.replace(
                                                                        ',',
                                                                        ' '
                                                                    )
                                                                    ?.titleCase()
                                                                    ?.trimRight()
                                                                    ?.truncate(
                                                                        10
                                                                    )
                                                                    ?.value()}
                                                            </Element>
                                                        </span>
                                                    </Tippy>
                                                    <Element
                                                        renderAs="span"
                                                        className={
                                                            classes?.[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {' | '}
                                                    </Element>
                                                    <Tippy
                                                        content={voca
                                                            ?.chain(
                                                                footerState
                                                                    ?.song
                                                                    ?.artist
                                                            )
                                                            ?.replace(',', ' ')
                                                            ?.titleCase()
                                                            ?.trimRight()
                                                            ?.value()}
                                                        placement="top"
                                                        followCursor="horizontal"
                                                        animateFill={true}
                                                        plugins={[
                                                            animateFill,
                                                            followCursor,
                                                        ]}
                                                    >
                                                        <span>
                                                            <Element
                                                                renderAs="small"
                                                                className={
                                                                    classes?.[
                                                                        'footer-song-info'
                                                                    ]
                                                                }
                                                            >
                                                                {voca
                                                                    ?.chain(
                                                                        footerState
                                                                            ?.song
                                                                            ?.artist
                                                                    )
                                                                    ?.replace(
                                                                        ',',
                                                                        ' '
                                                                    )
                                                                    ?.titleCase()
                                                                    ?.trimRight()
                                                                    ?.truncate(
                                                                        10
                                                                    )
                                                                    ?.value()}
                                                            </Element>
                                                        </span>
                                                    </Tippy>
                                                    <Element
                                                        renderAs="span"
                                                        className={
                                                            classes?.[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {' | '}
                                                    </Element>
                                                    <Element
                                                        renderAs="small"
                                                        className={
                                                            classes?.[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {numeral(
                                                            footerState?.song
                                                                ?.sampleRate
                                                        )?.format('0 a')}
                                                        Hz
                                                    </Element>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <Tippy
                                                        content={voca
                                                            ?.chain(
                                                                footerState
                                                                    ?.song?.name
                                                            )
                                                            ?.replace(',', ' ')
                                                            ?.titleCase()
                                                            ?.trimRight()
                                                            ?.value()}
                                                        followCursor="horizontal"
                                                        animateFill={true}
                                                        plugins={[
                                                            animateFill,
                                                            followCursor,
                                                        ]}
                                                    >
                                                        <span>
                                                            <Element
                                                                renderAs="strong"
                                                                className={
                                                                    classes?.[
                                                                        'footer-song-info'
                                                                    ]
                                                                }
                                                            >
                                                                {voca
                                                                    ?.chain(
                                                                        footerState
                                                                            ?.song
                                                                            ?.name
                                                                    )
                                                                    ?.replace(
                                                                        ',',
                                                                        ' '
                                                                    )
                                                                    ?.titleCase()
                                                                    ?.trimRight()
                                                                    ?.truncate(
                                                                        30
                                                                    )
                                                                    ?.value()}
                                                            </Element>
                                                        </span>
                                                    </Tippy>
                                                    <Element
                                                        renderAs="span"
                                                        className={
                                                            classes?.[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {' | '}
                                                    </Element>
                                                    <Tippy
                                                        content={voca
                                                            ?.chain(
                                                                footerState
                                                                    ?.song
                                                                    ?.artist
                                                            )
                                                            ?.replace(',', ' ')
                                                            ?.titleCase()
                                                            ?.trimRight()
                                                            ?.value()}
                                                        followCursor="horizontal"
                                                        animateFill={true}
                                                        plugins={[
                                                            animateFill,
                                                            followCursor,
                                                        ]}
                                                    >
                                                        <span>
                                                            <Element
                                                                renderAs="small"
                                                                className={
                                                                    classes?.[
                                                                        'footer-song-info'
                                                                    ]
                                                                }
                                                            >
                                                                {voca
                                                                    ?.chain(
                                                                        footerState
                                                                            ?.song
                                                                            .artist
                                                                    )
                                                                    ?.replace(
                                                                        ',',
                                                                        ' '
                                                                    )
                                                                    ?.titleCase()
                                                                    ?.trimRight()
                                                                    ?.truncate(
                                                                        35
                                                                    )
                                                                    ?.value()}
                                                            </Element>
                                                        </span>
                                                    </Tippy>
                                                    <span
                                                        className={
                                                            classes?.[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {' | '}
                                                    </span>
                                                    <Element
                                                        renderAs="small"
                                                        className={
                                                            classes?.[
                                                                'footer-song-info'
                                                            ]
                                                        }
                                                    >
                                                        {numeral(
                                                            footerState?.song
                                                                ?.sampleRate
                                                        )?.format('0 a')}
                                                        Hz
                                                    </Element>
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}
                                </Block>
                            </Content>
                        </Media.Item>
                    </Media>
                </Columns.Column>
                <Columns.Column className={classes?.footer_control_column}>
                    <Columns
                        breakpoint="mobile"
                        centered={true}
                        multiline={false}
                        className={classes?.footer_control_column_wrapper}
                    >
                        <Columns.Column
                            size={1}
                            className={classes?.footer_control_column_items}
                            //  onclick="axiosGetPreviousSong('{% url 'user_previous_song_capture' %}')"
                        >
                            <Tippy
                                content={
                                    <Element renderAs="span">
                                        Previous Song
                                    </Element>
                                }
                                animateFill={true}
                                plugins={[animateFill]}
                                placement="top"
                            >
                                <span>
                                    <IoPlaySkipBackCircleOutline
                                        color={IconColor?.NORMAL_ICON}
                                        style={{ transform: 'scale(2)' }}
                                    />
                                </span>
                            </Tippy>
                        </Columns.Column>

                        <Columns.Column
                            size={1}
                            offset={1}
                            className={classes?.footer_control_column_items}
                        >
                            {footerState?.song?.global?.playing ? (
                                <Fragment>
                                    <Tippy
                                        content={
                                            <Element renderAs="span">
                                                Play
                                            </Element>
                                        }
                                        animateFill={true}
                                        plugins={[animateFill]}
                                        placement="top"
                                    >
                                        <span>
                                            <IoPauseCircleOutline
                                                color={IconColor?.NORMAL_ICON}
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
                                        content={
                                            <Element renderAs="span">
                                                Pause
                                            </Element>
                                        }
                                        animateFill={true}
                                        plugins={[animateFill]}
                                        placement="top"
                                    >
                                        <span>
                                            <IoPlayCircleOutline
                                                color={IconColor?.NORMAL_ICON}
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
                        </Columns.Column>
                        <Columns.Column
                            size={1}
                            offset={1}
                            className={classes?.footer_control_column_items}
                            //  onclick="axiosGetRandomSong('{% url 'random_song_generator' %}')"
                        >
                            <Tippy
                                content={
                                    <Element renderAs="span">Next Song</Element>
                                }
                                animateFill={true}
                                plugins={[animateFill]}
                                placement="top"
                            >
                                <span>
                                    <IoPlaySkipForwardCircleOutline
                                        color={IconColor?.NORMAL_ICON}
                                        style={{ transform: 'scale(2)' }}
                                    />
                                </span>
                            </Tippy>
                        </Columns.Column>
                    </Columns>
                    <Columns
                        breakpoint="mobile"
                        centered={true}
                        multiline={false}
                    >
                        <Columns.Column
                            size={
                                isMobile ? 2 : isTablet ? 2 : isFullHD ? 2 : 1
                            }
                            className={classes?.pre_input}
                            textSize={7}
                        >
                            <Tippy
                                content="Current Seconds"
                                animateFill={true}
                                followCursor="horizontal"
                                plugins={[animateFill, followCursor]}
                                offset={[0, 0]}
                            >
                                <span>
                                    {humanizeSeconds(
                                        footerState?.song?.control?.current
                                    )}
                                </span>
                            </Tippy>
                        </Columns.Column>
                        <Columns.Column
                            onMouseEnter={() => {
                                setSongSeekTippyVisible(true);
                            }}
                            onMouseLeave={() => {
                                setSongSeekTippyVisible(false);
                            }}
                        >
                            <Element className={classes?.footer_input_anchor}>
                                <Tippy
                                    offset={[0, -10]}
                                    content={
                                        <span>{songSeekTippyContent}</span>
                                    }
                                    visible={songSeekTippyVisible}
                                    followCursor="horizontal"
                                    animateFill={true}
                                    plugins={[followCursor, animateFill]}
                                    placement="top"
                                >
                                    <Element renderAs="span">
                                        <Fragment>
                                            <Progress
                                                size="small"
                                                color="info"
                                                className={`${classes?.footer_input_anchor_progress} ${classes?.progress_item}`}
                                                value={
                                                    // Is Footer Has Song and its NaN show 0
                                                    isNaN(
                                                        (100 *
                                                            footerState?.song
                                                                ?.control
                                                                ?.current) /
                                                            footerState?.song
                                                                ?.control?.total
                                                    )
                                                        ? 0
                                                        : (100 *
                                                              footerState?.song
                                                                  ?.control
                                                                  ?.current) /
                                                          footerState?.song
                                                              ?.control?.total
                                                }
                                                max={100}
                                            />
                                            <input
                                                onChange={
                                                    handleSongSeekInputChange
                                                }
                                                onInput={
                                                    handleSongSeekInputChange
                                                }
                                                onMouseMove={
                                                    handleSongSeekInputMouseMove
                                                }
                                                className={`${classes?.slider} ${classes?.footer_input_anchor_input}`}
                                                step={0.01}
                                                min={0}
                                                max={100}
                                                value={
                                                    isNaN(
                                                        (100 *
                                                            footerState?.song
                                                                ?.control
                                                                ?.current) /
                                                            footerState?.song
                                                                ?.control?.total
                                                    )
                                                        ? 0
                                                        : (100 *
                                                              footerState?.song
                                                                  ?.control
                                                                  ?.current) /
                                                          footerState?.song
                                                              ?.control?.total
                                                }
                                                type="range"
                                            />
                                        </Fragment>
                                    </Element>
                                </Tippy>
                            </Element>
                        </Columns.Column>
                        <Columns.Column
                            textSize={7}
                            size={
                                isMobile ? 3 : isTablet ? 2 : isFullHD ? 2 : 1
                            }
                            className={classes?.post_input}
                        >
                            <Tippy
                                offset={[0, 0]}
                                content="Total Seconds"
                                followCursor="horizontal"
                                animateFill={true}
                                plugins={[followCursor, animateFill]}
                                placement="top"
                            >
                                <span onClick={handleTotalTimeClick}>
                                    {playbackTotalReversed ? (
                                        // True and show -0:01
                                        <Fragment>
                                            {'- '}
                                            {humanizeSeconds(
                                                footerState?.song?.control
                                                    ?.total -
                                                    footerState?.song?.control
                                                        ?.current
                                            ) ?? ''}
                                        </Fragment>
                                    ) : (
                                        // False and show normally
                                        <Fragment>
                                            {humanizeSeconds(
                                                footerState?.song?.control
                                                    ?.total
                                            ) ?? ''}
                                        </Fragment>
                                    )}
                                </span>
                            </Tippy>
                        </Columns.Column>
                    </Columns>
                </Columns.Column>
                <Columns.Column size={3} mobile={{ display: 'hidden' }}>
                    <Columns
                        multiline={false}
                        breakpoint="mobile"
                        className={classes?.volume_control_column}
                    >
                        <Columns.Column size={2} offset={2}>
                            <Columns
                                multiline={false}
                                centered={true}
                                breakpoint="mobile"
                                className="columns is-centered"
                            >
                                <Columns.Column
                                    narrow={true}
                                    style={{
                                        transform: 'translateY(-0.5em)',
                                    }}
                                >
                                    <Tippy
                                        content={
                                            <Element renderAs="span">
                                                {isMuted ? 'Unmute' : 'Mute'}
                                            </Element>
                                        }
                                        animateFill={true}
                                        plugins={[animateFill]}
                                        placement="left"
                                        offset={[-3, 10]}
                                    >
                                        <span onClick={handleMuteIconClick}>
                                            {showHighVolume &&
                                            !showMediumVolume &&
                                            !showLowVolume &&
                                            !showVolumeOff &&
                                            !showMute ? (
                                                <IoVolumeHigh
                                                    style={{
                                                        transform: 'scale(1.5)',
                                                    }}
                                                    color={
                                                        IconColor?.NORMAL_ICON
                                                    }
                                                />
                                            ) : showMediumVolume &&
                                              !showHighVolume &&
                                              !showLowVolume &&
                                              !showVolumeOff &&
                                              !showMute ? (
                                                <IoVolumeMedium
                                                    style={{
                                                        transform: 'scale(1.5)',
                                                    }}
                                                    color={
                                                        IconColor?.NORMAL_ICON
                                                    }
                                                />
                                            ) : showLowVolume &&
                                              !showHighVolume &&
                                              !showMediumVolume &&
                                              !showVolumeOff &&
                                              !showMute ? (
                                                <IoVolumeLow
                                                    style={{
                                                        transform: 'scale(1.5)',
                                                    }}
                                                    color={
                                                        IconColor?.NORMAL_ICON
                                                    }
                                                />
                                            ) : showVolumeOff &&
                                              !showHighVolume &&
                                              !showMediumVolume &&
                                              !showLowVolume &&
                                              !showMute ? (
                                                <IoVolumeOff
                                                    style={{
                                                        transform: 'scale(1.5)',
                                                    }}
                                                    color={
                                                        IconColor?.NORMAL_ICON
                                                    }
                                                />
                                            ) : !showHighVolume &&
                                              !showMediumVolume &&
                                              !showLowVolume &&
                                              !showVolumeOff &&
                                              showMute ? (
                                                <IoVolumeMute
                                                    style={{
                                                        transform: 'scale(1.5)',
                                                    }}
                                                    color={
                                                        IconColor?.NORMAL_ICON
                                                    }
                                                />
                                            ) : (
                                                <Fragment></Fragment>
                                            )}
                                        </span>
                                    </Tippy>
                                </Columns.Column>
                            </Columns>
                        </Columns.Column>
                        <Columns.Column>
                            <Element
                                className={classes?.volume_anchor}
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
                                    followCursor="horizontal"
                                    animateFill={true}
                                    offset={[0, -10]}
                                    plugins={[followCursor, animateFill]}
                                    placement="top"
                                >
                                    <span>
                                        <Progress
                                            size="small"
                                            color="info"
                                            className={`${classes?.volume_progress} ${classes?.progress_item}`}
                                            value={volume}
                                            max={100}
                                        />
                                        <input
                                            className={`${classes?.slider} ${classes?.volume_slider}  slider`}
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
                            </Element>
                        </Columns.Column>
                        <Columns.Column size={2} offset={1} />
                    </Columns>
                </Columns.Column>
            </Columns>
        </Element>
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
        height: '60px !important',
        width: '60px !important',
    },

    'footer-song-info': {
        color: 'white',
        opacity: 0.85,
    },

    pre_input: {
        transform: 'translateY(-5px)',
        color: 'white',
        opacity: 0.85,
        userSelect: 'none',
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
        cursor: 'pointer',
        position: 'absolute',
        transform: 'translateY(-4px) !important',
    },

    post_input: {
        transform: 'translateY(-5px)',
        color: 'white',
        opacity: 0.85,
        userSelect: 'none',
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
        textAlign: 'center',

        '@media screen and (max-width: 767px)': {
            width: '50px !important',
        },
    },
    progress_item: {
        backgroundColor: '#91979d !important',
        height: '0.35rem !important',
        transform: 'translateY(1px) !important',
    },
    'opacity-hidden': {
        opacity: '0.0 !important',
    },
});
