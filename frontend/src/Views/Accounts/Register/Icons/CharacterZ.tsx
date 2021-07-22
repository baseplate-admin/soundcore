import { IconProps } from './icons';

export const CharacterZIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25pt"
            height="25pt"
            viewBox="0 0 25 25"
            {...props}
        >
            <defs>
                <clipPath id="clip1">
                    <path d="M1.043 1.043h22.918v22.918H1.043zm0 0" />
                </clipPath>
            </defs>
            <g>
                <g clipPath="url(#clip1)">
                    <path
                        fill="#FFF"
                        d="M11.46 2.004c-2.105.238-3.983 1.02-5.608 2.324-.446.36-1.348 1.281-1.672 1.707a11.408 11.408 0 00-1.14 1.832c-1.774 3.656-1.345 7.844 1.14 11.098.324.426 1.226 1.348 1.672 1.71 3.18 2.56 7.46 3.087 11.125 1.364a10.637 10.637 0 005.277-5.562c1.457-3.57.86-7.606-1.574-10.618a16.087 16.087 0 00-.86-.918 10.444 10.444 0 00-5.738-2.863c-.598-.094-2.07-.133-2.621-.074zm1.907.914c3.613.352 6.676 2.617 8.031 5.922 1.301 3.2.832 6.738-1.261 9.515-.39.524-1.258 1.391-1.79 1.793-3.042 2.301-7.1 2.614-10.417.817-2.504-1.367-4.246-3.688-4.836-6.453-.723-3.407.445-6.961 3.054-9.235 1.985-1.742 4.649-2.609 7.22-2.359zm0 0"
                    />
                </g>
                <path
                    fill="#FFF"
                    d="M9.61 8.852v.453h2.257c1.242 0 2.254.023 2.254.043 0 .023-1.047 1.5-2.332 3.285L9.461 15.87l-.004.367v.371h6.086v-.914h-2.36c-1.734 0-2.355-.015-2.355-.054 0-.036 1.04-1.516 2.305-3.293l2.308-3.23v-.723H9.61zm0 0"
                />
            </g>
        </svg>
    );
};