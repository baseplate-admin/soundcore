import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSpring, animated } from 'react-spring';

import { IoHomeOutline } from 'react-icons/io5';
import { MdLibraryMusic, MdLibraryAdd } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/Hooks';
import {
    leftMenuHidden,
    leftMenuShown,
    selectLeftMenuState,
} from '../../../Store/Slices/Navbar';

import { RoutingPath } from '../../../Config/Routes';
import { createUseStyles } from 'react-jss';

export const LeftSidebar = () => {
    const classes = useStyles();
    const leftMenuState = useAppSelector(selectLeftMenuState);

    const dispatch = useAppDispatch();

    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });

    useEffect(() => {
        if (isMobile) {
            // leftMenuShown();
            dispatch(leftMenuShown());
        } else if (!isMobile) {
            dispatch(leftMenuHidden());
            // leftMenuHidden();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    const leftMenuItem = useSpring({
        width: leftMenuState.isHidden ? 0 : 240,
        transform: leftMenuState.isHidden
            ? 'translateX(-500px)'
            : 'translateX(0)',
    });

    return (
        <animated.aside
            className={`menu ${classes?.['left-menu']}`}
            style={leftMenuItem}
        >
            <div className={classes?.icons}>
                <Link to={RoutingPath?.HOME_PAGE}>
                    <div className={`box ${classes?.icon_box}`}>
                        {/* Add is_icon_active */}
                        <div
                            className={`columns is-mobile ${classes?.icon_box_column}`}
                        >
                            <div className="column is-2 is-offset-1">
                                <IoHomeOutline
                                    color="white"
                                    style={{ transform: 'scale(1.4)' }}
                                />
                            </div>
                            <div className={`column ${classes?.icon_text}`}>
                                Home
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to={RoutingPath?.LIBRARY_PAGE}>
                    <div className={`box ${classes?.icon_box}`}>
                        {/* Add is_icon_active */}
                        <div
                            className={`columns is-mobile ${classes?.icon_box_column}`}
                        >
                            <div className="column is-2 is-offset-1">
                                <MdLibraryMusic
                                    color="white"
                                    style={{
                                        transform:
                                            'scale(1.4) translateY(1.5px)',
                                    }}
                                />
                            </div>
                            <div className={`column ${classes?.icon_text}`}>
                                Library
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={classes?.['playlist-wrapper']}>
                <div className="columns is-centered">
                    <div className="column">
                        <Link
                            className={classes?.['add-icon-wrapper']}
                            to={RoutingPath?.CREATE_LIBRARY_PAGE}
                        >
                            <MdLibraryAdd
                                color="white"
                                style={{
                                    transform: 'scale(1.3) translateX(3px)',
                                }}
                            />
                        </Link>
                    </div>
                </div>
                {/* {% get_total_playlist %} */}
            </div>
        </animated.aside>
    );
};
const useStyles = createUseStyles({
    'left-menu': {
        backgroundColor: '#161616 !important',
        minHeight: '100vh',
        height: '105%',
    },
    icons: {
        borderBottom: '1px solid #313131',
        paddingBottom: '0.5em',
    },
    icon_box: {
        width: '240px',
        backgroundColor: 'transparent !important',
        userSelect: 'none',
        height: '10px',
        borderRadius: '0',
        transition: '0.1s',

        '&:hover': {
            backgroundColor: '#404040 !important',
        },
    },
    icon_box_column: {
        transform: 'translateY(-12px)',
    },

    icon_text: {
        color: '#e0e0ec',
    },
    is_icon_active: {
        backgroundColor: '#242424',
    },
    'playlist-wrapper': {
        paddingTop: '0.5em',
    },
    'add-icon-wrapper': {
        display: 'flex',
        justifyContent: 'center',
        padding: '0.5em',
        transform: 'translateX(-25px)',
    },
});
