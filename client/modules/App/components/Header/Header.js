import React from 'react';
import styles from './Header.css';

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <h1 className={styles['site-title']}>BTC_ETH Combined Order Books</h1>
            </div>
        </div>
    );
}

export default Header;
