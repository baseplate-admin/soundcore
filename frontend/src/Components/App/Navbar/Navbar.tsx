import { IoMenuOutline, IoSearchOutline } from 'react-icons/io5';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import brandLogo from '../../../Assets/Images/brand_logo.png';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/Hooks';
import { RoutingPath } from '../../../Routes';
import {
    leftMenuHidden,
    leftMenuShown,
    selectLeftMenuState,
} from '../../../Store/Slices/NavbarSlice';
import { useMediaQuery } from 'react-responsive';
import { Fragment, useState } from 'react';
import { useGetUserQuery } from '../../../Store/Services/GetUserService';
import { GetImageFromLibravatarByEmail } from '../../../Functions/Helpers/GetImageFromLibravatar';
import { useSpring, animated } from 'react-spring';
import useWindowDimensions from '../../../Hooks/Responsive/WindowDimensions';
import voca from 'voca';

export const Navbar = () => {
    const { data, isLoading } = useGetUserQuery(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { height, width } = useWindowDimensions();

    const classes = useStyles();
    const [imageDropdownShown, setImageDropdownShown] = useState(false);

    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
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
        height: imageDropdownShown ? 120 : 0,
        opacity: imageDropdownShown ? 1 : 0.0,
        width: isMobile ? (width * 50) / 100 : (width * 30) / 100, // 50vw Mobile | 30vw Web
    });
    return (
        <>
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
                                        {/* If mobile Hide the image */}
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
                <div className="column "></div>
                <div className="column is-half">
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
                    ''
                ) : (
                    <>
                        {data === undefined ? (
                            <div className="column is-narrow">
                                <div
                                    className={` ${classes.items_translated_nav}`}
                                >
                                    <Link
                                        className={`button is-rounded ${classes.button}`}
                                        to={RoutingPath.LOGIN_PAGE}
                                    >
                                        Login
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
                                            alt="profile_image"
                                            src={GetImageFromLibravatarByEmail(
                                                data.email
                                            )}
                                        />
                                    </figure>

                                    <div className="dropdown-menu" role="menu">
                                        <animated.div
                                            style={imageDropDownItem}
                                            className="dropdown-content"
                                        >
                                            <div className="dropdown-item">
                                                <div className="columns is-mobile">
                                                    <div className="column is-narrow ">
                                                        <figure className="image">
                                                            <img
                                                                alt="profile_image"
                                                                src={GetImageFromLibravatarByEmail(
                                                                    data.email
                                                                )}
                                                            />
                                                        </figure>
                                                    </div>
                                                    <div className="column">
                                                        {/* If mobile Turncate the values */}
                                                        {isMobile ? (
                                                            <Fragment>
                                                                <p>
                                                                    {voca.truncate(
                                                                        `${data.first_name} ${data.last_name}`,
                                                                        12
                                                                    )}
                                                                </p>
                                                                <p className="is-size-7">
                                                                    {voca.truncate(
                                                                        data.username,
                                                                        12
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    {voca.truncate(
                                                                        data.email,
                                                                        12
                                                                    )}
                                                                </p>
                                                            </Fragment>
                                                        ) : (
                                                            <Fragment>
                                                                <p>
                                                                    {voca.truncate(
                                                                        `${data.first_name} ${data.last_name}`,
                                                                        50
                                                                    )}
                                                                </p>
                                                                <p className="is-size-7">
                                                                    {voca.truncate(
                                                                        data.username,
                                                                        50
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    {voca.truncate(
                                                                        data.email,
                                                                        50
                                                                    )}
                                                                </p>
                                                            </Fragment>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="dropdown-divider" />
                                        </animated.div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
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
});
