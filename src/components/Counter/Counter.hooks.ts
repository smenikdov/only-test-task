import { useState, useEffect } from 'react';

export const useCounter = (value: number, step: number = 1) => {
    const [count, setCount] = useState(value);

    useEffect(() => {
        const difference = Math.abs(value - count);
        const duration = Math.min(difference * 50, 1000);
        const increment = value > count ? step : -step;

        if (difference === 0) return;

        const intervalTime = duration / difference;
        const interval = setInterval(() => {
            setCount(current => {
                const next = current + increment;
                if ((increment > 0 && next >= value) || (increment < 0 && next <= value)) {
                    clearInterval(interval);
                    return value;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [value, step, count]);

    return count;
};
