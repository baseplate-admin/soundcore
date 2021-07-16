import { Link } from 'react-router-dom';

import './scss/Navbar.scss';
import './scss/Navbar.scoped.icons.scss';

import brandLogo from '../../../Assets/Images/brand_logo.png';

import { IoMenuSharp } from 'react-icons/io5';
import { MdSearch } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../Hooks/Store/hooks';
import {
    leftMenuHidden,
    leftMenuShown,
    selectLeftMenuState,
} from '../../../Store/Slices/NavbarSlice';
import { RoutingPath } from '../../../Routes';

export const Navbar = () => {
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
        <div className="columns is-mobile top-navbar">
            <div id="hamburger_icon_wrapper_id" className="column is-narrow">
                <IoMenuSharp
                    className="hamburger_icon"
                    onClick={handleHamburgerIconClick}
                />
            </div>
            <div className="column is-narrow brand_image">
                <img alt="" src={brandLogo} width="120" height="40" />
            </div>
            <div className="column">
                <div className="field search_input_div">
                    <div className="control has-icons-right search_input_wrapper">
                        <input
                            className="input search_input"
                            type="text"
                            placeholder="Search"
                        />
                        <span className="icon is-small is-right search_input_box_right_wrapper">
                            <div className="box search_input_box_right">
                                <MdSearch className="search_icon" />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="column is-narrow ">
                {/* {% if not user.is_authenticated %} */}
                <div className="login_button_wrapper">
                    <Link
                        className="button is-rounded login_button"
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
