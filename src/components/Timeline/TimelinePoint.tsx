import React from 'react';
import classnames from 'classnames';
import styles from './Timeline.module.scss';
import { ANGLE_OFFSET } from './Timeline.constants';
import type { TimelinePointProps } from './Timeline.types';

const TimelinePoint: React.FC<TimelinePointProps> = React.memo((props) => {
    const { radius, index, totalLength, activeTopicIndex, name, onClick } = props;

    const oneItemAngle = Math.PI / totalLength * 2;
    const globalAngle = -(ANGLE_OFFSET + 360 / totalLength * activeTopicIndex);
    const angle = oneItemAngle * index;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return (
        <button
            className={classnames(
                styles.timelinePoint,
                {[styles.timelinePointActive]: activeTopicIndex === index},
            )}
            style={{ transform: `translate(${x}px, ${y}px)`, rotate: `${globalAngle}deg` }}
            aria-label={`Перейти к событию «${name}»`}
            title={`Перейти к событию «${name}»`}
            onClick={onClick}
        >
            <div className={styles.timelinePointIndex} style={{ rotate: `${-globalAngle}deg` }}>
                {index + 1}
            </div>
        </button>
    );
});

export default TimelinePoint;
