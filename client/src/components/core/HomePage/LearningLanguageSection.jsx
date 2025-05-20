import HighlightText from './HighlightText';
import know_your_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png';
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

        <div className="flex flex-col lg:flex-row items-center justify-center mt-5">
          <img
            src={know_your_progress}
            alt="KNowYourProgressImage"
            className="object-contain lg:-mr-32 "
          />
          <img
            src={compare_with_others}
            alt="KNowYourProgressImage"
            className="object-contain"
          />
          <img
            src={plan_your_lesson}
            alt="KNowYourProgressImage"
            className="object-contain lg:-ml-36"
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
