export const uploadImageToCloudinary = async (image: File): Promise<string> => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`;
  
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
    ); // Ensure type safety
  
    try {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
      throw error;
    }
  };