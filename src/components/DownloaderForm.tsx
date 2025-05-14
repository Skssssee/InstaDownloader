import React, { useState } from 'react';
import { Download, Loader, AlertCircle, CheckCircle, Copy, ExternalLink } from 'lucide-react';

interface DownloaderFormProps {
  className?: string;
}

const DownloaderForm: React.FC<DownloaderFormProps> = ({ className }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setDownloadUrl(null);
    
    // Validate URL
    if (!url.trim()) {
      setError('Please enter an Instagram Reels URL');
      return;
    }
    
    if (!url.includes('instagram.com')) {
      setError('Please enter a valid Instagram URL');
      return;
    }
    
    setLoading(true);
    
    try {
      // Using the provided API
      const apiUrl = `https://instagraminfo.ytansh038.workers.dev/info?username=ans__vishwakarma`;
      
      // Since the API directly returns the video file, we'll just set the download URL
      setDownloadUrl(apiUrl);
    } catch (err) {
      setError('Failed to fetch the video. Please try again.');
      console.error('Error fetching video:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Instagram Reels URL here..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200 pr-12"
          />
          {url && (
            <button
              type="button"
              onClick={() => setUrl('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" size={20} />
              Processing...
            </>
          ) : (
            <>
              <Download className="mr-2" size={20} />
              Download Reel
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
          <AlertCircle className="text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {downloadUrl && !error && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-slide-in">
          <div className="flex items-center mb-2">
            <CheckCircle className="text-green-500 dark:text-green-400 mr-2" size={20} />
            <h3 className="text-green-800 dark:text-green-400 font-medium">Video Ready!</h3>
          </div>
          
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <a
              href={downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <Download className="mr-2" size={18} />
              Download Video
            </a>
            
            <button
              onClick={handleCopyLink}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              {copied ? (
                <>
                  <CheckCircle className="mr-2" size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2" size={18} />
                  Copy Link
                </>
              )}
            </button>
          </div>
          
          <div className="mt-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center"
            >
              <ExternalLink size={14} className="mr-1" />
              View original Instagram Reel
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloaderForm;
