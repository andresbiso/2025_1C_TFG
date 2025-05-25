import HighlightText from '../../../components/core/HomePage/HighlightText';
import CTAButton from '../../../components/core/HomePage/Button';

const LearningGridArray = [
  {
    order: -1,
    heading: 'Aprendizaje de Clase Mundial para',
    highlightText: 'Cualquiera, en Cualquier Lugar',
    description:
      'La plataforma se asocia con universidades y empresas líderes para ofrecer un aprendizaje en línea flexible y relevante para el trabajo, dirigido a individuos y organizaciones de todo el mundo.',
    BtnText: 'Más Información',
    BtnLink: '/',
  },
  {
    order: 1,
    heading: 'Plan de Estudios Basado en Necesidades de la Industria',
    description:
      '¡Ahorra tiempo! El plan de estudios está diseñado para ser más fácil de entender y alineado con las necesidades de la industria.',
  },
  {
    order: 2,
    heading: 'Nuestros Métodos de Aprendizaje',
    description:
      'La plataforma se asocia con universidades y empresas líderes para ofrecer sus servicios',
  },
  {
    order: 3,
    heading: 'Certificación',
    description:
      'La plataforma se asocia con universidades y empresas líderes para ofrecer sus servicios',
  },
  {
    order: 4,
    heading: 'Calificación "Auto-grading"',
    description:
      'La plataforma se asocia con universidades y empresas líderes para ofrecer sus servicios',
  },
  {
    order: 5,
    heading: 'Listo para Trabajar',
    description:
      'La plataforma se asocia con universidades y empresas líderes para ofrecer sus servicios',
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && 'lg:col-span-2 lg:h-[294px]'}  ${
              card.order % 2 === 1
                ? 'bg-richblack-700 h-[294px]'
                : card.order % 2 === 0
                ? 'bg-richblack-800 h-[294px]'
                : 'bg-transparent'
            } ${card.order === 3 && 'lg:col-start-2'}  `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
