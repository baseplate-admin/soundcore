import voca from 'voca';
import { useMediaQuery } from 'react-responsive';
import { useSpring, animated } from 'react-spring';

import Tippy from '@tippyjs/react';
import { followCursor, animateFill } from 'tippy.js';

import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../../Hooks/Responsive/Hooks';

import { useAuthLogout } from '../../../Hooks/Auth/LogoutHook';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/Hooks';
import { RoutingPath } from '../../../Config/Routes';
import {
    leftMenuHidden,
    leftMenuShown,
    selectLeftMenuState,
} from '../../../Store/Redux/Slices/Navbar';
import { Fragment, useState } from 'react';
import { useGetUserQuery } from '../../../Store/Redux/Services/GetUser';
import { GetImageFromLibravatarByEmail } from '../../../Functions/Libravatar/GetImage';
import {
    IoLogOutOutline,
    IoMenuOutline,
    IoSearchOutline,
} from 'react-icons/io5';

import profilePlaceholder from '../../../Assets/Images/placeholder-90x90.png';
import brandLogo from '../../../Assets/Images/brand_logo.png';
import { IconColor } from '../../../Config/Colors/Icons';

export const Navbar = () => {
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const leftMenuState = useAppSelector(selectLeftMenuState);

    const [Logout] = useAuthLogout();
    const { data, isLoading } = useGetUserQuery(null);

    const { width } = useWindowDimensions();

    const [imageDropdownShown, setImageDropdownShown] = useState(false);

    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });

    const isTablet = useMediaQuery({
        query: '(max-width: 768px)',
    });

    const isFullHD = useMediaQuery({
        query: '(max-width: 1408px)',
    });

    const isConsoleEnabled = useMediaQuery({
        query: '(max-width: 1420px)',
    });

    const handleHamburgerIconClick = () => {
        // Always returns true
        if (!leftMenuState?.isHidden) {
            dispatch(leftMenuShown());
        } else if (leftMenuState?.isHidden) {
            dispatch(leftMenuHidden());
        }
    };

    const imageDropDownItem = useSpring({
        height: imageDropdownShown ? 180 : 0,
        opacity: imageDropdownShown ? 1 : 0.0,
        width: isMobile
            ? (width * 53) / 100
            : isTablet
            ? (width * 30) / 100
            : isFullHD
            ? (width * 25) / 100
            : (width * 15) / 100, // 53vw Mobile | 30vw Tablet | 25vw Low Res Display | 15vw High Res Display
    });

    const handleLogout = () => {
        Logout();
    };

    return (
        <Fragment>
            <div className={`columns is-mobile is-centered ${classes?.navbar}`}>
                <div
                    className="column is-narrow
"
                >
                    <div className="columns is-mobile is-centered">
                        <table
                            className="table"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <div
                                            className={
                                                classes?.items_translated_nav
                                            }
                                        >
                                            <IoMenuOutline
                                                color={IconColor?.WHITE_ICON}
                                                onClick={() => {
                                                    handleHamburgerIconClick();
                                                }}
                                                style={{
                                                    transform:
                                                        'scale(2) translateX(8px) translateY(2px)',
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        {/* If mobile Hide the Brand Logo */}
                                        {/* Else Show empty div  */}
                                        {isMobile ? (
                                            <Fragment></Fragment>
                                        ) : (
                                            <div
                                                className={
                                                    classes?.image_wrapper
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes?.items_translated_nav
                                                    }
                                                >
                                                    <img
                                                        src={brandLogo ?? ''}
                                                        alt={
                                                            brandLogo ??
                                                            'brand_logo'
                                                        }
                                                        width="112"
                                                        height="28"
                                                    ></img>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="column"></div>
                <div className="column is-two-fifths">
                    <div className={classes?.items_translated_nav}>
                        <div className="field">
                            <div
                                className={`control has-icons-left has-icons-right ${classes?.input_item_reverse_translate}`}
                            >
                                <input
                                    className={`input ${classes?.input_item}`}
                                    type="text"
                                    placeholder="Search "
                                />
                                <span className="icon is-small is-left"></span>
                                <span className="icon is-small is-right">
                                    <IoSearchOutline
                                        color={IconColor?.WHITE_ICON}
                                        style={{
                                            transform: 'scale(1.5)',
                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column"></div>
                {isLoading ? (
                    <figure
                        className="image is-48x48"
                        style={{
                            transform: 'translateX(-20px) translateY(15px)',
                        }}
                    >
                        <img
                            className="is-rounded"
                            src={profilePlaceholder ?? ''}
                            alt={profilePlaceholder ?? 'profile_picture'}
                        />
                    </figure>
                ) : (
                    <Fragment>
                        {data === undefined ? (
                            <div className="column is-narrow">
                                <div
                                    className={`${classes?.items_translated_nav}`}
                                >
                                    <Link
                                        className={`button is-rounded ${classes?.button}`}
                                        to={RoutingPath?.LOGIN_PAGE}
                                    >
                                        Log in
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="column is-narrow">
                                <div className="dropdown is-right is-active">
                                    <figure
                                        className="image is-48x48 dropdown-trigger"
                                        style={{
                                            transform:
                                                'translateX(-10px) translateY(2px)',
                                        }}
                                    >
                                        <img
                                            onClick={() => {
                                                setImageDropdownShown(
                                                    (v) => !v
                                                );
                                            }}
                                            className="is-rounded"
                                            alt="profile_picture"
                                            src={GetImageFromLibravatarByEmail(
                                                data?.email
                                            )}
                                        />
                                    </figure>

                                    <div className="dropdown-menu" role="menu">
                                        <animated.div
                                            style={imageDropDownItem}
                                            className={`dropdown-content ${classes?.dropdown_content}`}
                                        >
                                            <div
                                                className={`dropdown-item ${classes?.['dropdown-item']}`}
                                                style={{
                                                    display: imageDropdownShown
                                                        ? ''
                                                        : 'none',
                                                }}
                                            >
                                                <div className="columns is-mobile">
                                                    <div className="column is-narrow ">
                                                        <figure className="image">
                                                            <img
                                                                alt="profile_picture"
                                                                src={GetImageFromLibravatarByEmail(
                                                                    data?.email
                                                                )}
                                                            />
                                                        </figure>
                                                    </div>
                                                    <div className="column">
                                                        {/* If mobile Turncate the values */}
                                                        {isMobile ? (
                                                            // Mobile Version
                                                            <Fragment>
                                                                {imageDropdownShown ? (
                                                                    <Fragment>
                                                                        <p
                                                                            className={`${classes?.dropdown_content_text_items}`}
                                                                        >
                                                                            {voca?.truncate(
                                                                                `${data?.first_name} ${data?.last_name}`,
                                                                                12
                                                                            )}
                                                                        </p>
                                                                        <p
                                                                            className={`is-size-7 ${classes?.dropdown_content_text_items}`}
                                                                        >
                                                                            {voca?.truncate(
                                                                                data?.username,
                                                                                12
                                                                            )}
                                                                        </p>
                                                                        <p
                                                                            className={`${classes?.dropdown_content_text_items}`}
                                                                        >
                                                                            {voca?.truncate(
                                                                                data?.email,
                                                                                12
                                                                            )}
                                                                        </p>
                                                                    </Fragment>
                                                                ) : (
                                                                    <Fragment></Fragment>
                                                                )}
                                                            </Fragment>
                                                        ) : (
                                                            <Fragment>
                                                                {isTablet ? (
                                                                    // Tablet | ipad version
                                                                    <Fragment>
                                                                        {imageDropdownShown ? (
                                                                            <Fragment>
                                                                                <Tippy
                                                                                    animateFill={
                                                                                        true
                                                                                    }
                                                                                    followCursor="vertical"
                                                                                    plugins={[
                                                                                        animateFill,
                                                                                        followCursor,
                                                                                    ]}
                                                                                    placement="left"
                                                                                    content={`${data?.first_name} ${data?.last_name}`}
                                                                                >
                                                                                    <p
                                                                                        className={`${classes?.dropdown_content_text_items}`}
                                                                                    >
                                                                                        {voca?.truncate(
                                                                                            `${data?.first_name} ${data?.last_name}`,
                                                                                            15
                                                                                        )}
                                                                                    </p>
                                                                                </Tippy>
                                                                                <Tippy
                                                                                    animateFill={
                                                                                        true
                                                                                    }
                                                                                    followCursor="vertical"
                                                                                    plugins={[
                                                                                        animateFill,
                                                                                        followCursor,
                                                                                    ]}
                                                                                    placement="left"
                                                                                    content={
                                                                                        data?.username
                                                                                    }
                                                                                >
                                                                                    <p
                                                                                        className={`is-size-7 ${classes?.dropdown_content_text_items}`}
                                                                                    >
                                                                                        {voca?.truncate(
                                                                                            data?.username,
                                                                                            15
                                                                                        )}
                                                                                    </p>
                                                                                </Tippy>
                                                                                <Tippy
                                                                                    animateFill={
                                                                                        true
                                                                                    }
                                                                                    followCursor="vertical"
                                                                                    plugins={[
                                                                                        animateFill,
                                                                                        followCursor,
                                                                                    ]}
                                                                                    placement="left"
                                                                                    content={
                                                                                        data?.email
                                                                                    }
                                                                                >
                                                                                    <p
                                                                                        className={`${classes?.dropdown_content_text_items}`}
                                                                                    >
                                                                                        {voca?.truncate(
                                                                                            data?.email,
                                                                                            15
                                                                                        )}
                                                                                    </p>
                                                                                </Tippy>
                                                                            </Fragment>
                                                                        ) : (
                                                                            <Fragment></Fragment>
                                                                        )}
                                                                    </Fragment>
                                                                ) : (
                                                                    // Desktop Version
                                                                    <Fragment>
                                                                        {isFullHD ? (
                                                                            // Low res Display
                                                                            <Fragment>
                                                                                {imageDropdownShown ? (
                                                                                    <Fragment>
                                                                                        <Tippy
                                                                                            placement="left"
                                                                                            animateFill={
                                                                                                true
                                                                                            }
                                                                                            followCursor="vertical"
                                                                                            plugins={[
                                                                                                animateFill,
                                                                                                followCursor,
                                                                                            ]}
                                                                                            content={`${data?.first_name} ${data?.last_name}`}
                                                                                        >
                                                                                            <p
                                                                                                className={`${classes?.dropdown_content_text_items}`}
                                                                                            >
                                                                                                {voca?.truncate(
                                                                                                    `${data?.first_name} ${data?.last_name}`,
                                                                                                    15
                                                                                                )}
                                                                                            </p>
                                                                                        </Tippy>
                                                                                        <Tippy
                                                                                            animateFill={
                                                                                                true
                                                                                            }
                                                                                            followCursor="vertical"
                                                                                            plugins={[
                                                                                                animateFill,
                                                                                                followCursor,
                                                                                            ]}
                                                                                            placement="left"
                                                                                            content={
                                                                                                data?.username
                                                                                            }
                                                                                        >
                                                                                            <p
                                                                                                className={`is-size-7 ${classes?.dropdown_content_text_items}`}
                                                                                            >
                                                                                                {voca?.truncate(
                                                                                                    data?.username,
                                                                                                    15
                                                                                                )}
                                                                                            </p>
                                                                                        </Tippy>
                                                                                        <Tippy
                                                                                            animateFill={
                                                                                                true
                                                                                            }
                                                                                            followCursor="vertical"
                                                                                            plugins={[
                                                                                                animateFill,
                                                                                                followCursor,
                                                                                            ]}
                                                                                            placement="left"
                                                                                            content={
                                                                                                data?.email
                                                                                            }
                                                                                        >
                                                                                            <p
                                                                                                className={`${classes?.dropdown_content_text_items}`}
                                                                                            >
                                                                                                {voca?.truncate(
                                                                                                    data?.email,
                                                                                                    15
                                                                                                )}
                                                                                            </p>
                                                                                        </Tippy>
                                                                                    </Fragment>
                                                                                ) : (
                                                                                    <Fragment></Fragment>
                                                                                )}
                                                                            </Fragment>
                                                                        ) : (
                                                                            // High res Display
                                                                            <Fragment>
                                                                                {isConsoleEnabled ? (
                                                                                    <Fragment>
                                                                                        <Tippy
                                                                                            placement="left"
                                                                                            animateFill={
                                                                                                true
                                                                                            }
                                                                                            followCursor="vertical"
                                                                                            plugins={[
                                                                                                animateFill,
                                                                                                followCursor,
                                                                                            ]}
                                                                                            content={`${data?.first_name} ${data?.last_name}`}
                                                                                        >
                                                                                            <p
                                                                                                className={`${classes?.dropdown_content_text_items}`}
                                                                                            >
                                                                                                {voca?.truncate(
                                                                                                    `${data?.first_name} ${data?.last_name}`,
                                                                                                    15
                                                                                                )}
                                                                                            </p>
                                                                                        </Tippy>
                                                                                        <Tippy
                                                                                            animateFill={
                                                                                                true
                                                                                            }
                                                                                            followCursor="vertical"
                                                                                            plugins={[
                                                                                                animateFill,
                                                                                                followCursor,
                                                                                            ]}
                                                                                            placement="left"
                                                                                            content={
                                                                                                data?.username
                                                                                            }
                                                                                        >
                                                                                            <p
                                                                                                className={`is-size-7 ${classes?.dropdown_content_text_items}`}
                                                                                            >
                                                                                                {voca?.truncate(
                                                                                                    data?.username,
                                                                                                    15
                                                                                                )}
                                                                                            </p>
                                                                                        </Tippy>
                                                                                        <Tippy
                                                                                            animateFill={
                                                                                                true
                                                                                            }
                                                                                            followCursor="vertical"
                                                                                            plugins={[
                                                                                                animateFill,
                                                                                                followCursor,
                                                                                            ]}
                                                                                            placement="left"
                                                                                            content={
                                                                                                data?.email
                                                                                            }
                                                                                        >
                                                                                            <p
                                                                                                className={`${classes?.dropdown_content_text_items}`}
                                                                                            >
                                                                                                {voca?.truncate(
                                                                                                    data?.email,
                                                                                                    15
                                                                                                )}
                                                                                            </p>
                                                                                        </Tippy>
                                                                                    </Fragment>
                                                                                ) : (
                                                                                    <Fragment>
                                                                                        {imageDropdownShown ? (
                                                                                            <Fragment>
                                                                                                <Tippy
                                                                                                    placement="left"
                                                                                                    animateFill={
                                                                                                        true
                                                                                                    }
                                                                                                    followCursor="vertical"
                                                                                                    plugins={[
                                                                                                        animateFill,
                                                                                                        followCursor,
                                                                                                    ]}
                                                                                                    content={`${data?.first_name} ${data?.last_name}`}
                                                                                                >
                                                                                                    <p
                                                                                                        className={`${classes?.dropdown_content_text_items}`}
                                                                                                    >
                                                                                                        {voca?.truncate(
                                                                                                            `${data?.first_name} ${data?.last_name}`,
                                                                                                            23
                                                                                                        )}
                                                                                                    </p>
                                                                                                </Tippy>
                                                                                                <Tippy
                                                                                                    animateFill={
                                                                                                        true
                                                                                                    }
                                                                                                    followCursor="vertical"
                                                                                                    plugins={[
                                                                                                        animateFill,
                                                                                                        followCursor,
                                                                                                    ]}
                                                                                                    placement="left"
                                                                                                    content={
                                                                                                        data?.username
                                                                                                    }
                                                                                                >
                                                                                                    <p
                                                                                                        className={`is-size-7 ${classes?.dropdown_content_text_items}`}
                                                                                                    >
                                                                                                        {voca?.truncate(
                                                                                                            data?.username,
                                                                                                            23
                                                                                                        )}
                                                                                                    </p>
                                                                                                </Tippy>
                                                                                                <Tippy
                                                                                                    animateFill={
                                                                                                        true
                                                                                                    }
                                                                                                    followCursor="vertical"
                                                                                                    plugins={[
                                                                                                        animateFill,
                                                                                                        followCursor,
                                                                                                    ]}
                                                                                                    placement="left"
                                                                                                    content={
                                                                                                        data?.email
                                                                                                    }
                                                                                                >
                                                                                                    <p
                                                                                                        className={`${classes?.dropdown_content_text_items}`}
                                                                                                    >
                                                                                                        {voca?.truncate(
                                                                                                            data?.email,
                                                                                                            23
                                                                                                        )}
                                                                                                    </p>
                                                                                                </Tippy>
                                                                                            </Fragment>
                                                                                        ) : (
                                                                                            <Fragment></Fragment>
                                                                                        )}
                                                                                    </Fragment>
                                                                                )}
                                                                            </Fragment>
                                                                        )}
                                                                    </Fragment>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr
                                                className={
                                                    classes?.[
                                                        'dropdown-divider'
                                                    ]
                                                }
                                            />
                                            <div
                                                className={`dropdown-item ${classes?.['dropdown-item']}`}
                                            >
                                                <div
                                                    className={`box ${classes?.['icon-box']}`}
                                                >
                                                    <div
                                                        className={`columns is-mobile ${classes?.['icon-box-column']}`}
                                                        onClick={() => {
                                                            handleLogout();
                                                        }}
                                                    >
                                                        <div className="column is-narrow">
                                                            <IoLogOutOutline
                                                                color={
                                                                    IconColor?.WHITE_ICON
                                                                }
                                                                style={{
                                                                    transform:
                                                                        'scale(2)',
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="column">
                                                            <p
                                                                className={`is-size-6 
                                                                    ${classes?.dropdown_content_text_items} 
                                                                    ${classes?.dropdown_content_text_items_with_icons}
                                                                `}
                                                            >
                                                                Log Out
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </animated.div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

const useStyles = createUseStyles({
    navbar: {
        backgroundColor: '#161616',
        height: 65,
    },

    button: {
        color: ' #e2dfda',
        border: '1px solid #4c5759 !important',
        fontFamily: 'Nunito',
        backgroundColor: '#191b1f !important',
        transform: 'translateY(-5px) translateX(-5px)',
        transition: '0.4s',

        '&:hover': {
            color: '#e2dfda',
            fontFamily: 'Nunito',
            backgroundColor: '#121316 !important',
        },
    },
    input_item_reverse_translate: {
        transform: 'translateY(-5px)', // <- Revert translation
    },

    items_translated_nav: {
        transform: 'translateY(10px)',
    },
    image_wrapper: {
        paddingLeft: '1em',
    },
    input_item: {
        backgroundColor: `#131417 !important`,
        border: `1px solid #4c5759 !important`,
        color: `#e2dfda !important`,

        '&::placeholder': {
            color: '#e2dfda',
            opacity: 0.5,
            fontFamily: 'Nunito',
        },
    },
    dropdown_content: {
        backgroundColor: '#161616',
    },
    dropdown_content_text_items: {
        color: '#e2dfda !important',
        userSelect: 'none',
    },
    'dropdown-item': {
        cursor: 'pointer',
    },
    'dropdown-divider': {
        backgroundColor: '#313131',
        border: 'none',
        display: 'block',
        height: 1,
        marginTop: '0.5rem',
        marginRight: 0,
        marginBottom: '0.5rem',
        marginLeft: 0,
    },
    dropdown_content_text_items_with_icons: {
        transform: 'translateY(-5px)',
        userSelect: 'none',
    },
    'icon-box-column': {
        transform: 'translateY(-10px)',
    },
    'icon-box': {
        backgroundColor: 'transparent !important',
        userSelect: 'none',
        borderRadius: '0',
        height: 10,
        transition: '0.1s',

        '&:hover': {
            backgroundColor: '#404040 !important',
        },
    },
});
