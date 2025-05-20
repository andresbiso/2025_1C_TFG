import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
import Course_Slider from '../components/core/Catalog/Course_Slider';

import { getCatalogPageData } from '../services/operations/pageAndComponentData';

import { MdOutlineRateReview } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';

import { motion } from 'framer-motion';
import { fadeIn } from './../components/common/motionFrameVarients';

// background random images
import backgroundImg1 from '../assets/Images/random bg img/coding bg1.jpg';
import backgroundImg2 from '../assets/Images/random bg img/coding bg2.jpg';
import backgroundImg3 from '../assets/Images/random bg img/coding bg3.jpg';
import backgroundImg4 from '../assets/Images/random bg img/coding bg4.jpg';
import backgroundImg5 from '../assets/Images/random bg img/coding bg5.jpg';
import backgroundImg6 from '../assets/Images/random bg img/coding bg6.jpeg';
import backgroundImg7 from '../assets/Images/random bg img/coding bg7.jpg';
import backgroundImg8 from '../assets/Images/random bg img/coding bg8.jpeg';
import backgroundImg9 from '../assets/Images/random bg img/coding bg9.jpg';
import backgroundImg10 from '../assets/Images/random bg img/coding bg10.jpg';
import backgroundImg111 from '../assets/Images/random bg img/coding bg11.jpg';

const randomImges = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  backgroundImg5,
  backgroundImg6,
  backgroundImg7,
  backgroundImg8,
  backgroundImg9,
  backgroundImg10,
  backgroundImg111,
];

// hardcoded

const Home = () => {
  // get background random images
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    const bg = randomImges[Math.floor(Math.random() * randomImges.length)];
    setBackgroundImg(bg);
  }, []);

  // console.log('bg ==== ', backgroundImg)

  // get courses data
  const [CatalogPageData, setCatalogPageData] = useState(null);
  const categoryID = '6506c9dff191d7ffdb4a3fe2'; // hard coded
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCatalogPageData = async () => {
      const result = await getCatalogPageData(categoryID, dispatch);
      setCatalogPageData(result);
      // console.log("page data ==== ",CatalogPageData);
    };
    if (categoryID) {
      fetchCatalogPageData();
    }
  }, [categoryID, dispatch]);

  // console.log('================ CatalogPageData?.selectedCourses ================ ', CatalogPageData)

  return (
    <React.Fragment>
      {/* background random image */}
      <div>
        <div className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover ">
          <img
            src={backgroundImg}
            alt="Background"
            className="w-full h-full object-cover "
          />

          <div className="absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg "></div>
        </div>
      </div>

      <div className=" ">
        {/*Section1  */}
        <div className="relative h-[450px] md:h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white ">
          <Link to={'/signup'}>
            <div
              className="z-0 group p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                                        transition-all duration-200 hover:scale-95 w-fit"
            >
              <div
                className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                              transition-all duration-200 group-hover:bg-richblack-900"
              >
                <p>Convertirse en intructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>

          <motion.div
            variants={fadeIn('left', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center text-3xl lg:text-4xl font-semibold mt-7  "
          >
            Empodera to futuro con
            <HighlightText text={'Habilidades de desarrollo de software'} />
          </motion.div>

          <motion.div
            variants={fadeIn('right', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className=" mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300"
          >
            Con nuestros cursos de programación en línea, puedes aprender a tu
            propio ritmo, desde cualquier lugar del mundo, y acceder a una gran
            cantidad de recursos, incluyendo proyectos prácticos, cuestionarios
            y comentarios personalizados de los instructores.
          </motion.div>

          <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={'/signup'}>
              Más Información
            </CTAButton>

            <CTAButton active={false} linkto={'/login'}>
              Reservá una demostración
            </CTAButton>
          </div>
        </div>

        {/* animated code */}
        <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
          {/* Code block 1 */}
          <div className="">
            <CodeBlocks
              position={'lg:flex-row'}
              heading={
                <div className="text-3xl lg:text-4xl font-semibold">
                  Desbloquea tu{' '}
                  <HighlightText
                    text={'potencial como desarrollador de software'}
                  />
                  con nuestros cursos en línea
                </div>
              }
              subheading={
                'Nuestros cursos están diseñados e impartidos por expertos de la industria que tienen años de experiencia en codificación y están apasionados por compartir sus conocimientos con usted.'
              }
              ctabtn1={{
                btnText: 'Pruébalo tú mismo',
                linkto: '/signup',
                active: true,
              }}
              ctabtn2={{
                btnText: 'Más Información',
                linkto: '/login',
                active: false,
              }}
              codeblock={`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Profile Card</title>
                    <style>
                        .profile {
                            width: 250px;
                            padding: 20px;
                            border: 1px solid #ccc;
                            border-radius: 10px;
                            text-align: center;
                            background-color: #f9f9f9;
                        }
                        .profile img {
                            width: 100px;
                            border-radius: 50%;
                        }
                    </style>
                </head>
                <body>
                    <div class="profile">
                        <img src="profile.jpg" alt="Profile Picture">
                        <h2>John Doe</h2>
                        <p>Web Developer | Tech Enthusiast</p>
                        <a href="mailto:johndoe@example.com">Contact Me</a>
                    </div>
                </body>
                </html>
              `}
              codeColor={'text-yellow-25'}
              backgroundGradient={'code-block1-grad'}
            />
          </div>

          {/* Code block 2 */}
          <div>
            <CodeBlocks
              position={'lg:flex-row-reverse'}
              heading={
                <div className="w-[100%] text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                  Comienza a
                  <HighlightText text={'programar en segundos'} />
                </div>
              }
              subheading={
                'Anímate a probarlo. Nuestro entorno de aprendizaje práctico te permitirá escribir código real desde tu primera lección.'
              }
              ctabtn1={{
                btnText: 'Continuar lección',
                link: '/signup',
                active: true,
              }}
              ctabtn2={{
                btnText: 'Más Información',
                link: '/signup',
                active: false,
              }}
              codeColor={'text-white'}
              codeblock={`
                import React from "react";
                import CTAButton from "./Button";
                import TypeAnimation from "react-type";
                import { FaArrowRight } from "react-icons/fa";

                const Home = () => {
                    return (
                        <div>Home</div>
                    );
                };

                export default Home;
              `}
              backgroundGradient={'code-block2-grad'}
            />
          </div>

          {/* course slider */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent">
            <h2 className="text-white mb-6 text-2xl ">
              Selecciones populares para ti 🏆
            </h2>
            <Course_Slider
              courses={CatalogPageData?.selectedCategory?.courses}
            />
          </div>
          <div className=" mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent">
            <h2 className="text-white mb-6 text-2xl ">
              Las mayores inscripciones de hoy 🔥
            </h2>
            <Course_Slider courses={CatalogPageData?.mostSellingCourses} />
          </div>

          <ExploreMore />
        </div>

        {/*Section 2  */}
        <div className="bg-pure-greys-5 text-richblack-700 ">
          <div className="homepage_bg h-[310px]">
            <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
              <div className="h-[150px]"></div>
              <div className="flex flex-row gap-7 text-white ">
                <CTAButton active={true} linkto={'/signup'}>
                  <div className="flex items-center gap-3">
                    Explora el catálogo completo
                    <FaArrowRight />
                  </div>
                </CTAButton>
                <CTAButton active={false} linkto={'/signup'}>
                  <div>Más Información</div>
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
            <div className="flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]">
              <div className="text-3xl lg:text-4xl font-semibold w-full lg:w-[45%]">
                Obtenga las habilidades que necesita para un
                <HighlightText text={'trabajo que se encuentra demandado'} />
              </div>

              <div className="flex flex-col gap-10 w-full lg:w-[40%] items-start">
                <div className="text-[16px]">
                  Hoy en día, ser un especialista competitivo requiere más que
                  habilidades profesionales.
                </div>
                <CTAButton active={true} linkto={'/signup'}>
                  <div>Más Información</div>
                </CTAButton>
              </div>
            </div>

            {/* leadership */}
            <TimelineSection />

            <LearningLanguageSection />
          </div>
        </div>

        {/*Section 3 */}
        <div className="mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
          <InstructorSection />

          {/* Reviws from Other Learner */}
          <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
            Reseñas de otros estudiantes{' '}
            <MdOutlineRateReview className="text-yellow-25" />
          </h1>
          <ReviewSlider />
        </div>

        {/*Footer */}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
