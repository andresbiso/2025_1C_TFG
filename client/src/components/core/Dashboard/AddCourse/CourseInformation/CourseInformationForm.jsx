import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
// import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import IconBtn from '../../../../common/IconBtn';
import Upload from '../Upload';
import ChipInput from './ChipInput';
import RequirementsField from './RequirementField';

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    // if form is in edit mode
    // It will add value in input field
    if (editCourse) {
      // console.log("editCourse ", editCourse)
      setValue('courseTitle', course.courseName);
      setValue('courseShortDesc', course.courseDescription);
      setValue('coursePrice', course.price);
      setValue('courseTags', course.tag);
      setValue('courseBenefits', course.whatYouWillLearn);
      setValue('courseCategory', course.category);
      setValue('courseRequirements', course.instructions);
      setValue('courseImage', course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        // console.log('data -> ',data)
        formData.append('courseId', course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append('courseName', data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append('courseDescription', data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append('price', data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append('tag', JSON.stringify(data.courseTags));
          // formData.append("tag", data.courseTags)
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append('whatYouWillLearn', data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append('category', data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            'instructions',
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append('thumbnailImage', data.courseImage);
        }

        // send data to backend
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error('No se han realizado cambios al formulario');
      }
      return;
    }

    // user has visted first time to step 1
    const formData = new FormData();
    formData.append('courseName', data.courseTitle);
    formData.append('courseDescription', data.courseShortDesc);
    formData.append('price', data.coursePrice);
    formData.append('tag', JSON.stringify(data.courseTags));
    formData.append('whatYouWillLearn', data.courseBenefits);
    formData.append('category', data.courseCategory);
    formData.append('status', COURSE_STATUS.DRAFT);
    formData.append('instructions', JSON.stringify(data.courseRequirements));
    formData.append('thumbnailImage', data.courseImage);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 "
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Título del curso <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Ingresar nombre del curso"
          {...register('courseTitle', { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            El nombre del título es requerido
          </span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Descripción breve del curso <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Ingresar descripción breve del curso"
          {...register('courseShortDesc', { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full ] "
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            La descripción breve del curso es requerida.
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2 hidden">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Precio del curso <sup className="text-pink-200">*</sup>
        </label>

        {/* Invisible input with fixed value */}
        <input
          id="coursePrice"
          type="number"
          value={watch('coursePrice') || 0} // Always stays 0
          {...register('coursePrice', { valueAsNumber: true })}
          className="hidden" // Makes it invisible
          readOnly // Prevents user modification
        />

        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            El precio del curso es requerido.
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2 ">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Categoría del curso <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register('courseCategory', { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full cursor-pointer"
        >
          <option value="" disabled>
            Elegir una categoría
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            La categoría del curso es requerida
          </span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Ingresar etiquetas y presionar Entrar (enter) o Coma (,)"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Miniatura del curso"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Beneficios del curso <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Ingresar beneficios del curso"
          {...register('courseBenefits', { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Los beneficios del curso son requeridos
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requerimientos/Instrucciones"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold
              text-richblack-900 bg-richblack-300 hover:bg-richblack-900 hover:text-richblack-300 duration-300`}
          >
            Continuar sin guardar
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? 'Próximo' : 'Guardar cambios'}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
