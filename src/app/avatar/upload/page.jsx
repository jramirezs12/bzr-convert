'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';

export default function AvatarUploadPage() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const file = inputFileRef.current?.files?.[0];
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError(null);
    
    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/avatar/upload',
      });
      
      setBlob(newBlob);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Upload Avatar
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Upload files directly to Vercel Blob
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="file-upload" className="sr-only">
              Choose file
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              ref={inputFileRef}
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              disabled={uploading}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={uploading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {blob && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
              Upload Successful!
            </h3>
            <p className="text-sm text-green-600 dark:text-green-400 mb-2">
              Blob URL:
            </p>
            <a
              href={blob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {blob.url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}