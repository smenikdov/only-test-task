import React from 'react';
import { CSSTransition } from 'react-transition-group';
import type { ShowTransitionProps } from './ShowTransition.types';

const ShowTransition: React.FC<ShowTransitionProps> = (props) => {
    const {
        children,
        isVisible,
        name = 'fade',
        timeout = 500,
    } = props;
    const nodeRef = React.useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            classNames={name}
            in={isVisible}
            timeout={timeout}
            mountOnEnter
            unmountOnExit
        >
            <div ref={nodeRef}>
                {children}
            </div>
        </CSSTransition>
    );
};

export default ShowTransition;
