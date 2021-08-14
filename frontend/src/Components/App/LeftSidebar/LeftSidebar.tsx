import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
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
import { IconColor } from '../../../Config/Colors/Icons';
import { Box, Columns, Element } from 'react-bulma-components';

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
        width: leftMenuState?.isHidden ? 0 : 240,
        transform: leftMenuState?.isHidden
            ? 'translateX(-500px)'
            : 'translateX(0)',
    });

    return (
        <animated.aside
            className={`menu ${classes?.['left-menu']}`}
            style={leftMenuItem}
        >
            <Element className={classes?.icons}>
                <Link to={RoutingPath?.HOME_PAGE}>
                    <Box className={classes?.icon_box}>
                        {/* Add is_icon_active */}
                        <Columns
                            breakpoint="mobile"
                            multiline={false}
                            className={classes?.icon_box_column}
                        >
                            <Columns.Column size={2} offset={1}>
                                <IoHomeOutline
                                    color={IconColor?.WHITE_ICON}
                                    className={classes?.['home-icon-item']}
                                />
                            </Columns.Column>
                            <Columns.Column
                                narrow
                                className={classes?.icon_text}
                            >
                                Home
                            </Columns.Column>
                        </Columns>
                    </Box>
                </Link>
                <Link to={RoutingPath?.LIBRARY_PAGE}>
                    <Box className={classes?.icon_box}>
                        {/* Add is_icon_active */}
                        <Columns
                            breakpoint="mobile"
                            multiline={false}
                            className={classes?.icon_box_column}
                        >
                            <Columns.Column size={2} offset={1}>
                                <MdLibraryMusic
                                    color={IconColor?.WHITE_ICON}
                                    className={classes?.['library-icon-item']}
                                />
                            </Columns.Column>
                            <Columns.Column
                                narrow
                                className={classes?.icon_text}
                            >
                                Library
                            </Columns.Column>
                        </Columns>
                    </Box>
                </Link>
            </Element>
            <Element className={classes?.['playlist-wrapper']}>
                <Columns centered>
                    <Columns.Column>
                        <Link
                            className={classes?.['add-icon-wrapper']}
                            to={RoutingPath?.CREATE_LIBRARY_PAGE}
                        >
                            <MdLibraryAdd
                                color={IconColor?.WHITE_ICON}
                                className={classes?.['add-icon-item']}
                            />
                        </Link>
                    </Columns.Column>
                </Columns>
                {/* {% get_total_playlist %} */}
            </Element>
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
    'add-icon-item': {
        transform: 'scale(1.3) translateX(3px)',
    },
    'library-icon-item': {
        transform: 'scale(1.4) translateY(1.5px)',
    },
    'home-icon-item': {
        transform: 'scale(1.4)',
    },
});
