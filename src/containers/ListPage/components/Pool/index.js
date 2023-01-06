import React from 'react';
import SlickItem from 'src/components/SlickCarousel/SlickItem';
import longHightLight from 'src/assets/images/long-hight-light.png';
import styles from './styles.module.less';

function Pool({ projects, title }) {
  return (
    <div className={styles['next-to-launch-container']}>
      <p className={styles['upcoming-text']}>Upcoming</p>
      <img className={styles['hight-light']} src={longHightLight} alt="hight-light" />
      <h3 className={styles['title']}>{title}</h3>
      <div className={styles['list-item']}>
        {projects.map((project) => {
          return <SlickItem project={project} className={styles['custom-slick-item']} key={project.id} />;
        })}
      </div>
    </div>
  );
}

export default Pool;
