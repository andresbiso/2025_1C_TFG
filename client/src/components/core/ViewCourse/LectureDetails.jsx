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
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const { courseViewSidebar } = useSelector((state) => state.sidebar);

  const [lectureData, setLectureData] = useState(null);
  const [previewSource, setPreviewSource] = useState('');
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!courseSectionData || courseSectionData.length === 0) return;

    const filteredSection = courseSectionData.find(
      (section) => section._id === sectionId
    );
    const filteredLecture = filteredSection?.subSection.find(
      (lecture) => lecture._id === subSectionId
    );
    setLectureData(filteredLecture);
  }, [courseSectionData, sectionId, subSectionId]);

  useEffect(() => {
    (async () => {
      if (!courseSectionData || courseSectionData.length === 0) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );

        const filteredLectureData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );

        if (filteredLectureData) setLectureData(filteredLectureData[0]);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseId, sectionId, subSectionId]);

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
    if (!courseSectionData || courseSectionData.length === 0) return;
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const subsectionIndex = courseSectionData[
      sectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);
    return sectionIndex === 0 && subsectionIndex === 0;
  };

  const isLastLecture = () => {
    if (!courseSectionData || courseSectionData.length === 0) return;
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const subsectionIndex = courseSectionData[
      sectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);
    return (
      sectionIndex === courseSectionData.length - 1 &&
      subsectionIndex === courseSectionData[sectionIndex].subSection.length - 1
    );
  };

  const goToNextLecture = () => {
    if (!courseSectionData || courseSectionData.length === 0) return;
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const subsectionIndex = courseSectionData[
      sectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);
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
    if (!courseSectionData || courseSectionData.length === 0) return;
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const subsectionIndex = courseSectionData[
      sectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);
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

      {/* Render Content Based on type */}
      {lectureData?.type === 'video' && (
        <>
          {!lectureData ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              autoPlay
              onEnded={() => setVideoEnded(true)}
              src={lectureData?.video}
            >
              <BigPlayButton position="center" />
              {/* Render When Video Ends */}
              {videoEnded && (
                <div
                  style={{
                    backgroundImage:
                      'linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)',
                  }}
                  className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                >
                  {!completedLectures.includes(subSectionId) && (
                    <IconBtn
                      disabled={loading}
                      onClick={() => handleLectureCompletion()}
                      text={!loading ? 'Marcar como completado' : 'Cargando...'}
                      customClasses="text-xl max-w-max px-4 mx-auto"
                    />
                  )}
                  <IconBtn
                    disabled={loading}
                    onClick={() => {
                      if (playerRef?.current) {
                        playerRef?.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    text="Volver a ver"
                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                  />
                  <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                    {!isFirstLecture() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevLecture}
                        className="blackButton"
                      >
                        Anterior
                      </button>
                    )}
                    {!isLastLecture() && (
                      <button
                        disabled={loading}
                        onClick={goToNextLecture}
                        className="blackButton"
                      >
                        Siguiente
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Player>
          )}
          <h1 className="mt-4 text-3xl font-semibold">{lectureData?.title}</h1>
          <p className="pt-2 pb-6">{lectureData?.description}</p>
        </>
      )}

      {lectureData?.type === 'text' && (
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

      {lectureData?.type === 'multipleChoice' && (
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
