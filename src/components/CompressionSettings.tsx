import React from 'react';
import { Settings, Trash2, Sliders } from 'lucide-react';
import { CompressionSettings as CompressionSettingsType } from '../types';

interface CompressionSettingsProps {
  settings: CompressionSettingsType;
  onSettingsChange: (settings: CompressionSettingsType) => void;
  isOpen: boolean;
  toggleOpen: () => void;
}

const CompressionSettings: React.FC<CompressionSettingsProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  toggleOpen,
}) => {
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quality = Number(e.target.value) / 100;
    onSettingsChange({ ...settings, quality });
  };

  const handleMaxSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSizeMB = Number(e.target.value);
    onSettingsChange({ ...settings, maxSizeMB });
  };

  const handleMaxDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maxWidthOrHeight = value === '' ? null : Number(value);
    onSettingsChange({ ...settings, maxWidthOrHeight });
  };

  const handleRemoveMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const removeMetadata = e.target.checked;
    onSettingsChange({ ...settings, removeMetadata });
  };

  const handleOutputFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const outputFormat = e.target.value as CompressionSettingsType['outputFormat'];
    onSettingsChange({ ...settings, outputFormat });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="font-medium text-gray-800 dark:text-white">Compression Settings</h3>
        </div>
        <Sliders className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {true && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="quality" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quality: {Math.round(settings.quality * 100)}%
              </label>
            </div>
            <input
              id="quality"
              type="range"
              min="1"
              max="100"
              value={Math.round(settings.quality * 100)}
              onChange={handleQualityChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 dark:accent-primary-400"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Low Quality</span>
              <span>High Quality</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="maxSize" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Max Size (MB)
              </label>
              <input
                id="maxSize"
                type="number"
                min="0.1"
                step="0.1"
                value={settings.maxSizeMB}
                onChange={handleMaxSizeChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="maxDimension" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Max Dimension (px)
              </label>
              <input
                id="maxDimension"
                type="number"
                min="100"
                step="100"
                placeholder="Original size"
                value={settings.maxWidthOrHeight || ''}
                onChange={handleMaxDimensionChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="outputFormat" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Output Format
              </label>
              <select
                id="outputFormat"
                value={settings.outputFormat}
                onChange={handleOutputFormatChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="auto">Same as input</option>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3 h-full pt-8">
              <input
                id="removeMetadata"
                type="checkbox"
                checked={settings.removeMetadata}
                onChange={handleRemoveMetadataChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex items-center space-x-2">
                <label htmlFor="removeMetadata" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Remove Metadata
                </label>
                <Trash2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressionSettings;