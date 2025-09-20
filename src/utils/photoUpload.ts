import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

export const uploadUserPhoto = async (file: File, userEmail: string): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${userEmail.replace('@', '_at_').replace('.', '_')}_${timestamp}`;
    const storageRef = ref(storage, `user-photos/${fileName}`);
    
    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

export const capturePhoto = async (): Promise<File | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      video.srcObject = stream;
      video.play();
      
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Capture frame after 3 seconds
        setTimeout(() => {
          if (context) {
            context.drawImage(video, 0, 0);
            canvas.toBlob((blob) => {
              stream.getTracks().forEach(track => track.stop());
              if (blob) {
                const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
                resolve(file);
              } else {
                resolve(null);
              }
            }, 'image/jpeg', 0.8);
          }
        }, 3000);
      });
    });
  } catch (error) {
    console.error('Error capturing photo:', error);
    return null;
  }
};