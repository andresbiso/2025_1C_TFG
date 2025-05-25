import ContactUsForm from '../ContactPage/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold">Ponte en contacto</h1>
      <p className="text-center text-richblack-300 mt-3">
        Nos encataría escuchar tus opniones. Por favor, completá este
        formulario.
      </p>

      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
