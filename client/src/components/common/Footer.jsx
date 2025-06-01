import { FooterLink2 } from '../../../data/footer-links';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

// Images
import Logo from '../../assets/logo.svg';

// footer data
const BottomFooter = [
  'Política de Privacidad',
  'Política de Cookies',
  'Términos',
];
const Resources = [
  'Artículos',
  'Blogs',
  'Hojas de gráficos',
  'Desafíos de código',
  'Documentos',
  'Projectos',
  'Videos',
  'Esapcios de trabajo',
];
const Plans = [
  'Membresía Paga',
  'Para estudiantes',
  'Soluciones Empresariales',
];
const Community = ['Foros', 'Capítulos', 'Eventos'];

const Footer = () => {
  return (
    <div className="bg-richblack-800 mx-7 rounded-3xl mb-10">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <img src={Logo} alt="" className="object-contain" />
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Empresa
              </h1>
              <div className="flex flex-col gap-2">
                {['Sobre Nosotros', 'Carreras', 'Afiliados'].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              {/* social icons */}
              <div className="flex gap-3 text-lg duration-200">
                <FaFacebook
                  className="w-5 cursor-pointer hover:scale-95"
                  id="facebook"
                />
                <FaGoogle
                  className="w-5 cursor-pointer hover:scale-95"
                  id="google"
                />
                <FaXTwitter
                  className="w-5 cursor-pointer hover:scale-95"
                  id="twitter"
                />
                <FaYoutube
                  className="w-5 cursor-pointer hover:scale-95"
                  id="youtube"
                />
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Recursos
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(' ').join('-').toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Soporte
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={'/help-center'}>Centro de ayuda</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Planes
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(' ').join('-').toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Comunidad
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(' ').join('-').toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[35%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* bottom footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex ">
            {BottomFooter.map((ele, ind) => {
              return (
                <div
                  key={ind}
                  className={` ${
                    BottomFooter.length - 1 === ind
                      ? ''
                      : 'border-r border-richblack-700 '
                  }
                   px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200`}
                >
                  <Link to={ele.split(' ').join('-').toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center flex flex-col sm:flex-row ">
            <div className="flex ">
              <Link
                to="https://github.com/andresbiso"
                target="__blank"
                className="text-white hover:underline mr-1"
              >
                Andrés Biso
              </Link>
            </div>
            <span> © 2025 Platform</span>
          </div>

          <div className="flex items-center">
            <a
              href="https://www.linkedin.com/in/andresbiso/"
              className="text-white p-3 hover:bg-richblack-700 rounded-full duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={17} />
            </a>
            <a
              href="https://www.github.com/andresbiso"
              className="text-white p-3 hover:bg-richblack-700 rounded-full duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={17} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
