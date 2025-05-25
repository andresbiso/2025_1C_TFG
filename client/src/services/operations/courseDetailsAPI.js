import { toast } from 'react-hot-toast';

// import { updateCompletedLectures } from '../../slices/viewCourseSlice';
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from '../apiConnector';
import { courseEndpoints } from '../apis';

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

// ================ get All Courses ================
export const getAllCourses = async () => {
  const toastId = toast.loading('Cargando...');
  let result = [];

  try {
    const response = await apiConnector('GET', GET_ALL_COURSE_API);
    if (!response?.data?.success) {
      throw new Error('No se pudo obtener categorias del curso');
    }
    result = response?.data?.data;
  } catch (error) {
    console.log('GET_ALL_COURSE_API API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ fetch Course Details ================
export const fetchCourseDetails = async (courseId) => {
  // const toastId = toast.loading('Loading')
  //   dispatch(setLoading(true));
  let result = null;

  try {
    const response = await apiConnector('POST', COURSE_DETAILS_API, {
      courseId,
    });
    console.log('COURSE_DETAILS_API API RESPONSE............', response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log('COURSE_DETAILS_API API ERROR............', error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  // toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result;
};

// ================ fetch Course Categories ================
export const fetchCourseCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector('GET', COURSE_CATEGORIES_API);
    console.log('COURSE_CATEGORIES_API RESPONSE............', response);
    if (!response?.data?.success) {
      throw new Error('No se pudo obtener categorias del curso');
    }
    result = response?.data?.data;
  } catch (error) {
    console.log('COURSE_CATEGORY_API API ERROR............', error);
    toast.error(error.message);
  }
  return result;
};

// ================ add Course Details ================
export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading('Cargando...');
  let result = null;

  try {
    const response = await apiConnector('POST', CREATE_COURSE_API, data, {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    });
    console.log('CREATE COURSE API RESPONSE............', response);

    if (!response?.data?.success) {
      throw new Error('No se pudo agregar detalles al curso');
    }

    result = response?.data?.data;
    toast.success('Detalles del curso agregados exitosamente');
  } catch (error) {
    console.log('CREATE COURSE API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ edit Course Details ================
export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading('Cargando...');

  try {
    const response = await apiConnector('POST', EDIT_COURSE_API, data, {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    });
    console.log('EDIT COURSE API RESPONSE............', response);

    if (!response?.data?.success) {
      throw new Error('No se pudo actualizar los detalles del curso');
    }

    result = response?.data?.data;
    toast.success('Detalles del curso actualizados exitosamente');
  } catch (error) {
    console.log('EDIT COURSE API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ create Section ================
export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading('Cargando...');

  try {
    const response = await apiConnector('POST', CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log('CREATE SECTION API RESPONSE............', response);

    if (!response?.data?.success) {
      throw new Error('No se pudo crear sección del curso');
    }

    result = response?.data?.updatedCourseDetails;
    toast.success('Sección del curso creada exitosamente');
  } catch (error) {
    console.log('CREATE SECTION API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ create SubSection ================
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading('Cargando...');

  try {
    const response = await apiConnector('POST', CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log('CREATE SUB-SECTION API RESPONSE............', response);

    if (!response?.data?.success) {
      throw new Error('No se pudo agregar lección');
    }

    result = response?.data?.data;
    toast.success('Lección agregada exitosamente');
  } catch (error) {
    console.log('CREATE SUB-SECTION API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ Update Section ================
export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading('Cargando...');

  try {
    const response = await apiConnector('POST', UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log('UPDATE SECTION API RESPONSE............', response);

    if (!response?.data?.success) {
      throw new Error('No se pudo actualizar sección del curso');
    }

    result = response?.data?.data;
    toast.success('Sección del curso actualizada exitosamente');
  } catch (error) {
    console.log('UPDATE SECTION API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ Update SubSection ================
export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading('Cargando...');

  try {
    const response = await apiConnector('POST', UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log('UPDATE SUB-SECTION API RESPONSE............', response);

    if (!response?.data?.success) {
      throw new Error('No se pudo actualizar lección');
    }

    result = response?.data?.data;
    toast.success('Lección actualizada exitosamente');
  } catch (error) {
    console.log('UPDATE SUB-SECTION API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ delete Section ================
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading('Cargando...');

  try {
    const response = await apiConnector('POST', DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log('DELETE SECTION API RESPONSE............', response);

    if (!response?.data?.success) {
      throw new Error('No se pudo eliminar sección del curso');
    }

    result = response?.data?.data;
    toast.success('Sección del curso eliminada exitosamente');
  } catch (error) {
    console.log('DELETE SECTION API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ delete SubSection ================
export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading('Cargando...');
  try {
    const response = await apiConnector('POST', DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log('DELETE SUB-SECTION API RESPONSE............', response);
    if (!response?.data?.success) {
      throw new Error('No se pudo eliminar lección');
    }
    result = response?.data?.data;
    toast.success('Lección eliminada exitosamente');
  } catch (error) {
    console.log('DELETE SUB-SECTION API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ================ fetch Instructor Courses ================
export const fetchInstructorCourses = async (token) => {
  let result = [];
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      'GET',
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log('INSTRUCTOR COURSES API RESPONSE', response);
    if (!response?.data?.success) {
      throw new Error('No se pudo obtener cursos del instructor');
    }
    result = response?.data?.data;
  } catch (error) {
    console.log('INSTRUCTOR COURSES API ERROR............', error);
    toast.error(error.message);
  }
  return result;
};

// ================ delete Course ================
export const deleteCourse = async (data, token) => {
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector('DELETE', DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log('DELETE COURSE API RESPONSE............', response);
    if (!response?.data?.success) {
      throw new Error('No se pudo eliminar el curso');
    }
    toast.success('Curso eliminado exitosamente');
  } catch (error) {
    console.log('DELETE COURSE API ERROR............', error);
    toast.error(error.message);
  }
  // toast.dismiss(toastId)
};

// ================ get Full Details Of Course ================
export const getFullDetailsOfCourse = async (courseId, token) => {
  // const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      'POST',
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log('COURSE_FULL_DETAILS_API API RESPONSE............', response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log('COURSE_FULL_DETAILS_API API ERROR............', error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  // toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result;
};

// ================ mark Lecture As Complete ================
export const markLectureAsComplete = async (data, token) => {
  let result = null;
  // console.log("mark complete data", data)
  const toastId = toast.loading('Cargando...');
  try {
    const response = await apiConnector('POST', LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log(
      'MARK_LECTURE_AS_COMPLETE_API API RESPONSE............',
      response
    );

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success('Lección completada');
    result = true;
  } catch (error) {
    console.log('MARK_LECTURE_AS_COMPLETE_API API ERROR............', error);
    toast.error(error.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};

// ================ create Course Rating  ================
export const createRating = async (data, token) => {
  const toastId = toast.loading('Cargando...');
  let success = false;
  try {
    const response = await apiConnector('POST', CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log('CREATE RATING API RESPONSE............', response);
    if (!response?.data?.success) {
      throw new Error('No se pudo crear reseña');
    }
    toast.success('Reseña creada exitosamente');
    success = true;
  } catch (error) {
    success = false;
    console.log('CREATE RATING API ERROR............', error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};
