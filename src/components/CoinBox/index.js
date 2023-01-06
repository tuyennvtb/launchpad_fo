import React from 'react';

function CoinBox() {
  return (
    <div className={styles['slick-item']}>
      <span className={styles.status}>public</span>
      {/* <img src={miniBanner} className={styles['slick-banner']} alt="mini-banner" /> */}
      <div className={styles['fake-banner']} />
      <div>
        <span className={styles["title"]}>Theta Arena ( THG)</span>
      </div>
      <a href="" className={styles['btn-time-tba']}>
        Time: TBA
      </a>
    </div>
  )
}

export default CoinBox;