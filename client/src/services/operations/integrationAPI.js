import { toast } from 'react-hot-toast';

import { apiConnector } from '../apiConnector';
import { integrationEndpoints } from '../apis';

const { TELEGRAM_SEND_MESSAGE_API } = integrationEndpoints;

// ================ telegram send message ================
export const telegramSendMessage = async (data, token) => {
  const toastId = toast.loading('Cargando...');
  let result = null;

  try {
    const response = await apiConnector(
      'POST',
      TELEGRAM_SEND_MESSAGE_API,
      data,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    );
    console.log('TELEGRAM SEND MESSAGE API RESPONSE............', response);

    if (!response?.data?.success) {
      throw new Error('No se pudo enviar el mensaje');
    }

    result = response?.data?.data;
    toast.success('Mensaje enviado exitosamente');
  } catch (error) {
    console.log('TELEGRAM SEND MESSAGE API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
