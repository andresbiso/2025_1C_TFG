// Helper function to convert total seconds to the duration format
function convertSecondsToDuration(totalSeconds) {
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return '0s';
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}min ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

// Helper function to convert total minutes to duration format
function convertMinutesToDuration(totalMinutes) {
  if (isNaN(totalMinutes) || totalMinutes < 0) {
    return '0min';
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  } else {
    return `${minutes}min`;
  }
}

module.exports = {
  convertSecondsToDuration,
  convertMinutesToDuration,
};
