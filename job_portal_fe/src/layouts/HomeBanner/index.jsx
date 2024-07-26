import React from "react";
import styles from "./styles.module.css"
const HomeBanner = () => {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/path-to-your-logo.png" alt="Website Logo" className={styles.logoImage} />
        </div>
        <button className={styles.postJobButton}>Post a Job</button>
      </header>
    );
  };


export default HomeBanner;