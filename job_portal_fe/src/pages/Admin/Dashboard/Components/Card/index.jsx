import React from 'react';
import styles from './styles.module.scss';

function Card(props) {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <span className={styles.cardTitle}>
                    {props.count}
                </span>
                <span className={styles.cardSubtitle}>
                    {props.cardTitle}
                </span>
            </div>
        </div>
    );
}

export default Card;
