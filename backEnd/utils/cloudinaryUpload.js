import cloudinary from "cloudinary";

// Configure Cloudinary globally (only once)
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleUploadOnCloudinary(filePath) {
  try {
    const upload = await cloudinary.v2.uploader.upload(filePath, {
      folder: "your_folder_name", // optional: organize uploads
      use_filename: true,
      unique_filename: false,
      resource_type: "auto", // supports images, videos, etc.
    });

    console.log("File uploaded successfully:", upload.secure_url);
    return upload.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Unable to upload file to Cloudinary");
  }
}

export default handleUploadOnCloudinary;
