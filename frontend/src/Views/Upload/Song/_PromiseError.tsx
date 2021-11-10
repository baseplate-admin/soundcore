import { Fragment } from 'react';
import { IoCloudOfflineOutline } from 'react-icons/io5';
import { IconColor } from '../../../Config/Colors/Icons';

interface IPromiseErrorChildComponent {
    errorFiles: Object[];
}

export const PromiseErrorChildComponent = (
    props: IPromiseErrorChildComponent
) => {
    return (
        <Fragment>
            <div className="columns is-mobile is-centered">
                <div className="column is-narrow">
                    <div
                        className="box"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <IoCloudOfflineOutline
                            color={IconColor?.WHITE_ICON}
                            style={{ transform: 'scale(4)' }}
                        />
                    </div>
                </div>
            </div>
            <div>{props?.errorFiles}</div>
        </Fragment>
    );
};
