import { Link } from 'react-router-dom';
import NotFound from '../assets/gifs/not_found.gif'; // Adjust path as needed

const PageNotFound = () => {
  return (
    <section className="p-[40px] bg-white pt-[100px] ">
      <div>
        <div>
          <div>
            <div className="text-center">
              <div
                className="h-[400px] bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: `url(${NotFound})` }}
              ></div>
              <div>
                <h1 className="text-center text-6xl font-extrabold text-black">
                  404
                </h1>
                <h3 className="text-4xl mb-1 ">Parece que te has perdido</h3>

                <p>¡La página que estás buscando no está disponible!</p>

                <Link
                  to="/"
                  className="py-[13px] px-10 text-lg bg-caribbeangreen-200 hover:bg-caribbeangreen-400 my-5 inline-block rounded-full font-semibold duration-300"
                >
                  Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
