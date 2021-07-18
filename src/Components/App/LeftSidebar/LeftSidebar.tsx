import './scss/LeftSidebar.scss';
import './scss/LeftSidebar.scoped.icons.scss';

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
} from '../../../Store/Slices/NavbarSlice';

import { RoutingPath } from '../../../Routes';

export const LeftSidebar = () => {
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
        <animated.aside className="menu left-menu" style={leftMenuItem}>
            <div className="icons">
                <Link to={RoutingPath.HOME_PAGE}>
                    <div className="box icon_box">
                        {/* Add is_icon_active */}
                        <div className="columns is-mobile icon_box_column">
                            <div className="column is-2 is-offset-1">
                                <IoHomeOutline className="home__icon" />
                            </div>
                            <div className="column icon_text">Home</div>
                        </div>
                    </div>
                </Link>
                <Link to={RoutingPath.LIBRARY_PAGE}>
                    <div className="box icon_box">
                        {/* Add is_icon_active */}
                        <div className="columns is-mobile icon_box_column">
                            <div className="column is-2 is-offset-1">
                                <MdLibraryMusic className="library__icon" />
                            </div>
                            <div className="column icon_text">Library</div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="playlist-wrapper">
                <div className="playlist-add">
                    <div className="columns is-centered">
                        <div className="column">
                            <Link
                                className="add-icon-wrapper"
                                to={RoutingPath.CREATE_LIBRARY_PAGE}
                            >
                                <MdLibraryAdd className="add__icon" />
                            </Link>
                        </div>
                    </div>
                </div>
                {/* {% get_total_playlist %} */}
            </div>
        </animated.aside>
    );
};
