import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import {  Pagination } from "swiper"

import Course_Card from './Course_Card';

function Course_Slider({ courses }) {
  return (
    <>
      {courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          // modules={[ Pagination]}

          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem] pt-8 px-2"
        >
          {courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} height={'h-[250px]'} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col sm:flex-row gap-6 ">
          <p className=" h-[201px] w-full rounded-xl  skeleton"></p>
          <p className=" h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
          <p className=" h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
        </div>
      )}
    </>
  );
}

Course_Slider.propTypes = {
  courses: PropTypes.any,
};

export default Course_Slider;
