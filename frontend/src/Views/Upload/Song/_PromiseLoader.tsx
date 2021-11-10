import { useEffect, useState, Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import {
    randomSpinnerPicker,
    SpinnerComponent,
} from '../../../Components/Spinners/Spinners';
import { UploadSongVariables } from './variables';

export const PromiseLoaderChildComponent = () => {
    const [spinner, setSpinner] = useState('');

    useEffect(() => {
        const randomSpinnerItem = randomSpinnerPicker();
        setSpinner(randomSpinnerItem.toString());
    }, []);
    const classes = useStyles();
    
    return (
        <Fragment>
            <div className="columns is-mobile is-centered">
                <div className="column is-narrow">
                    <div
                        className="box"
                        style={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                        }}
                    >
                        <SpinnerComponent type={spinner} />
                    </div>
                </div>
            </div>
            <div className="columns is-mobile is-centered">
                <div className="column is-narrow">
                    <p className={`heading ${classes?.['file_uploaded_text']}`}>
                        Uploading Songs
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

const useStyles = createUseStyles({
    file_uploaded_text: {
        color: UploadSongVariables?.mainFontColor,
    },
});
