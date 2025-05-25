const Minio = require('minio');
require('dotenv').config();

exports.minioConnect = () => {
  try {
    const minioClient = new Minio.Client({
      endPoint: process.env.MINIO_HOST || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
      useSSL: false, // Set to true if using HTTPS
      accessKey: process.env.MINIO_ROOT_USER,
      secretKey: process.env.MINIO_ROOT_PASSWORD,
    });

    console.log('Connected to MinIO successfully');

    return minioClient;
  } catch (error) {
    console.error('MinIO connection error:', error);
  }
};

// Function to create a bucket if it doesn't exist
exports.createBucket = async (bucketName) => {
  const minioClient = exports.minioConnect();

  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName);
      console.log(`Bucket "${bucketName}" created successfully`);
    } else {
      console.log(`Bucket "${bucketName}" already exists`);
    }
  } catch (error) {
    console.error(`Error checking/creating bucket: ${error.message}`);
  }
};
