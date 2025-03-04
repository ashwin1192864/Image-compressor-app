import imageCompression from 'browser-image-compression';
import { CompressionSettings } from '../types';

export const compressImage = async (
  file: File,
  settings: CompressionSettings
): Promise<File> => {
  const options = {
    maxSizeMB: settings.maxSizeMB,
    maxWidthOrHeight: settings.maxWidthOrHeight || undefined,
    useWebWorker: settings.useWebWorker,
    fileType: settings.outputFormat === 'auto' ? undefined : `image/${settings.outputFormat}`,
    alwaysKeepResolution: !settings.maxWidthOrHeight,
    initialQuality: settings.quality,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    // If removeMetadata is true, create a new file without metadata
    if (settings.removeMetadata) {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0, img.width, img.height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const newFile = new File([blob], compressedFile.name, {
                  type: compressedFile.type,
                  lastModified: new Date().getTime(),
                });
                resolve(newFile);
              } else {
                reject(new Error('Failed to create blob from canvas'));
              }
            },
            compressedFile.type,
            settings.quality
          );
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image for metadata removal'));
        };
        
        const url = URL.createObjectURL(compressedFile);
        img.src = url;
      });
    }
    
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to create image preview'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const calculateCompressionRatio = (originalSize: number, compressedSize: number): number => {
  return ((originalSize - compressedSize) / originalSize) * 100;
};

export const getSupportedFileTypes = (): string[] => {
  return ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
};

export const isImageSupported = (file: File): boolean => {
  return getSupportedFileTypes().includes(file.type);
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

export const renameFile = (file: File, newName: string): File => {
  const extension = getFileExtension(file.name);
  const fullNewName = newName.endsWith(`.${extension}`) ? newName : `${newName}.${extension}`;
  return new File([file], fullNewName, { type: file.type });
};