const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res, next) => {
  try {
    const file = req.files.file;
    console.log("File =>", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".").pop()}`;
    console.log("Path =>", path);

    file.mv(path, (err) => {
      console.log("Error =>", err);
    });

    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (error) {
    console.log("Error in localFileUpload =>", error.message);
    console.log("Error in localFileUpload =>", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in Local File Upload",
    });
  }
};

exports.imageUpload = async (req, res, next) => {
  try {
    const { name, tags, email } = req.body;
    console.log("Name =>", name, ", Tags =>", tags, ", Email =>", email);
    if (!name || !tags || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details for Name, Tags and Email",
      });
    }
    const file = req.files.file;
    console.log("File ->", file);

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is not available",
      });
    }

    // validation
    const supportedType = ["jpeg", "jpg", "png"];
    const fileType = file.name.split(".").pop().toLowerCase();
    console.log("File Type =>", fileType);
    if (!isFileTypeSupported(fileType, supportedType)) {
      return res.status(400).json({
        success: false,
        message:
          "File format is not supported, supported Types are jpeg,jpg,png",
      });
    }

    // upload to cloudinary

    const options = { folder: "imageUploaderApp" };
    console.log("TempPath =>", file.tempFilePath, " Options =>", options);
    let imageResponse = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );
    console.log("Response ->", imageResponse);
    // creating entry in DB

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: imageResponse.secure_url,
    });
    console.log("Data created in DB =>", fileData);
    if (fileData) {
      return res.status(200).json({
        success: true,
        message: "Image Uploaded Successfully",
        data: fileData,
      });
    }
  } catch (error) {
    console.log("Error while imageUpload =>", error);
    console.log("Error while imageUpload =>", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to upload Image",
      error: error.message,
    });
  }
};

exports.videoUpload = async (req, res, next) => {
  try {
    let fileSize = 10;
    const { name, tags, email } = req.body;
    console.log("Name =>", name, ", Tags =>", tags, ", Email =>", email);
    if (!name || !tags || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details for Name, Tags and Email",
      });
    }
    const file = req.files.video;
    console.log("File ->", file);

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is not available",
      });
    }
    if (file.size / 1048576 > fileSize) {
      return res.status(400).json({
        success: false,
        message: `File size is larger than ${fileSize} MB. Kindly upload a file less than ${fileSize} MB.`,
        fileSize: `${(file.size / 1048576).toFixed(2)} MB`,
      });
    }

    // validation
    const supportedType = ["mp4", "mov", "mkv"];
    const fileType = file.name.split(".").pop().toLowerCase();
    console.log("File Type =>", fileType);
    if (!isFileTypeSupported(fileType, supportedType)) {
      return res.status(400).json({
        success: false,
        message:
          "File format is not supported, supported Types are mp4,mov,mkv",
      });
    }

    // upload to cloudinary
    const options = { folder: "imageUploaderApp", resource_type: "video" };
    console.log("TempPath =>", file.tempFilePath, " Options =>", options);
    let imageResponse = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );

    console.log("Response ->", imageResponse);
    // creating entry in DB

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: imageResponse.secure_url,
    });
    console.log("Data created in DB =>", fileData);
    if (fileData) {
      return res.status(200).json({
        success: true,
        message: "Video Uploaded Successfully",
        data: fileData,
      });
    }
    // return res.status(200).json({
    //   success: true,
    //   message: "Video Uploaded Successfully",
    //   // data: fileData,
    // });
  } catch (error) {
    console.log("Error while videoUpload =>", error);
    console.log("Error while videoUpload =>", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to upload Video",
      error: error.message,
    });
  }
};

exports.imageSizeReducer = async (req, res, next) => {
  try {
    const { name, tags, email, quality } = req.body;
    console.log("Name =>", name, ", Tags =>", tags, ", Email =>", email);
    if (!name || !tags || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details for Name, Tags and Email",
      });
    }
    const file = req.files.file;
    console.log("File ->", file);

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is not available",
      });
    }

    // validation
    const supportedType = ["jpeg", "jpg", "png"];
    const fileType = file.name.split(".").pop().toLowerCase();
    console.log("File Type =>", fileType);
    if (!isFileTypeSupported(fileType, supportedType)) {
      return res.status(400).json({
        success: false,
        message:
          "File format is not supported, supported Types are jpeg,jpg,png",
      });
    }

    // upload to cloudinary

    const options = {
      folder: "imageUploaderApp",
      transformation: [{ fetch_format: "auto", quality: quality }], // 'auto:low' automatically adjusts the quality to a lower level. You can use a specific number too.
    };
    console.log("TempPath =>", file.tempFilePath, " Options =>", options);
    let imageResponse = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );
    console.log("Response ->", imageResponse);
    // creating entry in DB

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: imageResponse.secure_url,
    });
    console.log("Data created in DB =>", fileData);
    if (fileData) {
      return res.status(200).json({
        success: true,
        message: "Image Uploaded Successfully",
        data: fileData,
        actualSize: `${(file.size / 1048576).toFixed(3)} MB`,
        currentSize: `${(imageResponse.bytes / 1048576).toFixed(3)} MB`,
        compressed_percentage: `${quality}%`,
      });
    }
  } catch (error) {
    console.log("Error while reducing image Size=>", error);
    console.log("Error while reducing image Size =>", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to reduce image size",
      error: error.message,
    });
  }
};

function isFileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}
