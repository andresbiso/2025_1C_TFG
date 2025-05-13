const { nextcloudConnect } = require("../config/nextcloud"); // Import the connection
const fs = require("fs");

const client = nextcloudConnect(); // Use the existing client

exports.uploadImageToNextCloud = async (filePath, folder) => {
  try {
    console.log("filePath object:", filePath);
    console.log("Target folder:", folder);

    // Ensure proper local path handling
    const remotePath = `${folder}/${filePath.name}`;
    const localPath = filePath.tempFilePath || `./uploads/${filePath.name}`;

    // Upload file using stream to prevent issues
    await client.putFileContents(remotePath, fs.createReadStream(localPath));

    console.log(`File uploaded successfully to Nextcloud: ${remotePath}`);
    return remotePath;
  } catch (error) {
    console.error("Error while uploading image to Nextcloud:", error);
    throw error;
  }
};

// Function to delete a resource from Nextcloud
exports.deleteResourceFromNextCloud = async (filePath) => {
  try {
    await client.deleteFile(filePath);
    console.log(`Deleted file from Nextcloud: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file from Nextcloud (${filePath}):`, error);
    throw error;
  }
};
