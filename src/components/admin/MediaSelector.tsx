import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Search, Folder, Image as ImageIcon, Video, File, Plus } from 'lucide-react';
import { getAllMedia, uploadMedia } from '../../services/cmsService';
import { Media } from '../../types/cms';
import { useAuth } from '../../context/AuthContext';

interface MediaSelectorProps {
  onSelect: (media: Media) => void;
  onClose: () => void;
  filter?: 'image' | 'video' | 'document';
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ onSelect, onClose, filter }) => {
  const { currentUser } = useAuth();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const mediaItems = await getAllMedia(filter, activeFolder || undefined);
        setMedia(mediaItems);
      } catch (error) {
        console.error('Error loading media:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [filter, activeFolder]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files.length || !currentUser) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);

      const uploadedMedia = await uploadMedia(
        files[0], 
        activeFolder || 'general',
        currentUser.uid
      );

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Add the new media to the list
      setMedia(prev => [uploadedMedia, ...prev]);
      
      // Reset the file input
      event.target.value = '';
      
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesSearch;
  });

  // Get unique folders
  const folders = Array.from(new Set(media.map(item => item.folder))).filter(Boolean) as string[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-800 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-dark-700">
          <h3 className="text-lg font-medium">Media Library</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-dark-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-dark-700 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-primary-500"
              placeholder="Search media..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="relative cursor-pointer px-3 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
              <span className="flex items-center space-x-1">
                <Upload size={16} />
                <span>Upload</span>
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept={filter === 'image' ? 'image/*' : filter === 'video' ? 'video/*' : undefined}
              />
            </label>

            <select
              value={filter || ''}
              onChange={(e) => {
                // This would need to be handled by the parent component
                // or through a custom callback
              }}
              className="bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
            >
              <option value="">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>
        </div>

        {uploading && (
          <div className="p-3 bg-dark-700">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Uploading...</span>
              <span className="text-sm">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-dark-900 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex h-[calc(80vh-140px)]">
          {/* Folders sidebar */}
          <div className="w-48 border-r border-dark-700 p-3 overflow-y-auto">
            <button
              onClick={() => setActiveFolder(null)}
              className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-left mb-1 ${
                activeFolder === null ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-dark-700'
              }`}
            >
              <Folder size={16} />
              <span>All Files</span>
            </button>
            
            {folders.map(folder => (
              <button
                key={folder}
                onClick={() => setActiveFolder(folder)}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-left mb-1 ${
                  activeFolder === folder ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-dark-700'
                }`}
              >
                <Folder size={16} />
                <span>{folder}</span>
              </button>
            ))}
            
            <button
              className="flex items-center space-x-1 text-sm text-primary-400 hover:text-primary-300 transition-colors mt-2 px-3 py-1"
            >
              <Plus size={14} />
              <span>New Folder</span>
            </button>
          </div>

          {/* Media grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-dark-700 p-4 rounded-full mb-4">
                  {filter === 'image' ? (
                    <ImageIcon size={32} className="text-gray-500" />
                  ) : filter === 'video' ? (
                    <Video size={32} className="text-gray-500" />
                  ) : (
                    <File size={32} className="text-gray-500" />
                  )}
                </div>
                <h4 className="text-lg font-medium mb-2">No media found</h4>
                <p className="text-gray-400 mb-4">Upload some files to get started</p>
                <label className="cursor-pointer px-3 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                  <span className="flex items-center space-x-1">
                    <Upload size={16} />
                    <span>Upload Files</span>
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept={filter === 'image' ? 'image/*' : filter === 'video' ? 'video/*' : undefined}
                  />
                </label>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredMedia.map(item => (
                  <div
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="group relative border border-dark-700 rounded-lg overflow-hidden cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    {item.type === 'image' ? (
                      <div className="aspect-square bg-dark-900">
                        <img 
                          src={item.thumbnailUrl || item.url} 
                          alt={item.alt || item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback for invalid URLs
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTEyIDIyYzUuNTIzIDAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTB6IiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik05IDlhMyAzIDAgMSAxIDYgMCAzIDMgMCAwIDEtNiAwek02IDE4YzAtMyAyLjY5MS01IDYtNXM2IDIgNiA1IiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';
                          }}
                        />
                      </div>
                    ) : item.type === 'video' ? (
                      <div className="aspect-square bg-dark-900 flex items-center justify-center">
                        <Video size={32} className="text-gray-500" />
                      </div>
                    ) : (
                      <div className="aspect-square bg-dark-900 flex items-center justify-center">
                        <File size={32} className="text-gray-500" />
                      </div>
                    )}
                    
                    <div className="p-2 bg-dark-800">
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.type === 'image' && item.dimensions 
                          ? `${item.dimensions.width}×${item.dimensions.height}`
                          : new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-3 py-1.5 bg-primary-500 rounded-lg text-sm">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MediaSelector;
