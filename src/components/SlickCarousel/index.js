import React from 'react';
import Slider from 'react-slick';
import WaveButton from '../CustomButton/WaveButton';
import { useProjectListQuery } from 'src/hooks/query';
// style
import styles from './styles.module.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import SlickItem from 'src/components/SlickCarousel/SlickItem';
import { useNavigate } from 'react-router-dom';

function BitmoonSlider() {
  const navigate = useNavigate();
  const { data: projectListRes } = useProjectListQuery();
  const projectList = projectListRes?.data;
  const slidesToShow = projectList?.length > 3 ? 3 : projectList?.length;
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: slidesToShow,
    speed: 500,
    dots: false,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: 0,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: 0,
        },
      },
    ],
  };

  const onButtonClick = () => {
    navigate('/list');
  };

  if (!projectList) {
    return <div>Loading....</div>;
  }

  return (
    <div className={styles['slick-container']}>
      <Slider {...settings}>
        {projectList.map((project) => {
          return <SlickItem project={project} key={project.id} />;
        })}
      </Slider>
      <div className={styles['view-all-container']}>
        <WaveButton title="view all" onClick={onButtonClick} />
      </div>
    </div>
  );
}

export default BitmoonSlider;
