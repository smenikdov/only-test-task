import React from 'react';
import styles from './Container.module.scss';
import classnames from 'classnames';
import type { ContainerProps } from './Container.types';

const Container: React.FC<ContainerProps> = (props) => {
    return (
        <div className={classnames(styles.container, props.className)}>
            {props.children}
        </div>
    );
};

export default Container;
