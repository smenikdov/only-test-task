import React, { useState, useCallback, useRef } from 'react';
import styles from './Timeline.module.scss';
import { BREAKPOINTS } from '../../constants';

import CircleButton from '../CircleButton';
import ShowTransition from '../ShowTransition';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as LeftArrow } from '../../assets/icons/left-arrow.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/right-arrow.svg';

import type { TimelineSwiperProps } from './Timeline.types';
import type { Swiper as SwiperClass } from 'swiper/types';

const TimelineSwiper: React.FC<TimelineSwiperProps> = React.memo(({ events }) => {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [swiperIsBegin, setSwiperIsBegin] = useState(true);
    const [swiperIsEnd, setSwiperIsEnd] = useState(false);

    const handleEventPrev = useCallback(() => swiperRef.current?.slidePrev(), []);
    const handleEventNext = useCallback(() => swiperRef.current?.slideNext(), []);

    return (
        <div className={styles.timelineSwiper}>
            <Swiper
                onSwiper={(swiper: SwiperClass) => {
                    swiperRef.current = swiper;
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
                {events.map((event, index) => (
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
    );
});

export default TimelineSwiper;
