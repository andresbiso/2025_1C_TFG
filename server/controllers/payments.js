const mailSender = require('../utils/mailSender');
const {
  courseEnrollmentEmail,
} = require('../mail/templates/courseEnrollmentEmail');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user');
const Course = require('../models/course');
const CourseProgress = require('../models/courseProgress');

exports.capturePayment = async (req, res) => {
  const { coursesId } = req.body;
  const userId = req.user.id;

  if (coursesId.length === 0) {
    return res.json({ success: false, message: 'Please provide Course Id' });
  }

  for (const course_id of coursesId) {
    let course;
    try {
      // valid course Details
      course = await Course.findById(course_id);
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: 'Could not find the course' });
      }

      // check user already enrolled the course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(400)
          .json({ success: false, message: 'Student is already Enrolled' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.status(200).json({
    success: true,
    message: 'Successful Payment',
  });
};

exports.verifyPayment = async (req, res) => {
  const courses = req.body?.coursesId;
  const userId = req.user.id;
  //enroll student
  await enrollStudents(courses, userId, res);
  //return res
  return res.status(200).json({ success: true, message: 'Payment Verified' });
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: 'Please Provide data for Courses or UserId',
    });
  }

  for (const courseId of courses) {
    try {
      //find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, message: 'Course not Found' });
      }
      // console.log("Updated course: ", enrolledCourse)

      // Initialize course progress (0 percent)
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedLectures: [],
      });

      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      // console.log("Enrolled student: ", enrolledStudent)

      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Se ha registrado exitosamente al curso ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName}`
        )
      );
      console.log('Email Sent Successfully', emailResponse);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all the fields' });
  }

  try {
    // find student
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      `Pago Recibido`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log('error in sending mail', error);
    return res
      .status(500)
      .json({ success: false, message: 'Could not send email' });
  }
};
