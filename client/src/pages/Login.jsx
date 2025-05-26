import loginImg from '../assets/images/login/login_01.png';
import Template from '../components/core/Auth/Template';

function Login() {
  return (
    <Template
      title="Bienvenido de nuevo"
      description1="Desarrolla habilidades para hoy, mañana y más allá."
      description2="Prepará tu carrera para el futuro."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;
