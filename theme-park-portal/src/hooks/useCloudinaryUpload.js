import { useState } from "react";
import axios from "axios";

export default function useCloudinaryUpload(folder = "Admin") {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const upload = async (file) => {
    if (!file) return null;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folder);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setUrl(res.data.secure_url);
      return res.data.secure_url;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, url, upload, setUrl };
}
