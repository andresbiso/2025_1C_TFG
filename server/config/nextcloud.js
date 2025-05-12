const webdav = require("webdav");
require("dotenv").config();

exports.nextcloudConnect = () => {
  try {
    const nextcloudUrl = process.env.NEXTCLOUD_URL.replace(
      "${NEXTCLOUD_ADMIN_USER}",
      process.env.NEXTCLOUD_ADMIN_USER
    ).replace(
      "${NEXTCLOUD_ADMIN_PASSWORD}",
      process.env.NEXTCLOUD_ADMIN_PASSWORD
    );

    const client = webdav.createClient(nextcloudUrl, {
      username: process.env.NEXTCLOUD_ADMIN_USER,
      password: process.env.NEXTCLOUD_ADMIN_PASSWORD,
    });

    console.log("Connected to Nextcloud successfully");

    return client;
  } catch (error) {
    console.error("Nextcloud connection error:", error);
  }
};
