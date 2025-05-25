import HighlightText from '../HomePage/HighlightText';

const Quote = () => {
  return (
    <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
      Nos apasiona revolucionar la forma en que aprendemos. Nuestra innovadora
      plataforma <HighlightText text={'combina tecnología'} />,{' '}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        {' '}
        habilidad
      </span>
      , y una comunidad para crear
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        {' '}
        una experiencia educativa sin igual.
      </span>
    </div>
  );
};

export default Quote;
