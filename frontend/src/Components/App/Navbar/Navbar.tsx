import {
    IoLogOutOutline,
    IoMenuOutline,
    IoSearchOutline,
} from 'react-icons/io5';
import { createUseStyles } from 'react-jss';
import { Link, useHistory } from 'react-router-dom';
import brandLogo from '../../../Assets/Images/brand_logo.png';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/Hooks';
import { RoutingPath } from '../../../Routes';
import {
    leftMenuHidden,
    leftMenuShown,
    selectLeftMenuState,
} from '../../../Store/Slices/NavbarSlice';
import { useMediaQuery } from 'react-responsive';
import { Fragment, useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../Store/Services/GetUserService';
import { GetImageFromLibravatarByEmail } from '../../../Functions/Helpers/GetImageFromLibravatar';
import { useSpring, animated } from 'react-spring';
import useWindowDimensions from '../../../Hooks/Responsive/WindowDimensions';
import voca from 'voca';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import { useAuthLogout } from '../../../Hooks/Auth/LogoutHook';
import profilePlaceholder from '../../../Assets/Images/placeholder-90x90.png';

export const Navbar = () => {
    const [Logout] = useAuthLogout();

    const { data, isLoading } = useGetUserQuery(null);

    useEffect(() => {
        if (!isLoading && data === undefined) {
            Logout();
        }
    }, [Logout, data, isLoading]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { height, width } = useWindowDimensions();

    const history = useHistory();
    const classes = useStyles();

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

    const leftMenuState = useAppSelector(selectLeftMenuState);
    const dispatch = useAppDispatch();

    const handleHamburgerIconClick = () => {
        // Always returns true
        if (!leftMenuState.isHidden) {
            dispatch(leftMenuShown());
        } else if (leftMenuState.isHidden) {
            dispatch(leftMenuHidden());
        }
    };

    const imageDropDownItem = useSpring({
        height: imageDropdownShown ? 180 : 0,
        opacity: imageDropdownShown ? 1 : 0.0,
        width: isMobile
            ? (width * 53) / 100
            : isFullHD
            ? (width * 23) / 100
            : (width * 15) / 100, // 53vw Mobile | 25vw Low Res Display | 15vw High Res Display
    });
    const handleLogout = () => {
        Logout();
        history.go(0); // Refresh the page ? (Update Needed)
    };

    return (
        <Fragment>
            <div className={`columns is-mobile is-centered ${classes.navbar}`}>
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
                                                classes.items_translated_nav
                                            }
                                        >
                                            <IoMenuOutline
                                                color="white"
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
                                                    classes.image_wrapper
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.items_translated_nav
                                                    }
                                                >
                                                    <img
                                                        src={brandLogo}
                                                        alt=""
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
                    <div className={classes.items_translated_nav}>
                        <div className="field">
                            <div
                                className={`control has-icons-left has-icons-right ${classes.input_item_reverse_translate}`}
                            >
                                <input
                                    className={`input ${classes.input_item}`}
                                    type="text"
                                    placeholder="Search "
                                />
                                <span className="icon is-small is-left"></span>
                                <span className="icon is-small is-right">
                                    <IoSearchOutline
                                        color="white"
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
                            src={profilePlaceholder}
                            alt="profile_picture"
                        />
                    </figure>
                ) : (
                    <Fragment>
                        {data === undefined ? (
                            <div className="column is-narrow">
                                <div
                                    className={`${classes.items_translated_nav}`}
                                >
                                    <Link
                                        className={`button is-rounded ${classes.button}`}
                                        to={RoutingPath.LOGIN_PAGE}
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
                                                data.email
                                            )}
                                        />
                                    </figure>

                                    <div className="dropdown-menu" role="menu">
                                        <animated.div
                                            style={imageDropDownItem}
                                            className={`dropdown-content ${classes.dropdown_content}`}
                                        >
                                            <div className="dropdown-item">
                                                <div className="columns is-mobile">
                                                    <div className="column is-narrow ">
                                                        <figure className="image">
                                                            <img
                                                                alt="profile_picture"
                                                                src={GetImageFromLibravatarByEmail(
                                                                    data.email
                                                                )}
                                                            />
                                                        </figure>
                                                    </div>
                                                    <div className="column">
                                                        {/* If mobile Turncate the values */}
                                                        {isMobile ? (
                                                            // Mobile Version
                                                            <Fragment>
                                                                <div
                                                                    className={
                                                                        imageDropdownShown
                                                                            ? ''
                                                                            : 'is-hidden'
                                                                    }
                                                                >
                                                                    <p
                                                                        className={`${classes.dropdown_content_text_items}`}
                                                                    >
                                                                        {voca.truncate(
                                                                            `${data.first_name} ${data.last_name}`,
                                                                            10
                                                                        )}
                                                                    </p>
                                                                    <p
                                                                        className={`is-size-7 ${classes.dropdown_content_text_items}`}
                                                                    >
                                                                        {voca.truncate(
                                                                            data.username,
                                                                            10
                                                                        )}
                                                                    </p>
                                                                    <p
                                                                        className={`${classes.dropdown_content_text_items}`}
                                                                    >
                                                                        {voca.truncate(
                                                                            data.email,
                                                                            10
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </Fragment>
                                                        ) : (
                                                            // Desktop Version
                                                            <Fragment>
                                                                {isTablet ? (
                                                                    <Fragment>
                                                                        <div
                                                                            className={
                                                                                imageDropdownShown
                                                                                    ? ''
                                                                                    : 'is-hidden'
                                                                            }
                                                                        >
                                                                            <Tippy
                                                                                placement="left"
                                                                                content={`${data.first_name} ${data.last_name}`}
                                                                            >
                                                                                <p
                                                                                    className={`${classes.dropdown_content_text_items}`}
                                                                                >
                                                                                    {voca.truncate(
                                                                                        `${data.first_name} ${data.last_name}`,
                                                                                        13
                                                                                    )}
                                                                                </p>
                                                                            </Tippy>
                                                                            <Tippy
                                                                                placement="left"
                                                                                content={
                                                                                    data.username
                                                                                }
                                                                            >
                                                                                <p
                                                                                    className={`is-size-7 ${classes.dropdown_content_text_items}`}
                                                                                >
                                                                                    {voca.truncate(
                                                                                        data.username,
                                                                                        13
                                                                                    )}
                                                                                </p>
                                                                            </Tippy>
                                                                            <Tippy
                                                                                placement="left"
                                                                                content={
                                                                                    data.email
                                                                                }
                                                                            >
                                                                                <p
                                                                                    className={`${classes.dropdown_content_text_items}`}
                                                                                >
                                                                                    {voca.truncate(
                                                                                        data.email,
                                                                                        13
                                                                                    )}
                                                                                </p>
                                                                            </Tippy>
                                                                        </div>
                                                                    </Fragment>
                                                                ) : (
                                                                    <Fragment>
                                                                        <div
                                                                            className={
                                                                                imageDropdownShown
                                                                                    ? ''
                                                                                    : 'is-hidden'
                                                                            }
                                                                        >
                                                                            <Tippy
                                                                                placement="left"
                                                                                content={`${data.first_name} ${data.last_name}`}
                                                                            >
                                                                                <p
                                                                                    className={`${classes.dropdown_content_text_items}`}
                                                                                >
                                                                                    {voca.truncate(
                                                                                        `${data.first_name} ${data.last_name}`,
                                                                                        25
                                                                                    )}
                                                                                </p>
                                                                            </Tippy>
                                                                            <Tippy
                                                                                placement="left"
                                                                                content={
                                                                                    data.username
                                                                                }
                                                                            >
                                                                                <p
                                                                                    className={`is-size-7 ${classes.dropdown_content_text_items}`}
                                                                                >
                                                                                    {voca.truncate(
                                                                                        data.username,
                                                                                        25
                                                                                    )}
                                                                                </p>
                                                                            </Tippy>
                                                                            <Tippy
                                                                                placement="left"
                                                                                content={
                                                                                    data.email
                                                                                }
                                                                            >
                                                                                <p
                                                                                    className={`${classes.dropdown_content_text_items}`}
                                                                                >
                                                                                    {voca.truncate(
                                                                                        data.email,
                                                                                        25
                                                                                    )}
                                                                                </p>
                                                                            </Tippy>
                                                                        </div>
                                                                    </Fragment>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr
                                                className={
                                                    classes['dropdown-divider']
                                                }
                                            />
                                            <div className="dropdown-item">
                                                <div
                                                    className={`box ${classes['icon-box']}`}
                                                >
                                                    <div
                                                        className={`columns is-mobile ${classes['icon-box-column']}`}
                                                        onClick={() => {
                                                            handleLogout();
                                                        }}
                                                    >
                                                        <div className="column is-narrow">
                                                            <IoLogOutOutline
                                                                color="white"
                                                                style={{
                                                                    transform:
                                                                        'scale(2)',
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="column">
                                                            <p
                                                                className={`is-size-6 
                                                                    ${classes.dropdown_content_text_items} 
                                                                    ${classes.dropdown_content_text_items_with_icons}
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
        transition: '0.4s',
        fontFamily: 'Nunito',
        backgroundColor: '#191b1f !important',
        transform: 'translateY(-5px) translateX(-5px)',

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
        cursor: 'pointer',
    },
    'icon-box-column': {
        transform: 'translateY(-10px)',
    },
    'icon-box': {
        backgroundColor: 'transparent !important',
        userSelect: 'none',
        borderRadius: '0',
        height: 10,
        '&:hover': {
            backgroundColor: '#404040 !important',
        },
    },
});
