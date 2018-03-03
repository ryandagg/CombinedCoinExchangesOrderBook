import React from 'react';
import styles from './Footer.css';
import bg from '../../header-bk.png';

export function Footer() {
    return (
        <div style={{ background: `#FFF url(${bg}) center` }} className={styles.footer}>
        </div>
    );
}

export default Footer;
