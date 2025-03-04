export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  compressedFile?: File;
  compressedPreview?: string;
  compressionRatio?: number;
  status: 'idle' | 'compressing' | 'done' | 'error';
  error?: string;
}

export interface CompressionSettings {
  quality: number;
  maxSizeMB: number;
  maxWidthOrHeight: number | null;
  removeMetadata: boolean;
  outputFormat: 'auto' | 'jpeg' | 'png' | 'webp';
  useWebWorker: boolean;
}

export type ThemeMode = 'light' | 'dark';