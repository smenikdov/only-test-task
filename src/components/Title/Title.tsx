import React from 'react';
import styles from './Title.module.scss';
import classnames from 'classnames';
import type { TitleProps } from './Title.types';

const Title: React.FC<TitleProps> = (props) => {
    return (
        <h2 className={classnames(styles.title, props.className)}>
            {props.text}
        </h2>
    );
};

export default Title;
