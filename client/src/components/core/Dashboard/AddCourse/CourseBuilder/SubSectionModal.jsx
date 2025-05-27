import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

import {
  createSubSection,
  updateSubSection,
} from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import Upload from '../Upload';

export default function SubSectionModal({
  modalData,
  setModalData,
  mode,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [type, setType] = useState(mode);

  //  Multiple Choice State
  const [choices, setChoices] = useState([{ text: '' }]);
  const [correctChoice, setCorrectChoice] = useState(null);

  useEffect(() => {
    if (view || edit) {
      setValue('sectionId', modalData.sectionId);
      setValue('subSectionId', modalData._id);
      setValue('lectureTitle', modalData.title);
      setValue('lectureDuration', modalData.timeDuration);
      setType(modalData.type);
      if (type === 'video') {
        setValue('lectureDesc', modalData.description);
        setValue('lectureVideo', modalData.video);
      } else if (type === 'text') {
        setValue('lectureText', modalData.text);
      } else if (type === 'multipleChoice') {
        setValue('lectureQuestion', modalData.question);
        setChoices(modalData.choices);
        setCorrectChoice(modalData.correctChoice);
      }
    } else if (add) {
      setValue('sectionId', modalData);
    }
  }, []);

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues();
    const commonConditions =
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDuration !== modalData.timeDuration;
    // console.log("changes after editing form values:", currentValues)
    let typeConditions;
    if (type === 'video') {
      typeConditions =
        currentValues.lectureDesc !== modalData.description ||
        currentValues.lectureVideo !== modalData.video;
    } else if (type === 'text') {
      typeConditions = currentValues.lectureText !== modalData.text;
    } else if (type === 'multipleChoice') {
      const currentChoices = JSON.stringify(choices);
      typeConditions =
        currentValues.lectureQuestion !== modalData.question ||
        currentChoices !== JSON.stringify(modalData.choices) ||
        correctChoice !== modalData.correctChoice;
    }
    return commonConditions || typeConditions;
  };

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    const formData = new FormData();
    // console.log("Values After Editing form values:", currentValues)
    formData.append('sectionId', modalData.sectionId);
    formData.append('subSectionId', modalData._id);
    formData.append('type', type);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append('title', currentValues.lectureTitle);
    }
    if (currentValues.lectureDuration !== modalData.timeDuration) {
      formData.append('timeDuration', currentValues.lectureDuration);
    }
    if (type === 'video') {
      if (currentValues.lectureDesc !== modalData.description) {
        formData.append('description', currentValues.lectureDesc);
      }
      if (currentValues.lectureVideo !== modalData.video) {
        formData.append('video', currentValues.lectureVideo);
      }
    } else if (type === 'text') {
      if (currentValues.lectureText !== modalData.text) {
        formData.append('text', currentValues.lectureText);
      }
    } else if (type === 'multipleChoice') {
      if (currentValues.lectureQuestion !== modalData.question) {
        formData.append('question', currentValues.lectureQuestion);
      }
      if (currentValues.choices !== choices) {
        formData.append('choices', JSON.stringify(choices));
      }
      if (currentValues.correctChoice !== correctChoice) {
        formData.append('correctChoice', correctChoice);
      }
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      // console.log("result", result)
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    // console.log(data)
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error('No se realizaron cambios en el formulario');
      } else {
        handleEditSubsection();
      }
      return;
    }

    const formData = new FormData();
    formData.append('sectionId', modalData);
    formData.append('type', type);
    formData.append('title', data.lectureTitle);
    formData.append('timeDuration', data.lectureDuration);

    if (type === 'video') {
      formData.append('description', data.lectureDesc);
      formData.append('video', data.lectureVideo);
    } else if (type === 'text') {
      formData.append('text', data.lectureText);
    } else if (type === 'multipleChoice') {
      formData.append('question', data.lectureQuestion);
      formData.append('choices', JSON.stringify(choices));
      formData.append('correctChoice', correctChoice);
    }
    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  //  Add new answer choices dynamically
  const addNewChoice = () => {
    setChoices([...choices, { text: '' }]);
  };

  //  Update choice text
  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index].text = value;
    setChoices(updatedChoices);
  };

  const removeChoice = (index) => {
    if (choices.length > 1) {
      setChoices(choices.filter((_, i) => i !== index));
    }
  };

  const typeLabels = {
    video: 'video',
    text: 'texto',
    multipleChoice: 'pregunta',
  };

  const typeLabel = typeLabels[type] || '';

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && 'Viendo'} {add && 'Agregando'} {edit && 'Editando'} Lección
            - Modo {typeLabel}
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Título Lección {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Ingresar título de lección"
              {...register('lectureTitle', { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                El título de la lección es requerido
              </span>
            )}
          </div>

          {/* Type-Based Input Fields */}
          {type === 'video' && (
            <>
              {/* Lecture Video Upload */}
              <Upload
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={view ? modalData.video : null}
                editData={edit ? modalData.video : null}
              />
              {/* Lecture Description */}
              <div className="flex flex-col space-y-2">
                <label
                  className="text-sm text-richblack-5"
                  htmlFor="lectureDesc"
                >
                  Descripción de la lección{' '}
                  {!view && <sup className="text-pink-200">*</sup>}
                </label>
                <textarea
                  disabled={view || loading}
                  id="lectureDesc"
                  placeholder="Ingresar descripción de la lección"
                  {...register('lectureDesc', { required: true })}
                  className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.lectureDesc && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    La descripción de la lección es requerida
                  </span>
                )}
              </div>
            </>
          )}

          {type === 'text' && (
            <>
              {/* Lecture text */}
              <div className="flex flex-col space-y-2">
                <label
                  className="text-sm text-richblack-5"
                  htmlFor="lectureText"
                >
                  Contenido de la lección{' '}
                  {!view && <sup className="text-pink-200">*</sup>}
                </label>
                <textarea
                  disabled={view || loading}
                  id="lectureText"
                  placeholder="Ingresar contenido de la lección"
                  {...register('lectureText', { required: true })}
                  className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.lectureText && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    El contenido de la lección es requerido
                  </span>
                )}
              </div>
            </>
          )}

          {type === 'multipleChoice' && (
            <div className="flex flex-col space-y-4">
              {/* Question Input */}
              <input
                disabled={view || loading}
                id="lectureQuestion"
                placeholder="Ingrese la pregunta"
                {...register('lectureQuestion', { required: true })}
                className="form-style w-full"
              />

              {errors.lectureQuestion && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  La pregunta de la lección es requerida
                </span>
              )}

              {/* Dynamic Answer Choices */}
              <div className="flex flex-col space-y-2">
                {choices.map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-3 bg-richblack-600 p-3 rounded-lg shadow-md"
                  >
                    <input
                      type="text"
                      placeholder={`Opción ${index + 1}`}
                      value={choice.text}
                      onChange={(e) =>
                        handleChoiceChange(index, e.target.value)
                      }
                      className="form-style w-full text-white bg-transparent border-none"
                    />
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={correctChoice === index}
                      onChange={() => setCorrectChoice(index)}
                      className="cursor-pointer"
                    />
                    {choices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(index)}
                        className="text-white bg-red-500 p-2 rounded-lg hover:bg-red-600"
                      >
                        ✖
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-3">
                <button
                  type="button"
                  onClick={addNewChoice}
                  className="flex items-center justify-center bg-richblack-600 text-white font-semibold w-32 h-32 rounded-lg shadow-md hover:bg-richblack-700 transition duration-300 ease-in-out"
                >
                  <FaPlus className="text-lg" />
                  <span className="ml-2">Opción</span>
                </button>
              </div>
            </div>
          )}

          {/* Lecture Duration */}
          <div className="flex flex-col space-y-2">
            <label
              className="text-sm text-richblack-5"
              htmlFor="lectureDuration"
            >
              Duración de la lección (en minutos){' '}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              type="number"
              disabled={view || loading}
              id="lectureDuration"
              placeholder="Ingresar duración de la lección"
              {...register('lectureDuration', {
                required: true,
                min: 1,
                max: 20,
                valueAsNumber: true,
              })}
              className="form-style resize-x-none w-full"
            />

            {errors.lectureDuration &&
              errors.lectureDuration.type === 'required' && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  La duración de la lección es requerida
                </span>
              )}

            {errors.lectureDuration &&
              errors.lectureDuration.type === 'min' && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  La duración debe ser al menos 1 minuto
                </span>
              )}

            {errors.lectureDuration &&
              errors.lectureDuration.type === 'max' && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  La duración no puede ser mayor a 20 minutos
                </span>
              )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={
                  loading ? 'Cargando...' : edit ? 'Guardar Cambios' : 'Guardar'
                }
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

SubSectionModal.propTypes = {
  modalData: PropTypes.any,
  setModalData: PropTypes.func,
  mode: PropTypes.string,
  add: PropTypes.bool,
  view: PropTypes.bool,
  edit: PropTypes.bool,
};
