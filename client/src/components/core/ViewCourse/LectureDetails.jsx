import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import 'video-react/dist/video-react.css';
import { BigPlayButton, Player } from 'video-react';

import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { setCourseViewSidebar } from '../../../slices/sidebarSlice';

import IconBtn from '../../common/IconBtn';
import { HiMenuAlt1 } from 'react-icons/hi';

const LectureDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );
  const { courseViewSidebar } = useSelector((state) => state.sidebar); // Fixed `courseViewSidebar`

  const [lectureData, setLectureData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!courseSectionData.length) return;

    const filteredSection = courseSectionData.find(
      (section) => section._id === sectionId
    );
    const filteredLecture = filteredSection?.subSection.find(
      (lecture) => lecture._id === subSectionId
    );
    setLectureData(filteredLecture);
  }, [courseSectionData, sectionId, subSectionId]);

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === lectureData?.correctAnswer);
  };

  const isFirstLecture = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subsectionIndex = courseSectionData[
      sectionIndex
    ]?.subSection.findIndex((sub) => sub._id === subSectionId);
    return sectionIndex === 0 && subsectionIndex === 0;
  };

  const isLastLecture = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subsectionIndex = courseSectionData[
      sectionIndex
    ]?.subSection.findIndex((sub) => sub._id === subSectionId);
    return (
      sectionIndex === courseSectionData.length - 1 &&
      subsectionIndex === courseSectionData[sectionIndex].subSection.length - 1
    );
  };

  const goToNextLecture = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subsectionIndex = courseSectionData[
      sectionIndex
    ]?.subSection.findIndex((sub) => sub._id === subSectionId);
    const nextSubsection =
      courseSectionData[sectionIndex]?.subSection[subsectionIndex + 1];

    if (nextSubsection) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubsection._id}`
      );
    } else if (courseSectionData[sectionIndex + 1]) {
      const nextSection = courseSectionData[sectionIndex + 1];
      navigate(
        `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
      );
    }
  };

  const goToPrevLecture = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const subsectionIndex = courseSectionData[
      sectionIndex
    ]?.subSection.findIndex((sub) => sub._id === subSectionId);
    const prevSubsection =
      courseSectionData[sectionIndex]?.subSection[subsectionIndex - 1];

    if (prevSubsection) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsection._id}`
      );
    } else if (courseSectionData[sectionIndex - 1]) {
      const prevSection = courseSectionData[sectionIndex - 1];
      const lastSubsection =
        prevSection.subSection[prevSection.subSection.length - 1];
      navigate(
        `/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastSubsection._id}`
      );
    }
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {/* Sidebar Toggle */}
      <div
        className="sm:hidden text-white absolute left-7 top-3 cursor-pointer"
        onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
      >
        {!courseViewSidebar && <HiMenuAlt1 size={33} />}
      </div>

      {/* Render Content Based on Mode */}
      {lectureData?.mode === 'video' && (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          autoPlay
          onEnded={() => setVideoEnded(true)}
          src={lectureData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {videoEnded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black bg-opacity-70">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={loading ? 'Cargando...' : 'Marcar como completado'}
                />
              )}
              <IconBtn
                onclick={() => playerRef.current.seek(0)}
                text="Volver a ver"
              />
            </div>
          )}
        </Player>
      )}

      {lectureData?.mode === 'text' && (
        <div>
          <h1 className="text-3xl font-semibold">{lectureData?.title}</h1>
          <textarea
            className="w-full p-2 mt-2 border border-gray-600 bg-black text-white rounded"
            placeholder="Escribe aquí..."
          ></textarea>
          <button className="absolute bottom-4 right-4 bg-green-500 px-4 py-2 rounded">
            Marcar como completado
          </button>
        </div>
      )}

      {lectureData?.mode === 'multipleChoice' && (
        <div>
          <h1 className="text-3xl font-semibold">{lectureData?.title}</h1>
          <p>{lectureData?.question}</p>
          {lectureData?.options.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                selectedOption === option
                  ? isCorrect
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : 'bg-gray-500'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
          {isCorrect && (
            <button
              className="absolute bottom-4 right-4 bg-green-500 px-4 py-2 rounded"
              onClick={handleLectureCompletion}
            >
              Marcar como completado
            </button>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        {!isFirstLecture() && (
          <button className="blackButton" onClick={goToPrevLecture}>
            Anterior
          </button>
        )}
        {!isLastLecture() && (
          <button className="blackButton" onClick={goToNextLecture}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default LectureDetails;
