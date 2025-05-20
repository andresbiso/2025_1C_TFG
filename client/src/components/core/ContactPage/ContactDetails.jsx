import * as Icon1 from 'react-icons/bi';
import * as Icon3 from 'react-icons/hi2';
import * as Icon2 from 'react-icons/io5';

const contactDetails = [
  {
    icon: 'HiChatBubbleLeftRight',
    heading: 'Chatea con nosotros',
    description: 'Nuestro amigable equipo está aqui para ayudarte.',
    details: 'info@mailpit.com',
  },
  {
    icon: 'BiWorld',
    heading: 'Visitanos',
    description: 'Vení a saludarnos a nuestras oficinas.',
    details: 'Mario Bravo 1050, Buenos Aires, Argentina',
  },
  {
    icon: 'IoCall',
    heading: 'Llamanos',
    description: 'Lunes a Viernes de 8 a 17hs',
    details: '+54 11 456 7869',
  },
];

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} />

              <h1 className="text-lg font-semibold text-richblack-5">
                {ele?.heading}
              </h1>
            </div>

            <p className="font-medium">{ele?.description}</p>
            <p className="font-semibold">{ele?.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
