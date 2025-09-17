import React, { useMemo, useState, useCallback } from 'react';
import classnames from 'classnames';
import { BREAKPOINTS } from '../../constants';
import { ANGLE_OFFSET } from './Timeline.constants';
import useWindowSize from '../../hooks/useWindowSize';

import 'swiper/css';
import styles from './Timeline.module.scss';

import Title from '../Title';
import Counter from '../Counter';
import Container from '../Container';
import CircleButton from '../CircleButton';
import TimelinePoint from './TimelinePoint';
import TimelineSwiper from './TimelineSwiper';
import SwitchTransition from '../SwitchTransition';

import { ReactComponent as LeftArrow } from '../../assets/icons/left-arrow.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/right-arrow.svg';

import type { TimelineProps } from './Timeline.types';

const formatIndex = (num: number) => num.toString().padStart(2, '0');

const Timeline: React.FC<TimelineProps> = ({ title, topics }) => {
    const windowSize = useWindowSize();
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);

    const handleTopicPrev = () => setActiveTopicIndex((prev) => prev - 1);
    const handleTopicNext = () => setActiveTopicIndex((prev) => prev + 1);

    const circleRadius = windowSize.width < BREAKPOINTS.LG ? 165 : 268;
    const x = useMemo(() => circleRadius * Math.cos(ANGLE_OFFSET * Math.PI / 180), [circleRadius]);
    const y = useMemo(() => circleRadius * Math.sin(-ANGLE_OFFSET * Math.PI / 180), [circleRadius]);

    if (!topics.length) {
        return (
            <Container>
                <section className={styles.timeline}>
                    <Title text={title} />
                    <p>
                        Данные не найдены, попробуйте позже, а пока посмотрите другие наши продукты →
                    </p>
                </section>
            </Container>
        )
    }

    const activeTopic = topics[activeTopicIndex];

    return (
        <Container>
            <section className={styles.timeline}>
                <Title text={title} />

                <div className={styles.timelinePeriod}>
                    <Counter
                        value={activeTopic.startYear}
                        className={styles.timelineStartYear}
                    />
                    <Counter
                        value={activeTopic.endYear}
                        className={styles.timelineEndYear}
                    />

                    <div className={styles.timelineVerticalLine} />
                    <div className={styles.timelineCircle} style={{ width: circleRadius * 2, height: circleRadius * 2 }} />

                    <div
                        className={styles.timelineActiveTopic}
                        style={{ transform: `translate(calc(${x}px + 50% + 40px), ${y}px)` }}
                    >
                        <SwitchTransition keyValue={activeTopicIndex}>
                            {activeTopic.name}
                        </SwitchTransition>
                    </div>

                    {topics.map((topic, index) => (
                        <TimelinePoint
                            key={index}
                            name={topic.name}
                            radius={circleRadius}
                            index={index}
                            totalLength={topics.length}
                            activeTopicIndex={activeTopicIndex}
                            onClick={() => setActiveTopicIndex(index)}
                        />
                    ))}
                </div>

                <div className={styles.timelineContent}>
                    <div className={styles.timelineCounter}>
                        {formatIndex(activeTopicIndex + 1)}/{formatIndex(topics.length)}
                    </div>

                    <div className={styles.timelineNavigation}>
                        <CircleButton
                            icon={<LeftArrow />}
                            disabled={activeTopicIndex === 0}
                            aria-label="Предыдущяя область"
                            onClick={handleTopicPrev}
                        />
                        <CircleButton
                            icon={<RightArrow />}
                            disabled={activeTopicIndex === topics.length - 1}
                            aria-label="Следующяя область"
                            onClick={handleTopicNext}
                        />
                    </div>
                </div>

                <SwitchTransition keyValue={activeTopicIndex}>
                    <TimelineSwiper events={activeTopic.events} />
                </SwitchTransition>

                <div className={styles.timelinePagination}>
                    {topics.map((topic, index) => (
                        <button
                            key={index}
                            className={classnames(styles.timelinePaginationItem, {[styles.timelinePaginationItemActive]: index === activeTopicIndex})}
                            aria-label={`Перейти к области «${topic.name}»`}
                            onClick={() => setActiveTopicIndex(index)}
                        />
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default Timeline;
