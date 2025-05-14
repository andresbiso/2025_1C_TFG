const { minioConnect } = require("../config/minio"); // Import the MinIO connection
const fs = require("fs");

const client = minioConnect(); // Use the existing MinIO client

// Upload image to MinIO
exports.uploadImageToMinio = async (filePath, bucket) => {
  if (!filePath || !bucket) {
    console.error(
      "Error uploading file to MinIO. Either filePath or bucket is null or undefined"
    );
    return;
  }
  try {
    console.log("File object:", filePath);
    console.log("Target bucket:", bucket);

    const remotePath = `${filePath.name}`;
    const localPath = filePath.tempFilePath;

    // Upload file
    await client.fPutObject(bucket, remotePath, localPath);
    console.log(`File uploaded successfully to MinIO: ${remotePath}`);

    // Generate a presigned URL valid for 10 years
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;
    const url = await client.presignedUrl(
      "GET",
      bucket,
      remotePath,
      sevenDaysInSeconds
    );

    console.log(`Generated long-term URL: ${url}`);
    return { secure_url: url };
  } catch (error) {
    console.error("Error uploading file to MinIO:", error);
    throw error;
  }
};

// Function to delete a resource from MinIO
exports.deleteResourceFromMinio = async (filePath, bucket) => {
  if (!filePath || !bucket) {
    console.error(
      "Error uploading file to MinIO. Either filePath or bucket is null or undefined"
    );
    return;
  }
  try {
    // Check if the object exists before deletion
    await client.statObject(bucket, filePath);

    // Remove the object
    await client.removeObject(bucket, filePath);
    console.log(`Deleted file from MinIO: ${filePath}`);
  } catch (error) {
    if (error.code === "NoSuchKey") {
      console.error(`File not found in MinIO (${filePath})`);
    } else {
      console.error(`Error deleting file from MinIO (${filePath}):`, error);
    }
    throw error;
  }
};
