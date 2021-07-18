import './scss/HomePageLoader.scoped.scss';

import '../../App/LeftSidebar/scss/LeftSidebar.scss';

export const HomePageLoaderApp = () => {
    return (
        <>
            <div className="columns is-mobile top-navbar">
                <div
                    id="hamburger_icon_wrapper_id"
                    className="column is-narrow"
                />
                <div className="column is-narrow brand_image">
                    {/* <img
                            alt=""
                            src=""
                            width="120"
                            height="40" 
                        /> */}
                    <div
                        style={{
                            width: 120,
                            height: 40,
                            background: '#0a0a0a',
                        }}
                    />
                </div>
                <div className="column">
                    <div className="field search_input_div">
                        <div className="control has-icons-right search_input_wrapper">
                            <span className="icon is-small is-right search_input_box_right_wrapper">
                                <div className="box search_input_box_right" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="column is-narrow ">
                    <div className="login_button_wrapper">
                        <div
                            style={{
                                width: 120,
                                height: 40,
                                background: '#0a0a0a',
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="columns is-mobile main__body">
                <div className="column is-narrow left_menu_wrapper">
                    <aside className="menu left-menu" style={{ width: 240 }}>
                        <div className="icons">
                            <div className="box icon_box">
                                <div className="columns is-mobile icon_box_column">
                                    <div className="column is-2 is-offset-1">
                                        <div
                                            style={{
                                                width: 30,
                                                height: 30,
                                                background: '#0a0a0a',
                                            }}
                                        />
                                    </div>
                                    <div className="column icon_text">
                                        <div
                                            style={{
                                                width: 80,
                                                height: 30,
                                                background: '#0a0a0a',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box icon_box">
                                <div className="columns is-mobile icon_box_column">
                                    <div className="column is-2 is-offset-1">
                                        <div
                                            style={{
                                                width: 30,
                                                height: 30,
                                                background: '#0a0a0a',
                                            }}
                                        />
                                    </div>
                                    <div className="column icon_text">
                                        <div
                                            style={{
                                                width: 80,
                                                height: 30,
                                                background: '#0a0a0a',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="playlist-wrapper">
                            <div className="playlist-add">
                                <div className="columns is-centered">
                                    <div className="column" />
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                <div className="column right-column">
                    <div className="grid-container">
                        <div className="grid-item">
                            <div className="box grid-box">
                                <figure className="image song-image-figure" />
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
                                                />
                                                <p
                                                    className="subtitle is-size-6 song-artist"
                                                    id="song-artist-{{ i.id }}"
                                                />
                                            </div>
                                        </div>
                                        <div className="column is-1 is-hidden dropdown-icon-wrapper-{{ i.id }}">
                                            <div className="dropdown is-right song-dropdown-{{ i.id }}">
                                                <div className="dropdown-trigger">
                                                    <span id="dropdown-icon-wrapper-{{ i.id }}" />
                                                </div>
                                                <div
                                                    className="dropdown-menu"
                                                    role="menu"
                                                >
                                                    <div
                                                        className="dropdown-content"
                                                        style={{
                                                            backgroundColor:
                                                                'rgb(22, 22, 22)',
                                                        }}
                                                    >
                                                        <div
                                                            className="dropdown-item"
                                                            style={{
                                                                color:
                                                                    'rgb(224, 224, 236)',
                                                            }}
                                                        />
                                                        <div
                                                            className="dropdown-item"
                                                            style={{
                                                                color:
                                                                    'rgb(224, 224, 236)',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer_item">
                <div className="columns is-mobile footer_column">
                    <div className="column footer_info_column  is-3">
                        <article className="media">
                            <figure className="media-left">
                                <p className="image is-64x64">
                                    <div
                                        style={{
                                            width: 64,
                                            height: 64,
                                            background: '#0a0a0a',
                                        }}
                                    />
                                </p>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p className="footer_info">
                                        <strong id="footer-song-name">
                                            <div
                                                style={{
                                                    width: 83,
                                                    height: 21,
                                                    background: '#0a0a0a',
                                                }}
                                            />
                                        </strong>{' '}
                                        <small id="footer-song-artist">
                                            <div
                                                style={{
                                                    width: 33,
                                                    height: 19,
                                                    background: '#0a0a0a',
                                                }}
                                            />
                                        </small>{' '}
                                        <small id="footer-song-sample-rate">
                                            <div
                                                style={{
                                                    width: 75,
                                                    height: 19,
                                                    background: '#0a0a0a',
                                                }}
                                            />{' '}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="column footer_control_column">
                        <div className="columns is-mobile is-centered footer_control_column_wrapper">
                            <div className="column is-1 has-text-centered previous_song_wrapper footer_control_column_items" />
                            <div className="column is-1 is-offset-1 has-text-centered play_pause_wrapper footer_control_column_items" />
                            <div className="column is-1 is-offset-1 next_song_wrapper has-text-centered footer_control_column_items" />
                        </div>
                        <div className="columns is-mobile">
                            <div className="column is-narrow pre_input">
                                <div
                                    style={{
                                        width: 52,
                                        height: 48,
                                        background: '#0a0a0a',
                                    }}
                                />{' '}
                            </div>
                            <div className="column ">
                                <div className="footer_input_anchor">
                                    <div
                                        style={{
                                            width: 570,
                                            height: 20,
                                            background: '#0a0a0a',
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className="column is-narrow post_input"
                                id="total_duration"
                            >
                                <div
                                    style={{
                                        width: 52,
                                        height: 48,
                                        background: '#0a0a0a',
                                    }}
                                />{' '}
                            </div>
                        </div>
                    </div>
                    <div className="column is-hidden-mobile is-3 ">
                        <div className="columns is-mobile volume_control_column">
                            <div className="column is-2 is-offset-2" />
                            <div className="column ">
                                <div className="volume_anchor">
                                    <div
                                        style={{
                                            width: 126,
                                            height: 15,
                                            background: '#0a0a0a',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="column is-2 is-offset-1" />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
