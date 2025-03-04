import React, { useEffect, useState } from 'react';
import { X, Info, Settings } from 'lucide-react';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Slight delay before showing to allow for animation
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-close the popup after 15 seconds
    const closeTimer = setTimeout(() => {
      handleClose();
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 300);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out transform ${
        !isVisible ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
      } ${isClosing ? 'scale-95 opacity-0' : 'scale-100'}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-sm border border-gray-200 dark:border-gray-700">
        <div className="bg-primary-600 dark:bg-primary-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-white" />
            <h3 className="text-sm font-medium text-white">Compression Settings</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white focus:outline-none transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4 flex items-start space-x-3">
          <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full">
            <Info className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{message}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Adjust quality, format, and size before uploading for best results.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 flex justify-end">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;