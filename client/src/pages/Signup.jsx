import signupImg from '../assets/images/signup.png';
import Template from '../components/core/Auth/Template';

function Signup() {
  return (
    <Template
      title="Únete a los millones que aprenden a programar con la plataforma de forma gratuita"
      description1="Desarrolla habilidades para hoy, mañana y más allá."
      description2="Prepará tu carrera para el futuro."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
