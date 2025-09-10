import React, { useMemo, useState, useCallback } from 'react';
import classnames from 'classnames';
import Title from '../Title';
import Container from '../Container';
import CircleButton from '../CircleButton';
import styles from './Timeline.module.scss';

import { ReactComponent as LeftArrow } from '../../assets/icons/left-arrow.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/right-arrow.svg';

import type { TimelineProps } from './Timeline.types';

const Timeline: React.FC<TimelineProps> = ({ title, topics }) => {
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);
    const handleTopicPrev = () => setActiveTopicIndex((prev) => prev - 1);
    const handleTopicNext = () => setActiveTopicIndex((prev) => prev + 1);


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

            </section>
        </Container>
    );
};

export default Timeline;
