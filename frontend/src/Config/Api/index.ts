export enum APIPath {
    LOGIN_ENDPOINT = '/users/token/',
    REFRESH_ENDPOINT = '/users/token/refresh/',
    TOKEN_JAIL_ENDPOINT = '/users/token/blacklist/',

    FETCH_SONG_ENDPOINT = '/music/',
    RANDOM_SONG_ENDPOINT = '/music/random/',

    UPLOAD_MUSIC_PATH = '/music/',

    USER_INFO_ENDPOINT = '/users/info/',

    CAPTURE_VOLUME = '/users/capture/volume/',
    CAPTURE_PREVIOUS_SONG = '/users/capture/previous_song/',
}
