import HighlightText from './HighlightText';
import image_01 from '../../../assets/images/learning_language/learning_language_01.png';
import image_02 from '../../../assets/images/learning_language/learning_language_02.png';
import image_03 from '../../../assets/images/learning_language/learning_language_03.png';
import CTAButton from '../HomePage/Button';

const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-10">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-3xl lg:text-4xl font-semibold text-center">
          Tu navaja suiza para
          <HighlightText text={'aprender cualquier lenguaje'} />
        </div>

        <div className="lg:text-center text-richblack-600 mx-auto text-base font-medium lg:w-[70%]">
          La plataforma facilita el aprendizaje de varios idiomas. Con más de 20
          idiomas, seguimiento del progreso, programación personalizada y mucho
          más.
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center mt-5 w-[1000px] h-[700px]">
          <img
            src={image_01}
            alt="learning language image 1"
            className="object-contain w-[340px] rotate-[-10deg] -mr-24 z-10"
          />
          <img
            src={image_02}
            alt="learning language image 2"
            className="object-contain w-[340px] rotate-[10deg] -mr-24 z-20"
          />
          <img
            src={image_03}
            alt="learning language image 3"
            className="object-contain w-[340px] rotate-[-5deg] z-30"
          />
        </div>

        <div className="w-fit">
          <CTAButton active={true} linkto={'/signup'}>
            <div>Más Información</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
