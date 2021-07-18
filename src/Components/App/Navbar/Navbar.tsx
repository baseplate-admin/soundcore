import { Link } from 'react-router-dom';

import brandLogo from '../../../Assets/Images/brand_logo.png';

import { IoMenuSharp } from 'react-icons/io5';
import { MdSearch } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/Hooks';
import {
    leftMenuHidden,
    leftMenuShown,
    selectLeftMenuState,
} from '../../../Store/Slices/NavbarSlice';
import { RoutingPath } from '../../../Routes';
import { createUseStyles } from 'react-jss';

export const Navbar = () => {
    const classes = useStyles();
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
    return (
        <div
            className={`columns is-mobile top-navbar ${classes['top-navbar']}`}
        >
            <div id="hamburger_icon_wrapper_id" className="column is-narrow">
                <IoMenuSharp
                    color="white"
                    style={{ transform: 'scale(1.6)' }}
                    onClick={handleHamburgerIconClick}
                />
            </div>
            <div className="column is-narrow">
                <img
                    alt=""
                    className={`${classes.brand_image}`}
                    src={brandLogo}
                    width="120"
                    height="40"
                />
            </div>
            <div className="column">
                <div className={`field ${classes.search_input_div}`}>
                    <div
                        className={`control has-icons-right ${classes.search_input_wrapper}`}
                    >
                        <input
                            className={`input ${classes.search_input}`}
                            type="text"
                            placeholder="Search"
                        />
                        <span
                            className={`icon is-small is-right ${classes.search_input_box_right_wrapper}`}
                        >
                            <div
                                className={`box ${classes.search_input_box_right}`}
                            >
                                <MdSearch
                                    color="white"
                                    style={{
                                        transform: 'scale(1.4)',
                                    }}
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="column is-narrow ">
                {/* {% if not user.is_authenticated %} */}
                <div className={`${classes.login_button_wrapper}`}>
                    <Link
                        className={`button is-rounded ${classes.login_button}`}
                        to={RoutingPath.LOGIN_PAGE}
                    >
                        <p style={{ marginBottom: 5 }}>Login</p>
                    </Link>
                </div>
                {/* {% elif user.is_authenticated %}
                <figure className="image is-32x32 user_image">
                <img alt=""
                     src="https://bulma.io/images/placeholders/128x128.png"
                     className="is-rounded"/>
                </figure>
                {% endif %} */}
            </div>
        </div>
    );
};

const useStyles = createUseStyles({
    'top-navbar': { backgroundColor: '#161616', color: 'white' },
    brand_image: {
        transform: 'translateY(0.6em) translateX(30px)',

        '@media screen and (max-width: 767px)': {
            transform: 'translateY(0.6em) translateX(20px) !important',
        },
    },
    login_button: {
        color: '#eaeaea !important',
        backgroundColor: 'transparent !important',
        borderColor: '#3b3838 !important',
        borderWidth: '1px',
        transition: '0.4s',

        '&:hover': {
            color: '#a5a4a4 !important',
            backgroundColor: '#101010 !important',
            borderColor: '#3b3838 !important',
            borderWidth: '1px',
        },
    },
    search_input_wrapper: {
        flexGrow: 0.4,
        transform: 'translateY(5px)',

        '@media screen and (max-width: 767px)': {
            display: 'none',
        },
    },
    search_input: {
        backgroundColor: '#060606 !important',
        border: 'transparent !important',
        color: 'white !important',
        borderRadius: '0',

        '&::placeholder': {
            color: 'white !important',
            opacity: 0.6,
        },
    },

    search_input_box_right_wrapper: {
        overflow: 'hidden',
    },
    login_button_wrapper: {
        transform: 'translateY(5px) translateX(-5px)',
    },
    user_image: { transform: 'translateY(10px) translateX(-10px)' },
    search_input_box_right: {
        backgroundColor: '#323232 !important',
        borderRadius: '0',
    },
    search_input_div: {
        display: 'flex',
        justifyContent: 'center',
    },
});
