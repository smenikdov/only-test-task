import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import type { SwitchTransitionProps } from './SwitchTransition.types';

const SwitchTransitionCustom: React.FC<SwitchTransitionProps> = (props) => {
    const {
        children,
        keyValue,
        name = 'fade',
        timeout = 500,
    } = props;
    const nodeRef = React.useRef(null);

    return (
        <SwitchTransition>
            <CSSTransition
                key={keyValue}
                timeout={timeout}
                nodeRef={nodeRef}
                classNames={name}
            >
                <div ref={nodeRef}>
                    {children}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};

export default SwitchTransitionCustom;
