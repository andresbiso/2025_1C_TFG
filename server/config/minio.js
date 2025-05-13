const Minio = require("minio");
require("dotenv").config();

exports.minioConnect = () => {
  try {
    const minioClient = new Minio.Client({
      endPoint: process.env.MINIO_HOST || "localhost",
      port: parseInt(process.env.MINIO_PORT || "9000", 10),
      useSSL: false, // Set to true if using HTTPS
      accessKey: process.env.MINIO_ROOT_USER,
      secretKey: process.env.MINIO_ROOT_PASSWORD,
    });

    console.log("Connected to MinIO successfully");

    return minioClient;
  } catch (error) {
    console.error("MinIO connection error:", error);
  }
};
