import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteSection,
  deleteSubSection,
} from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

import ConfirmationModal from '../../../../common/ConfirmationModal';
import SubSectionModal from './SubSectionModal';

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [modalMode, setModalMode] = useState(null);

  // Delele Section
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  // Delete SubSection
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      // update the structure of course - As we have got only updated section details
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  const openSubSectionModal = (mode, sectionId) => {
    setModalMode(mode);
    setAddSubsection(sectionId);
  };

  return (
    <>
      <div
        className="rounded-2xl bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              {/* sectionName */}
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>

              <div className="flex items-center gap-x-3">
                {/* Change Edit SectionName button */}
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: '¿Querés eliminar esta sección?',
                      text2:
                        'Todas las lecciones de esta sección serán eliminadas.',
                      btn1Text: 'Eliminar',
                      btn2Text: 'Cancelar',
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>

                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: '¿Querés eliminar la subsección?',
                          text2: 'Esta lección será eliminada.',
                          btn1Text: 'Eliminar',
                          btn2Text: 'Cancelar',
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Buttons to Choose Mode */}
              <div className="flex gap-3 mt-3 justify-center">
                <button
                  onClick={() => openSubSectionModal('video', section._id)}
                  className="flex items-center justify-center bg-richblack-600 text-white font-semibold w-32 h-32 rounded-lg shadow-md hover:bg-richblack-700"
                >
                  <FaPlus className="text-lg" />
                  <span className="ml-2">Video</span>
                </button>

                <button
                  onClick={() => openSubSectionModal('text', section._id)}
                  className="flex items-center justify-center bg-richblack-600 text-white font-semibold w-32 h-32 rounded-lg shadow-md hover:bg-richblack-700"
                >
                  <FaPlus className="text-lg" />
                  <span className="ml-2">Texto</span>
                </button>

                <button
                  onClick={() =>
                    openSubSectionModal('multipleChoice', section._id)
                  }
                  className="flex items-center justify-center bg-richblack-600 text-white font-semibold w-32 h-32 rounded-lg shadow-md hover:bg-richblack-700"
                >
                  <FaPlus className="text-lg" />
                  <span className="ml-2">Pregunta</span>
                </button>
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* SubSection Modal */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          mode={modalMode}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          mode={modalMode}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          mode={modalMode}
          edit={true}
        />
      )}
      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

NestedView.propTypes = {
  handleChangeEditSectionName: PropTypes.func,
};
