import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import LectureDetailsSidebar from '../components/core/ViewCourse/LectureDetailsSidebar';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from '../slices/viewCourseSlice';

import { setCourseViewSidebar } from '../slices/sidebarSlice';

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

  // get Full Details Of Course
  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedLectures));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
  }, [courseId, dispatch, token]);

  // handle sidebar for small devices
  const { courseViewSidebar } = useSelector((state) => state.sidebar);
  const [screenSize, setScreenSize] = useState(undefined);

  // set curr screen Size
  useEffect(() => {
    const handleScreenSize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleScreenSize);
    handleScreenSize();
    return () => window.removeEventListener('resize', handleScreenSize);
  });

  // close / open sidebar according screen size
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setCourseViewSidebar(false));
    } else dispatch(setCourseViewSidebar(true));
  }, [dispatch, screenSize]);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] ">
        {/* view course side bar */}
        {courseViewSidebar && (
          <LectureDetailsSidebar setReviewModal={setReviewModal} />
        )}

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto mt-14">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
