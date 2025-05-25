// import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId) => {
  // const toastId = toast.loading('Cargando...');
  let result = [];
  try {
    const response = await apiConnector(
      'POST',
      catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId }
    );

    if (!response?.data?.success)
      throw new Error('No se pudo obtener el catálogo');

    console.log('CATALOG PAGE DATA API RESPONSE............', response);
    result = response?.data?.data;
  } catch (error) {
    console.log('CATALOG PAGE DATA API ERROR....', error);
    // toast.error(error.response?.data.message);
    result = error.response?.data.data;
  }
  // toast.dismiss(toastId);
  return result;
};
