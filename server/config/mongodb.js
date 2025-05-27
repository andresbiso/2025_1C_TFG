const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('../models/category');

// Function to connect to MongoDB
exports.connectMongoDB = () => {
  const mongoUrl = process.env.MONGO_DB_URL.replace(
    '${MONGO_USERNAME}',
    process.env.MONGO_USERNAME
  )
    .replace('${MONGO_PASSWORD}', process.env.MONGO_PASSWORD)
    .replace('${MONGO_HOST}', process.env.MONGO_HOST)
    .replace('${MONGO_PORT}', process.env.MONGO_PORT)
    .replace('${MONGO_DATABASE}', process.env.MONGO_DATABASE);

  mongoose
    .connect(mongoUrl, {})
    .then(() => {
      console.log('Mongo database connected successfully');
    })
    .catch((error) => {
      console.error('Error while connecting to MongoDB:', error);
      process.exit(1);
    });
};

// Function to initialize categories in MongoDB
exports.initializeDatabase = async () => {
  try {
    const categories = [
      {
        name: 'Programación',
        description: 'Cursos relacionados al desarrollo de software',
      },
      {
        name: 'Diseño',
        description: 'Cursos relacionados con UI/UX y diseño gráfico',
      },
      {
        name: 'Publicidad',
        description: 'Cursos sobre publicidad digital',
      },
    ];

    for (const category of categories) {
      const exists = await Category.findOne({ name: category.name });
      if (!exists) await Category.create(category);
    }

    console.log('Categories initialized successfully.');
  } catch (error) {
    console.error('Error initializing categories:', error);
  }
};
