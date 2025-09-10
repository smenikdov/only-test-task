import React from 'react';
import { useCounter } from './Counter.hooks';
import type { CounterProps } from './Counter.types';

const Counter: React.FC<CounterProps> = (props) => {
    const {
        value,
        step = 1,
        className,
    } = props;

    const count = useCounter(value, step);

    return (
        <div className={className}>
            {count}
        </div>
    );
};

export default Counter;
