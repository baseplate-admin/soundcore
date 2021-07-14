import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import './scss/HomeApp.scss';
import './scss/HomeApp.responsive.scss';

import { Navbar } from '../../../Components/App/Navbar/Navbar';
import { Footer } from '../../../Components/App/Footer/Footer';
import { LeftSidebar } from '../../../Components/App/LeftSidebar/LeftSidebar';

import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { ApplicationName } from '../../routing';

export const HomePage = () => {
    return (
        <Fragment>
            <Helmet>
                <title> {ApplicationName} </title>
            </Helmet>
            <Navbar />
            <div className="columns is-mobile main__body">
                <div className="column is-narrow left_menu_wrapper">
                    <LeftSidebar />
                </div>
                <div className="column right-column">
                    <div className="grid-container">
                        {/* {% for i in musics %} */}
                        <div className="grid-item">
                            <div
                                className="box grid-box"
                                //  onmouseleave="handleDropdownHide({{ i.id }})"
                                //      onmouseenter="handleDropdownShow({{ i.id }})"
                            >
                                <figure
                                    className="image song-image-figure"
                                    // onclick="handleSongItemClick({{ i.id }})"
                                >
                                    {/* {% thumbnail i.album_art "200x200" crop="center" as im %}
                                <a id="song-image-{{ i.id }}"
                                   href="{{ im.url }}"
                                   className="progressive replace disabled_link">
                            {% endthumbnail %}
                            {% thumbnail i.album_art "20x20" crop="center" as im %} */}

                                    {/* <img height="{{ im.height }}"
                                     width="{{ im.width }}" className="song-image preview"
                                     alt="song-image"
                                     src="{{ im.url }}">
                                </a>
                            {% endthumbnail %} */}
                                </figure>
                                <div className="song-description">
                                    <div
                                        className="columns is-mobile"
                                        style={{ width: 200 }}
                                    >
                                        <div className="column is-11 ">
                                            <div
                                                className="box"
                                                style={{
                                                    backgroundColor:
                                                        'transparent',
                                                    paddingRight: 0,
                                                }}
                                            >
                                                <p
                                                    className="title is-size-5 song-title"
                                                    id="song-name-{{ i.id }}"
                                                >
                                                    {/* {{ i.song_name }} */}
                                                </p>
                                                <p
                                                    className="subtitle is-size-6 song-artist"
                                                    id="song-artist-{{ i.id }}"
                                                >
                                                    {/* {{ i.artist }} */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="column is-1 is-hidden dropdown-icon-wrapper-{{ i.id }}">
                                            <div className="dropdown is-right song-dropdown-{{ i.id }}">
                                                <div className="dropdown-trigger">
                                                    <span
                                                        id="dropdown-icon-wrapper-{{ i.id }}"
                                                        //   onclick="handleDropdownClick({{ i.id }})"
                                                    >
                                                        <IoEllipsisVerticalSharp className="dropdown__icon" />
                                                    </span>
                                                </div>
                                                <div
                                                    className="dropdown-menu"
                                                    role="menu"
                                                >
                                                    <div
                                                        className="dropdown-content"
                                                        style={{
                                                            backgroundColor:
                                                                '#161616',
                                                        }}
                                                    >
                                                        <div
                                                            className="dropdown-item"
                                                            style={{
                                                                color:
                                                                    '#e0e0ec',
                                                            }}
                                                        />
                                                        <div
                                                            className="dropdown-item"
                                                            style={{
                                                                color:
                                                                    '#e0e0ec',
                                                            }}
                                                        />

                                                        {/* <!--<hr className="dropdown-divider">--> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {% endfor %} */}
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};
