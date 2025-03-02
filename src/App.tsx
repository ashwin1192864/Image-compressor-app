import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import CompressionSettings from './components/CompressionSettings';
import ImagePreview from './components/ImagePreview';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { ImageFile, CompressionSettings as CompressionSettingsType } from './types';
import {
  compressImage,
  createImagePreview,
  calculateCompressionRatio,
  renameFile
} from './utils/compression';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<CompressionSettingsType>({
    quality: 0.8,
    maxSizeMB: 1,
    maxWidthOrHeight: null,
    removeMetadata: true,
    outputFormat: 'auto',
    useWebWorker: true,
  });

  const handleFilesAdded = useCallback(async (files: File[]) => {
    const newImages: ImageFile[] = [];
    
    for (const file of files) {
      try {
        const preview = await createImagePreview(file);
        newImages.push({
          id: uuidv4(),
          file,
          preview,
          status: 'idle',
        });
      } catch (error) {
        console.error('Error creating preview:', error);
      }
    }
    
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const compressImageFile = useCallback(async (imageFile: ImageFile) => {
    if (imageFile.status === 'compressing') return;
    
    setImages(prev =>
      prev.map(img =>
        img.id === imageFile.id ? { ...img, status: 'compressing' } : img
      )
    );
    
    try {
      const compressedFile = await compressImage(imageFile.file, settings);
      const compressedPreview = await createImagePreview(compressedFile);
      const compressionRatio = calculateCompressionRatio(
        imageFile.file.size,
        compressedFile.size
      );
      
      setImages(prev =>
        prev.map(img =>
          img.id === imageFile.id
            ? {
                ...img,
                compressedFile,
                compressedPreview,
                compressionRatio,
                status: 'done',
              }
            : img
        )
      );
    } catch (error) {
      console.error('Error compressing image:', error);
      setImages(prev =>
        prev.map(img =>
          img.id === imageFile.id
            ? {
                ...img,
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
              }
            : img
        )
      );
    }
  }, [settings]);

  const handleCompressAll = useCallback(async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    const imagesToCompress = images.filter(
      img => img.status === 'idle' || img.status === 'error'
    );
    
    for (const img of imagesToCompress) {
      await compressImageFile(img);
    }
    
    setIsProcessing(false);
  }, [images, isProcessing, compressImageFile]);

  const handleDownload = useCallback((image: ImageFile) => {
    if (!image.compressedFile) return;
    
    const url = URL.createObjectURL(image.compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = image.compressedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleDownloadAll = useCallback(() => {
    const compressedImages = images.filter(
      img => img.status === 'done' && img.compressedFile
    );
    
    compressedImages.forEach(img => {
      handleDownload(img);
    });
  }, [images, handleDownload]);

  const handleClearAll = useCallback(() => {
    setImages([]);
  }, []);

  const handleRemoveImage = useCallback((imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  }, []);

  const handleRenameImage = useCallback((image: ImageFile, newName: string) => {
    setImages(prev =>
      prev.map(img => {
        if (img.id !== image.id) return img;
        
        const renamedFile = renameFile(img.file, newName);
        const updatedImage = { ...img, file: renamedFile };
        
        if (img.compressedFile) {
          updatedImage.compressedFile = renameFile(img.compressedFile, `${newName}_compressed`);
        }
        
        return updatedImage;
      })
    );
  }, []);

  // Auto-compress images when they're added if there are no other images being processed
  useEffect(() => {
    const idleImages = images.filter(img => img.status === 'idle');
    if (idleImages.length > 0 && !isProcessing) {
      handleCompressAll();
    }
  }, [images, isProcessing, handleCompressAll]);

  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Free Online Image Compressor
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Reduce file size while maintaining quality. Upload your images and let our tool optimize them for web use.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">JPG</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">PNG</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">GIF</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">BMP</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">WebP</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <UploadArea onFilesAdded={handleFilesAdded} isProcessing={isProcessing} />
              <CompressionSettings
                settings={settings}
                onSettingsChange={setSettings}
                isOpen={settingsOpen}
                toggleOpen={() => setSettingsOpen(prev => !prev)}
              />
              <ActionButtons
                images={images}
                onCompressAll={handleCompressAll}
                onDownloadAll={handleDownloadAll}
                onClearAll={handleClearAll}
                isProcessing={isProcessing}
              />
              
              {/* SEO-friendly content section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6 transition-colors duration-300">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Why Compress Images?
                </h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    <span>Faster website loading times</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    <span>Reduced bandwidth usage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    <span>Improved SEO rankings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    <span>Better user experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2">✓</span>
                    <span>Lower storage requirements</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {images.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center transition-colors duration-300">
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload images to start compressing
                  </p>
                </div>
              ) : (
                images.map(image => (
                  <ImagePreview
                    key={image.id}
                    image={image}
                    onDownload={handleDownload}
                    onRename={handleRenameImage}
                    onRemove={handleRemoveImage}
                  />
                ))
              )}
              
              {/* Additional SEO content */}
              {images.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    How Our Image Compressor Works
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <p>
                      Our free online image compressor uses advanced algorithms to reduce the file size of your images while preserving visual quality. Unlike other tools, we process everything locally in your browser, ensuring your images never leave your device.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="font-medium text-gray-800 dark:text-white mb-2">1. Upload</h3>
                        <p className="text-sm">Drag and drop your images or browse to select files from your device.</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="font-medium text-gray-800 dark:text-white mb-2">2. Compress</h3>
                        <p className="text-sm">Adjust compression settings to balance between quality and file size reduction.</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="font-medium text-gray-800 dark:text-white mb-2">3. Download</h3>
                        <p className="text-sm">Save your optimized images directly to your device with no quality loss.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* FAQ Section for SEO */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-2">
                  Is this image compressor free to use?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, our image compression tool is completely free with no hidden costs or watermarks. Compress as many images as you need without limitations.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-2">
                  Will my images lose quality when compressed?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our tool uses smart compression algorithms that minimize quality loss. You can adjust the quality settings to find the perfect balance between file size and image quality.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-2">
                  Are my images uploaded to a server?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No. All compression happens locally in your browser. Your images never leave your device, ensuring complete privacy and security.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-2">
                  What image formats are supported?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our compressor supports all common image formats including JPG, PNG, GIF, BMP, and WebP. You can also convert between formats during compression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;