const { INTEGRATIONS, COURSE_STATUS } = require('./constants');
const { sendTelegramNotifications } = require('./telegramIntegrationUtils');
const { convertMinutesToDuration } = require('../../utils/secToDuration');
const clientUrlForTelegram = process.env.CLIENT_URL_FOR_TELEGRAM;

exports.sendNotifications = async (course) => {
  if (
    course.status !== COURSE_STATUS.PUBLISHED ||
    course.courseContent === undefined
  ) {
    console.log(
      "ERROR NOTIFICATIONS: The course isn't published or the courseContent isn't defined yet."
    );
    return;
  }

  let totalDurationInSeconds = 0;
  course.courseContent.forEach((content) => {
    content.subSection.forEach((subSection) => {
      const timeDurationInSeconds = parseInt(subSection.timeDuration);
      totalDurationInSeconds += timeDurationInSeconds;
    });
  });

  const totalDuration = convertMinutesToDuration(totalDurationInSeconds);

  const message = `Hay un nuevo curso disponible: ${course.courseName}. Duración: ${totalDuration}. [Más Información](${clientUrlForTelegram}/courses/${course._id})`;

  for (const integration of Object.values(INTEGRATIONS)) {
    if (integration == INTEGRATIONS.TELEGRAM) {
      sendTelegramNotifications(message, totalDuration);
    }
  }
};
