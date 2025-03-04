import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { isImageSupported } from '../utils/compression';

interface UploadAreaProps {
  onFilesAdded: (files: File[]) => void;
  isProcessing: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFilesAdded, isProcessing }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(file => isImageSupported(file));
      if (validFiles.length > 0) {
        onFilesAdded(validFiles);
      }
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/bmp': [],
      'image/webp': [],
    },
    disabled: isProcessing,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 ${
        isDragActive
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600 bg-white dark:bg-gray-800'
      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        {isDragActive ? (
          <Upload className="w-12 h-12 text-primary-500 dark:text-primary-400 animate-pulse" />
        ) : (
          <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        )}
        <div className="space-y-1">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or <span className="text-primary-600 dark:text-primary-400">browse files</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supports JPG, PNG, GIF, BMP, WebP
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;