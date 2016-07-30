import * as React from 'react';
import * as classNames from 'classnames';

const styles = require('../styles/button.scss');

interface IButtonPropsType {
    text: string;
    onClick(): void;
}

const GoogleButton = (props: IButtonPropsType) => (
    <div
        className={classNames(styles['google-btn'], styles.btn)}
        onClick={props.onClick}
    >
    <div className={styles.wrap} >
        <i className='fi-social-google-plus'></i>
        {props.text}
    </div>

    </div>
);

const FacebookButton = (props: IButtonPropsType) => (
    <div
        className={classNames(styles.facebookBtn, styles.btn, styles.gradient)}
        onClick={props.onClick}
    >
        <div className={styles.wrap} >
            {props.text}
        </div>
    </div>
);

export { FacebookButton, GoogleButton};
