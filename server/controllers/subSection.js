const Section = require('../models/section');
const SubSection = require('../models/subSection');
const { uploadFileToMinio } = require('../utils/fileUploader');

// ================ create SubSection ================
exports.createSubSection = async (req, res) => {
  try {
    const { type, sectionId, title, timeDuration } = req.body;
    if (!type || !sectionId || !title || !timeDuration) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    let subSectionDetails;
    if (type === 'video') {
      const { description } = req.body;

      if (!description || !req.files.video) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }
      const videoFile = req.files.video;
      // upload video to minio
      const videoFileDetails = await uploadFileToMinio(
        videoFile,
        process.env.MINIO_DEFAULT_BUCKET
      );
      // create entry in DB
      subSectionDetails = await SubSection.create({
        title: title,
        timeDuration: timeDuration,
        type: type,
        description: description,
        video: videoFileDetails.secure_url,
      });
    } else if (type === 'text') {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      // create entry in DB
      subSectionDetails = await SubSection.create({
        title: title,
        timeDuration: timeDuration,
        type: type,
        text: text,
      });
    } else if (type === 'multipleChoice') {
      const { question, choices, correctChoice } = req.body;

      if (!question || !choices || !correctChoice) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      // create entry in DB
      subSectionDetails = await SubSection.create({
        title: title,
        timeDuration: timeDuration,
        type: type,
        question: question,
        choices: JSON.parse(choices),
        correctChoice: correctChoice,
      });
    }

    // link subsection id to section
    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails._id } },
      { new: true }
    ).populate('subSection');

    // return response
    res.status(200).json({
      success: true,
      data: updatedSection,
      message: 'SubSection created successfully',
    });
  } catch (error) {
    console.log('Error while creating SubSection');
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error while creating SubSection',
    });
  }
};

// ================ Update SubSection ================
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;

    // validation
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: 'subSection ID is required to update',
      });
    }

    // find in DB
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: 'SubSection not found',
      });
    }

    const { sectionId, type, title, timeDuration } = req.body;

    if (title) {
      subSection.title = title;
    }

    if (timeDuration) {
      subSection.timeDuration = timeDuration;
    }

    let subSectionDetails;
    if (type === 'video') {
      const { description } = req.body;

      if (description) {
        subSection.description = description;
      }

      if (req.files && req.files.video !== undefined) {
        const video = req.files.video;
        const uploadDetails = await uploadFileToMinio(
          video,
          process.env.MINIO_DEFAULT_BUCKET
        );
        subSection.video = uploadDetails.secure_url;
      }
    } else if (type === 'text') {
      const { text } = req.body;

      if (text) {
        subSection.text = text;
      }
    } else if (type === 'multipleChoice') {
      const { question, choices, correctChoice } = req.body;

      if (question) {
        subSection.question = question;
      }

      if (choices) {
        subSection.choices = JSON.parse(choices);
      }

      if (correctChoice) {
        subSection.correctChoice = correctChoice;
      }
    }

    // save data to DB
    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      'subSection'
    );

    return res.json({
      success: true,
      data: updatedSection,
      message: 'Section updated successfully',
    });
  } catch (error) {
    console.error('Error while updating the section');
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error while updating the section',
    });
  }
};

// ================ Delete SubSection ================
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    // delete from DB
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: 'SubSection not found' });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      'subSection'
    );

    // When subsection is deleted we are sending
    // only section data and not full course details as we do in others

    // success response
    return res.json({
      success: true,
      data: updatedSection,
      message: 'SubSection deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,

      error: error.message,
      message: 'An error occurred while deleting the SubSection',
    });
  }
};
