import React from 'react';
import styles from './styles.module.scss';

function Card() {
    return (
        <div className={`${styles.card}`}>
            <img
                alt=""
                className={styles['card-img']}
                src="/static/metronic/tailwind/dist/assets/media/brand-logos/linkedin-2.svg"
            />
            <div className={styles['card-content']}>
                <span className={styles['card-title']}>
                    9
                </span>
                <span className={styles['card-subtitle']}>
                    Jobs
                </span>
            </div>
        </div>
    );
}

export default Card;
