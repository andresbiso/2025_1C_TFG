const webdav = require("webdav");
require("dotenv").config();

exports.nextcloudConnect = () => {
  try {
    const nextcloudUrl = process.env.NEXTCLOUD_HOST; // Use localhost

    // Build authentication options only if credentials exist
    const authOptions = {};
    if (process.env.NEXTCLOUD_USER && process.env.NEXTCLOUD_PASSWORD) {
      authOptions.username = process.env.NEXTCLOUD_USER;
      authOptions.password = process.env.NEXTCLOUD_PASSWORD;
    }

    // Create Nextcloud client with optional auth
    const client = webdav.createClient(nextcloudUrl, authOptions);

    console.log("Connected to Nextcloud successfully");

    return client;
  } catch (error) {
    console.error("Nextcloud connection error:", error);
  }
};
