const cloudinary = require('cloudinary').v2;

const uploadImageToCloudinary = async (base64ImageData) => {
    try {
      const uploadResult = await cloudinary.uploader.upload(base64ImageData, {
        folder: 'restaurant-images', // Optional folder path for organizing images
        resource_type: 'image' // Specify the resource type as 'image'
      });
  
      return uploadResult.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
      throw new Error('Failed to upload image to Cloudinary');
    }
  };
  
  const deleteImageFromCloudinary = async (publicId) => {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error('Failed to delete image from Cloudinary');
    }
  };

  module.exports = {
    uploadImageToCloudinary,
    deleteImageFromCloudinary,
  };