const { nextcloudConnect } = require("../config/nextcloud"); // Import the connection

const client = nextcloudConnect(); // Use the existing client

// Function to upload an image to Nextcloud
exports.uploadImageToNextCloud = async (filePath, folder) => {
  try {
    const remotePath = `${folder}/${filePath.split("/").pop()}`;
    await client.putFileContents(
      remotePath,
      require("fs").readFileSync(filePath)
    );

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
