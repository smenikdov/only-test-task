import React, { useMemo, useState, useCallback } from 'react';
import classnames from 'classnames';
import { BREAKPOINTS } from '../../constants';
import { ANGLE_OFFSET } from './Timeline.constants';
import useWindowSize from '../../hooks/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import styles from './Timeline.module.scss';

import Title from '../Title';
import Counter from '../Counter';
import Container from '../Container';
import CircleButton from '../CircleButton';
import TimelinePoint from './TimelinePoint';
import ShowTransition from '../ShowTransition';
import SwitchTransition from '../SwitchTransition';

import { ReactComponent as LeftArrow } from '../../assets/icons/left-arrow.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/right-arrow.svg';

import type { TimelineProps } from './Timeline.types';
import type { Swiper as SwiperClass } from 'swiper/types';

const formatIndex = (num: number) => num.toString().padStart(2, '0');

const Timeline: React.FC<TimelineProps> = ({ title, topics }) => {
    const windowSize = useWindowSize();
    const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);
    const [swiperIsBegin, setSwiperIsBegin] = useState(true);
    const [swiperIsEnd, setSwiperIsEnd] = useState(true);

    const handleTopicPrev = () => setActiveTopicIndex((prev) => prev - 1);
    const handleTopicNext = () => setActiveTopicIndex((prev) => prev + 1);

    const handleEventPrev = useCallback(() => swiperRef?.slidePrev(), [swiperRef]);
    const handleEventNext = useCallback(() => swiperRef?.slideNext(), [swiperRef]);

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
                    <div className={styles.timelineSwiper}>
                        <Swiper
                            onSwiper={(swiper: SwiperClass) => {
                                setSwiperRef(swiper);
                                setSwiperIsBegin(swiper.isBeginning);
                                setSwiperIsEnd(swiper.isEnd);
                            }}
                            onSlideChange={(swiper: SwiperClass) => {
                                setSwiperIsBegin(swiper.isBeginning);
                                setSwiperIsEnd(swiper.isEnd);
                            }}
                            spaceBetween={10}
                            slidesPerView="auto"
                            centeredSlides={false}
                            slidesOffsetBefore={20}
                            breakpoints={{
                                [BREAKPOINTS.SM]: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                    slidesOffsetBefore: 0,
                                },
                                [BREAKPOINTS.XL]: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                    slidesOffsetBefore: 0,
                                }
                            }}
                        >
                            {activeTopic.events.map((event, index) => (
                                <SwiperSlide key={index} className={styles.event}>
                                    <h3 className={styles.eventYear}>{event.year}</h3>
                                    <p className={styles.eventName}>{event.name}</p>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <ShowTransition isVisible={!swiperIsBegin}>
                            <CircleButton
                                size="sm"
                                icon={<LeftArrow />}
                                variant="filled"
                                className={styles.timelineArrowPrev}
                                aria-label="Предыдущее событие"
                                onClick={handleEventPrev}
                            />
                        </ShowTransition>
                        <ShowTransition isVisible={!swiperIsEnd}>
                            <CircleButton
                                size="sm"
                                icon={<RightArrow />}
                                variant="filled"
                                className={styles.timelineArrowNext}
                                aria-label="Следующие событие"
                                onClick={handleEventNext}
                            />
                        </ShowTransition>
                    </div>
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
