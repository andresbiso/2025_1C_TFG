import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BsFillCaretRightFill } from 'react-icons/bs';
import { FaShareSquare } from 'react-icons/fa';

// import { addToCart } from '../../../slices/cartSlice';
// import { ACCOUNT_TYPE } from '../../../utils/constants';
import Img from './../../common/Img';

function CourseDetailsCard({ course, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  // const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    // price: CurrentPrice,
    // _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success('Enlace copiado al porta papeles');
  };

  // const handleAddToCart = () => {
  //   if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
  //     toast.error('Sos un instructor. No podés anotarte a un curso.');
  //     return;
  //   }
  //   if (token) {
  //     dispatch(addToCart(course));
  //     return;
  //   }
  //   setConfirmationModal({
  //     text1: 'No has iniciado sesión!',
  //     text2: 'Por favor, inicia sesión para agregar al carrito',
  //     btn1Text: 'Iniciar Sesión',
  //     btn2Text: 'Cancelar',
  //     btn1Handler: () => navigate('/login'),
  //     btn2Handler: () => setConfirmationModal(null),
  //   });
  // };

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-2xl bg-richblack-700 p-4 text-richblack-5 `}
      >
        {/* Course Image */}
        <Img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          {/* <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {CurrentPrice}
          </div> */}
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton outline-none"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate('/dashboard/enrolled-courses')
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? 'Ir al curso'
                : 'Anotarse al curso'}
            </button>
            {/* {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button
                onClick={handleAddToCart}
                className="blackButton outline-none"
              >
                Agregar al carrito
              </button>
            )} */}
          </div>

          {/* <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
            Garantía de devolución de dinero de 30 días
          </p> */}

          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              Requerimientos del curso :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Compartir
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

CourseDetailsCard.propTypes = {
  course: PropTypes.object,
  setConfirmationModal: PropTypes.func,
  handleBuyCourse: PropTypes.func,
};

export default CourseDetailsCard;
