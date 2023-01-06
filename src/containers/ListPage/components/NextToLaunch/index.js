import React from 'react';
import { Skeleton } from 'antd';
import SlickItem from 'src/components/SlickCarousel/SlickItem';
import styles from './styles.module.less';

function NextToLaunch({ projects }) {
  if (!projects) {
    return null;
  }
  return (
    <div className={styles['next-to-launch-container']}>
      <h3 className={styles['title']}>Next to launch</h3>
      <div className={styles['list-item']}>
        {projects.map((project) => {
          return <SlickItem className={styles["custom-slick-item"]} project={project} key={project.id} />;
        })}
      </div>
    </div>
  );
}

export default NextToLaunch;
