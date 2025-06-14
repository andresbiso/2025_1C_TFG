import { MdDiamond } from 'react-icons/md';
import { SlBadge } from 'react-icons/sl';
import { FaGraduationCap } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa6';

import timelineImage from '../../../assets/images/timeline/timeline_01.png';

import Img from './../../common/Img';

import { motion } from 'framer-motion';
import { fadeIn } from '../../common/motionFrameVarients';

const timeline = [
  {
    Logo: SlBadge,
    heading: 'Liderazgo',
    Description: 'Totalmente comprometidos con el éxito de la empresa',
  },
  {
    Logo: FaGraduationCap,
    heading: 'Responsabilidad',
    Description: 'Los estudiantes siempre serán nuestra máxima prioridad',
  },
  {
    Logo: MdDiamond,
    heading: 'Flexibilidad',
    Description: 'La capacidad de adaptación es una habilidad importante',
  },
  {
    Logo: FaCode,
    heading: 'Resolver problemas',
    Description: 'Codifica tu camino hacia una solución',
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-15 items-center">
        <motion.div
          variants={fadeIn('right', 0.1)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.1 }}
          className="w-full lg:w-[45%] flex flex-col gap-5"
        >
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-6" key={index}>
                <div className="w-[50px] h-[50px] rounded-full bg-richblue-500 flex justify-center items-center">
                  <element.Logo color="white" size={30} />
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeIn('left', 0.1)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.1 }}
          className="relative shadow-blue-200"
        >
          <Img
            src={timelineImage}
            alt="Imagen de línea de tiempo"
            className="shadow-white object-cover h-fit scale-x-[-1] w-[550px] rounded-lg"
          />

          <div
            className=" absolute bg-blue-700 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-70%] rounded-3xl"
          >
            <div className="flex flex-row gap-5 items-center border-r border-blue-300 px-7">
              <p className="text-2xl lg:text-3xl font-bold">10</p>
              <p className="text-xs lg:text-sm">Años de experiencia</p>
            </div>

            <div className="flex gap-5 items-center px-7">
              <p className="text-2xl lg:text-3xl font-bold">250</p>
              <p className="text-xs lg:text-sm">Tipos de cursos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineSection;
