import React from 'react';
import classNames from 'classnames';
import styles from './CircleButton.module.scss';
import type { CircleButtonProps } from './CircleButton.types';

const CircleButton: React.FC<CircleButtonProps> = ({
    icon,
    disabled,
    onClick,
    className,
    variant = 'outlined',
    size = 'md',
    ...otherProps
}) => {
    const mergedClassName = classNames(styles.circleButton, styles[variant], styles[size], className);

    return (
        <button
            {...otherProps}
            className={mergedClassName}
            disabled={disabled}
            onClick={onClick}
        >
            {icon}
        </button>
    );
};

export default CircleButton;
