import { toast } from 'react-hot-toast';
import { studentEndpoints } from '../apis';
import { apiConnector } from '../apiConnector';
import { setPaymentLoading } from '../../slices/courseSlice';
import { resetCart } from '../../slices/cartSlice';

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// ================ buyCourse ================
export async function buyCourse(
  token,
  coursesId,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading('Cargando...');

  try {
    // initiate the order
    const orderResponse = await apiConnector(
      'POST',
      COURSE_PAYMENT_API,
      { coursesId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("orderResponse... ", orderResponse);
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    sendPaymentSuccessEmail({}, 0, token);
    verifyPayment({ coursesId }, token, navigate, dispatch);
  } catch (error) {
    console.log('PAYMENT API ERROR.....', error);
    toast.error(error.response?.data?.message);
    // toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}

// ================ send Payment Success Email ================
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      'POST',
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: 0,
        paymentId: 0,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log('PAYMENT SUCCESS EMAIL ERROR....', error);
  }
}

// ================ verify payment ================
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading('Aguarde...');
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector('POST', COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success('Fuiste registrado exitosamente en el curso');
    navigate('/dashboard/enrolled-courses');
    dispatch(resetCart());
  } catch (error) {
    console.log('PAYMENT VERIFY ERROR....', error);
    toast.error('Hubo un error al querer regisrarse en el curso');
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
