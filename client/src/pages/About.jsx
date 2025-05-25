import FoundingStory from '../assets/images/FoundingStory.png';
import BannerImage1 from '../assets/images/aboutus1.webp';
import BannerImage2 from '../assets/images/aboutus2.webp';
import BannerImage3 from '../assets/images/aboutus3.webp';

import Footer from '../components/common/Footer';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import Quote from '../components/core/AboutPage/Quote';
import StatsComponenet from '../components/core/AboutPage/Stats';
import HighlightText from '../components/core/HomePage/HighlightText';
import Img from '../components/common/Img';
import ReviewSlider from './../components/common/ReviewSlider';

import { motion } from 'framer-motion';
import { fadeIn } from '../components/common/motionFrameVarients';

const About = () => {
  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <motion.header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            <motion.p
              variants={fadeIn('down', 0.1)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
            >
              {' '}
              Impulsando la innovación en educación en línea para un
              <HighlightText text={'Futuro Brillante'} />
            </motion.p>

            <motion.p
              variants={fadeIn('up', 0.1)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]"
            >
              Nuestra plataforma está a la vanguardia de la educación en línea.
              Nos apasiona crear un futuro más brillante ofreciendo cursos
              innovadores, aprovechando tecnologías emergentes y fomentando una
              comunidad de aprendizaje dinámica.
            </motion.p>
          </motion.header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>

          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <Img src={BannerImage1} alt="Imagen 1" />
            <Img src={BannerImage2} alt="Imagen 2" />
            <Img src={BannerImage3} alt="Imagen 3" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <motion.div
              variants={fadeIn('right', 0.1)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
              className="my-24 flex lg:w-[50%] flex-col gap-10"
            >
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Nuestra Historia Fundacional
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Nuestra plataforma de aprendizaje en línea nació de una visión
                compartida y una pasión por transformar la educación. Todo
                comenzó con un grupo de educadores, tecnólogos y estudiantes de
                por vida que reconocieron la necesidad de oportunidades de
                aprendizaje accesibles, flexibles y de alta calidad en un mundo
                digital en constante evolución.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Como educadores experimentados, fuimos testigos de primera mano
                de las limitaciones de los sistemas educativos tradicionales.
                Creemos que la educación no debe estar confinada a las paredes
                de un aula ni restringida por fronteras geográficas. Queríamos
                construir una plataforma que permitiera a personas de todo el
                mundo alcanzar su máximo potencial.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn('left', 0.1)}
              initial="hidden"
              whileInView={'show'}
              viewport={{ once: false, amount: 0.1 }}
            >
              <Img
                src={FoundingStory}
                alt="Historia Fundacional"
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </motion.div>
          </div>

          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Nuestra Visión
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Con esta visión en mente, emprendimos un viaje para crear una
                plataforma de aprendizaje en línea que revolucionara la manera
                en que las personas aprenden. Nuestro equipo de expertos trabajó
                arduamente para desarrollar una plataforma robusta e intuitiva
                que combina tecnología avanzada con contenido atractivo,
                fomentando una experiencia de aprendizaje dinámica e
                interactiva.
              </p>
            </div>

            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Nuestra Misión
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Nuestra misión va más allá de simplemente ofrecer cursos en
                línea. Queremos crear una comunidad vibrante de estudiantes
                donde las personas puedan conectarse, colaborar y aprender unos
                de otros. Creemos que el conocimiento florece en un entorno de
                intercambio y diálogo, y promovemos este espíritu a través de
                foros, sesiones en vivo y oportunidades de networking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />

      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <div className="my-20 px-5 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reseñas de otros estudiantes
        </h1>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  );
};

export default About;
