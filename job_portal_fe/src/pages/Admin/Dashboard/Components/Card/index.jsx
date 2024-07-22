import React from 'react';
import styles from './styles.module.scss';

function Card(props) {
    return (
        <div className={`${styles.card}`}>
            <div className={styles['card-content']}>
                <span className={styles['card-title']}>
                    {props.count}
                </span>
                <span className={styles['card-subtitle']}>
                    {props.cardTitle}
                </span>
            </div>
        </div>
    );
}

export default Card;
