const { minioConnect } = require("../config/minio"); // Import the MinIO connection
const fs = require("fs");

const client = minioConnect(); // Use the existing MinIO client

// Upload image to MinIO
exports.uploadImageToMinio = async (filePath, bucket) => {
  try {
    console.log("File object:", filePath);
    console.log("Target bucket:", bucket);

    // Ensure proper local path handling
    const remotePath = `${filePath.name}`;
    const localPath = filePath.tempFilePath;

    // Upload file using MinIO's putObject method
    await client.fPutObject(bucket, remotePath, localPath);

    console.log(`File uploaded successfully to MinIO: ${remotePath}`);
    return remotePath;
  } catch (error) {
    console.error("Error uploading file to MinIO:", error);
    throw error;
  }
};

// Function to delete a resource from MinIO
exports.deleteResourceFromMinio = async (bucket, filePath) => {
  try {
    await client.removeObject(bucket, filePath);
    console.log(`Deleted file from MinIO: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file from MinIO (${filePath}):`, error);
    throw error;
  }
};
