
/**
 * Service for handling image uploads to Cloudinary
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

export const cloudinaryService = {
  /**
   * Upload an image to Cloudinary
   * @param file The file object to upload
   * @param folder Optional folder name to organize uploads
   * @param onProgress Callback for upload progress
   */
  async uploadImage(
    file: File, 
    folder: string = 'shops',
    onProgress?: (progress: number) => void
  ): Promise<CloudinaryResponse> {
    if (!CLOUD_NAME || (!UPLOAD_PRESET && !import.meta.env.VITE_CLOUDINARY_API_KEY)) {
      throw new Error('Cloudinary not configured. Please add VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_API_KEY, and VITE_CLOUDINARY_UPLOAD_PRESET to your environment variables in the Settings menu.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', folder);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } else {
          try {
            const error = JSON.parse(xhr.responseText);
            reject(new Error(error.error?.message || 'Upload failed'));
          } catch {
            reject(new Error('Upload failed'));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error during upload'));
      };

      xhr.send(formData);
    });
  }
};
