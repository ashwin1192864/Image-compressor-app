import React from 'react';
import { Download, RefreshCw, Trash2 } from 'lucide-react';
import { ImageFile } from '../types';

interface ActionButtonsProps {
  images: ImageFile[];
  onCompressAll: () => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
  isProcessing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  images,
  onCompressAll,
  onDownloadAll,
  onClearAll,
  isProcessing,
}) => {
  const hasImages = images.length > 0;
  const hasCompressedImages = images.some(img => img.status === 'done');
  
  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-end">
      <button
        onClick={onCompressAll}
        disabled={!hasImages || isProcessing}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
          !hasImages || isProcessing
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-primary-600 hover:bg-primary-700 text-white'
        }`}
      >
        <RefreshCw className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
        <span>Compress All</span>
      </button>
      
      <button
        onClick={onDownloadAll}
        disabled={!hasCompressedImages}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
          !hasCompressedImages
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        <Download className="w-5 h-5" />
        <span>Download All</span>
      </button>
      
      <button
        onClick={onClearAll}
        disabled={!hasImages}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
          !hasImages
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        <Trash2 className="w-5 h-5" />
        <span>Clear All</span>
      </button>
    </div>
  );
};

export default ActionButtons;