import * as React from 'react';
import * as classNames from 'classnames';

const styles = require('../styles/button.scss');

interface IButtonPropsType {
    text: string;
    width?: number;
    onClick?(): void;
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
        style={ (props.width) ? {width: props.width} : undefined }
        className={classNames(styles.facebookBtn, styles.btn, styles.gradient)}
        onClick={ (e) => {
            ga('send', 'event', {
                eventCategory: 'user',
                eventAction: 'click',
                eventLabel: props.text,
            });
            props.onClick();
        }}
    >
        <div className={styles.wrap} >
            {props.text}
        </div>
    </div>
);

export { FacebookButton, GoogleButton};
