import { createUseStyles } from 'react-jss';

const HashColor: string = 'rgba(54, 215, 183, 0.75)';

export const HashLoader = () => {
    const classes = useStyles();
    return (
        <div className="container">
            <span className={classes.wrapper}>
                <span className={classes.style1} />
                <span className={classes.style2} />
            </span>
        </div>
    );
};

const useStyles = createUseStyles({
    '@keyframes animation-1': {
        '0%': {
            width: '10px',
            boxShadow: `${HashColor} 20px -10px, ${HashColor} -20px 10px`,
        },
        '35%': {
            width: '50px',
            boxShadow: `${HashColor} 0px -10px, ${HashColor} 0px 10px`,
        },
        '70%': {
            width: '10px',
            boxShadow: `${HashColor} -20px -10px, ${HashColor} 20px 10px`,
        },
        '100%': {
            boxShadow: `${HashColor} 20px -10px, ${HashColor} -20px 10px`,
        },
    },
    '@keyframes animation-2': {
        '0%': {
            height: '10px',
            boxShadow: `${HashColor} 10px 20px, ${HashColor} -10px -20px`,
        },
        '35%': {
            height: '50px',
            boxShadow: `${HashColor} 10px 0px, ${HashColor} -10px 0px`,
        },
        '70%': {
            height: '10px',
            boxShadow: `${HashColor} 10px -20px, ${HashColor} -10px 20px`,
        },
        '100%': {
            boxShadow: `${HashColor} 10px 20px, ${HashColor} -10px -20px`,
        },
    },
    style1: {
        position: 'absolute',
        content: "''",
        top: '50%',
        left: '50%',
        display: 'block',
        width: '10px',
        height: '10px',
        borderRadius: '5px',
        transform: 'translate(-50%, -50%)',
        animation: '2s ease 0s infinite normal none running $animation-1',
    },
    style2: {
        position: 'absolute',
        content: "''",
        top: '50%',
        left: '50%',
        display: 'block',
        width: '10px',
        height: '10px',
        borderRadius: '5px',
        transform: 'translate(-50%, -50%)',
        animation: '2s ease 0s infinite normal none running $animation-2',
    },
    wrapper: {
        position: 'relative',
        width: 50,
        height: 50,
        transform: 'rotate(165deg)',
        display: 'inline-block',
    },
});
