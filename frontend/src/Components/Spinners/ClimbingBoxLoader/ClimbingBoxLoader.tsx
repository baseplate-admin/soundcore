import { createUseStyles } from 'react-jss';
import { LoaderColors } from '../../../Config/Colors/Loaders';

export const ClimbingBoxLoader = () => {
    const classes = useStyles();

    return (
        <div className="container">
            <span className={classes?.container}>
                <span className={classes?.wrapper}>
                    <span className={classes?.style} />
                    <span className={classes?.hill} />
                </span>
            </span>
        </div>
    );
};
const useStyles = createUseStyles({
    '@keyframes climbing-object': {
        '0%': {
            transform: 'translate(0, -1em) rotate(-45deg)',
        },
        '5%': {
            transform: 'translate(0, -1em) rotate(-50deg)',
        },
        '20%': {
            transform: 'translate(1em, -2em) rotate(47deg)',
        },
        '25%': {
            transform: 'translate(1em, -2em) rotate(45deg)',
        },
        '30%': {
            transform: 'translate(1em, -2em) rotate(40deg)',
        },
        '45%': {
            transform: 'translate(2em, -3em) rotate(137deg)',
        },
        '50%': {
            transform: 'translate(2em, -3em) rotate(135deg)',
        },
        '55%': {
            transform: 'translate(2em, -3em) rotate(130deg)',
        },
        '70%': {
            transform: 'translate(3em, -4em) rotate(217deg)',
        },
        '75%': {
            transform: 'translate(3em, -4em) rotate(220deg)',
        },
        '100%': {
            transform: 'translate(0, -1em) rotate(-225deg)',
        },
    },
    style: {
        position: 'absolute',
        left: '0px',
        bottom: '-0.1em',
        height: '1em',
        width: '1em',
        backgroundColor: 'transparent',
        borderRadius: '15%',
        border: '0.25em solid',
        borderColor: `${LoaderColors?.CLIMBING_BOX} !important`,
        transform: 'translate(0px, -1em) rotate(-45deg)',
        animation:
            '2.5s cubic-bezier(0.79, 0, 0.47, 0.97) 0s infinite normal none running $climbing-object',
    },
    hill: {
        position: 'absolute',
        width: '7.1em',
        height: '7.1em',
        top: '1.7em',
        left: '1.7em',
        borderLeft: '0.25em solid',
        borderColor: `${LoaderColors?.CLIMBING_BOX} !important`,
        transform: 'rotate(45deg)',
    },
    wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-2.7em',
        marginLeft: '-2.7em',
        width: '5.4em',
        height: '5.4em',
        fontSize: '15px',
    },
    container: {
        position: 'relative',
        width: '7.1em',
        height: '7.1em',
        display: 'inline-block',
    },
});
