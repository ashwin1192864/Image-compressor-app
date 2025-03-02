import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download, Edit, Trash } from 'lucide-react';
import { ImageFile } from '../types';
import { formatFileSize } from '../utils/compression';

interface ImagePreviewProps {
  image: ImageFile;
  onDownload: (image: ImageFile) => void;
  onRename: (image: ImageFile, newName: string) => void;
  onRemove: (imageId: string) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  image, 
  onDownload, 
  onRename,
  onRemove 
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const startRenaming = () => {
    setNewName(image.file.name.split('.')[0]);
    setIsRenaming(true);
  };

  const handleRename = () => {
    if (newName.trim()) {
      onRename(image, newName.trim());
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex-1 truncate">
          {isRenaming ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              <span className="text-gray-500 dark:text-gray-400">
                .{image.file.name.split('.').pop()}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-800 dark:text-white truncate">
                {image.file.name}
              </h3>
              <button
                onClick={startRenaming}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Rename file"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
              zoomLevel <= 0.5 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
              zoomLevel >= 3 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onRemove(image.id)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 hover:text-red-600"
            aria-label="Remove image"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Original</p>
          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-lg aspect-square flex items-center justify-center">
            <img
              src={image.preview}
              alt="Original"
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Size: {formatFileSize(image.file.size)}
          </p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Compressed</p>
          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-lg aspect-square flex items-center justify-center">
            {image.status === 'compressing' ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compressing...</p>
              </div>
            ) : image.status === 'done' && image.compressedPreview ? (
              <img
                src={image.compressedPreview}
                alt="Compressed"
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            ) : image.status === 'error' ? (
              <div className="text-center p-4">
                <p className="text-red-500 dark:text-red-400">Error compressing image</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{image.error}</p>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-gray-500 dark:text-gray-400">Waiting to compress</p>
              </div>
            )}
          </div>
          {image.status === 'done' && image.compressedFile ? (
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Size: {formatFileSize(image.compressedFile.size)}
                {image.compressionRatio !== undefined && (
                  <span className="ml-2 text-green-600 dark:text-green-400">
                    ({image.compressionRatio.toFixed(1)}% smaller)
                  </span>
                )}
              </p>
              <button
                onClick={() => onDownload(image)}
                className="flex items-center space-x-1 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200"
                aria-label="Download compressed image"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &nbsp;
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;